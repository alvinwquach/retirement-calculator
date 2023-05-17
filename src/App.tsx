import Calculator from "./components/Calculator";

function App() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Retirement Calculator</h1>
      <Calculator />
    </div>
  );
}

export default App;
