
import CalculationList from "../Components/CalculationList";

const CalculationHistory = () => {
  return (
    <div className="shadow-md rounded-lg p-4 max-w-screen-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Your last 10 calculations</h2>
      <CalculationList listSource="user" />
    </div>
  );
};

export default CalculationHistory;
