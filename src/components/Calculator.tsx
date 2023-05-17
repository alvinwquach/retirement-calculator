import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { ref, push } from "firebase/database";
import database from "../firebase";

const Calculator = () => {
  const [age, setAge] = useState("");
  const [retirementAge, setRetirementAge] = useState("");
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [amountSpent, setAmountSpent] = useState("");

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
    const totalInvestment =
      retirementData.investmentAmount * yearsUntilRetirement;
    const totalGrowth = totalInvestment * (retirementData.interestRate / 100);
    const retirementSavings = totalInvestment + totalGrowth;
    const remainingSavings =
      retirementSavings - retirementData.amountSpent * yearsUntilRetirement;

    const dataRef = push(ref(database, "retirementData"), {
      age: retirementData.age,
      retirementAge: retirementData.retirementAge,
      investmentAmount: retirementData.investmentAmount,
      interestRate: retirementData.interestRate,
      spendingAmount: retirementData.amountSpent,
      yearsUntilRetirement,
      totalInvestment,
      totalGrowth,
      retirementSavings,
      remainingSavings,
    });

    const dataKey = dataRef.key;
    console.log("Data saved successfully with key:", dataKey);
  };

  return (
    <div>
      <TextField
        label="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
      />
      <TextField
        label="Retirement Age"
        value={retirementAge}
        onChange={(e) => setRetirementAge(e.target.value)}
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
      />
      <TextField
        label="Investment Amount"
        value={investmentAmount}
        onChange={(e) => setInvestmentAmount(e.target.value)}
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
      />
      <TextField
        label="Interest Rate"
        value={interestRate}
        onChange={(e) => setInterestRate(e.target.value)}
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
      />
      <TextField
        label="Amount Spent"
        value={amountSpent}
        onChange={(e) => setAmountSpent(e.target.value)}
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
      />
      <Button variant="contained" color="primary" onClick={handleCalculate}>
        Calculate
      </Button>
    </div>
  );
};

export default Calculator;
