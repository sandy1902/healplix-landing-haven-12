import BMICalculator from "./BMICalculator";
import PregnancyCalculator from "./PregnancyCalculator";
import SafePeriodCalculator from "./SafePeriodCalculator";

export default function HealthCalculators() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <BMICalculator />
      <PregnancyCalculator />
      <SafePeriodCalculator />
    </div>
  );
}