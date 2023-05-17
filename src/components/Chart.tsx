import { VictoryChart, VictoryAxis, VictoryBar, VictoryTooltip } from "victory";

interface ChartProps {
  data: { x: number; y: number }[];
}

const Chart = ({ data }: ChartProps) => {
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
    <div style={{ height: "300px" }}>
      <VictoryChart>
        <VictoryAxis
          tickValues={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
        />
        <VictoryAxis
          dependentAxis
          tickValues={tickValues}
          tickFormat={tickFormat}
        />
        <VictoryBar
          data={data}
          x="x"
          y="y"
          labels={({ datum }) => `Age: ${datum.x}, Savings: ${datum.y}`}
          labelComponent={<VictoryTooltip />}
        />
      </VictoryChart>
    </div>
  );
};

export default Chart;
