import { VictoryChart, VictoryLine, VictoryAxis } from "victory";

interface ChartProps {
  data: { x: number; y: number }[];
}

const Chart = ({ data }: ChartProps) => {
  const yTickValues = Array.from(Array(11), (_, i) => i * 10);

  return (
    <div style={{ height: "300px" }}>
      <VictoryChart>
        <VictoryAxis tickValues={yTickValues} />
        <VictoryAxis
          dependentAxis
          tickFormat={(tick) => `${tick}M`}
          tickValues={yTickValues}
        />
        <VictoryLine data={data} x="x" y="y" />
      </VictoryChart>
    </div>
  );
};

export default Chart;
