import { VictoryChart, VictoryLine, VictoryAxis } from "victory";

interface ChartProps {
  data: { x: number; y: number }[];
}

const Chart = ({ data }: ChartProps) => {
  console.log(data);

  const tickValues = [
    0, 100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000,
    1000000,
  ];

  const tickFormat = (tick: number) => {
    if (tick === 1000000) {
      return "1M";
    }
    return `${tick / 1000}K`;
  };

  return (
    <div style={{ height: "300px", width: "700px" }}>
      <VictoryChart>
        <VictoryAxis
          label="Age"
          tickValues={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
        />
        <VictoryAxis
          dependentAxis
          label="Savings"
          tickValues={tickValues}
          tickFormat={tickFormat}
          style={{
            axisLabel: { padding: 50 },
          }}
        />
        <VictoryLine data={data} x="x" y="y" />
      </VictoryChart>
    </div>
  );
};

export default Chart;
