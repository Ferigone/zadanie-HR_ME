import CalculationList from "../Components/CalculationList"

const EveryonesCalculations = () => {
  return (
    <div className="min-h-screen pb-8 text-center mt-20 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-semibold mb-5">
        Everyone's Recent Calculations
      </h1>
      <CalculationList listSource="everyone" pagination={true} />
    </div>
  )
}

export default EveryonesCalculations