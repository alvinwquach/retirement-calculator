import { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { ref, push } from "firebase/database";
import database from "../firebase";

import Chart from "./Chart";

const Calculator = () => {
  const [age, setAge] = useState("");
  const [retirementAge, setRetirementAge] = useState("");
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [amountSpent, setAmountSpent] = useState("");
  const [chartData, setChartData] = useState<{ x: number; y: number }[]>([]);

  const handleCalculate = () => {
    const retirementData = {
      age: parseInt(age),
      retirementAge: parseInt(retirementAge),
      investmentAmount: parseFloat(investmentAmount),
      interestRate: parseFloat(interestRate),
      amountSpent: parseFloat(amountSpent),
    };

    const yearsUntilRetirement =
      retirementData.retirementAge - retirementData.age;
    const data = [];

    for (let i = retirementData.age; i <= retirementData.retirementAge; i++) {
      const yearsSinceRetirement = i - retirementData.age;
      const totalInvestment =
        retirementData.investmentAmount * yearsSinceRetirement;
      const totalGrowth = totalInvestment * (retirementData.interestRate / 100);
      const retirementSavings = totalInvestment + totalGrowth;
      const remainingSavings =
        retirementSavings - retirementData.amountSpent * yearsSinceRetirement;

      data.push({ x: i, y: remainingSavings });
    }

    setChartData(data);

    const dataRef = push(ref(database, "retirementData"), {
      age: retirementData.age,
      retirementAge: retirementData.retirementAge,
      investmentAmount: retirementData.investmentAmount,
      interestRate: retirementData.interestRate,
      spendingAmount: retirementData.amountSpent,
      yearsUntilRetirement,
      totalInvestment: retirementData.investmentAmount * yearsUntilRetirement,
      retirementSavings: data[data.length - 1].y + retirementData.amountSpent,
      remainingSavings: data[data.length - 1].y,
    });

    const dataKey = dataRef.key;
    console.log("Data saved successfully with key:", dataKey);
    setAge("");
    setRetirementAge("");
    setInvestmentAmount("");
    setInterestRate("");
    setAmountSpent("");
  };

  const handleReset = () => {
    setAge("");
    setRetirementAge("");
    setInvestmentAmount("");
    setInterestRate("");
    setAmountSpent("");
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Chart data={chartData} />
      <Grid container spacing={2} style={{ width: "100%", maxWidth: "400px" }}>
        <Grid item xs={12}>
          <TextField
            label="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Retirement Age"
            value={retirementAge}
            onChange={(e) => setRetirementAge(e.target.value)}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Investment Amount"
            value={investmentAmount}
            onChange={(e) => setInvestmentAmount(e.target.value)}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Interest Rate"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Amount Spent"
            value={amountSpent}
            onChange={(e) => setAmountSpent(e.target.value)}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCalculate}
                sx={{ marginRight: "8px" }}
              >
                Calculate
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="error" onClick={handleReset}>
                Reset
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Calculator;