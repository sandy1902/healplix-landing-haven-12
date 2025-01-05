import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import BMICalculator from "./BMICalculator";
import PregnancyCalculator from "./PregnancyCalculator";
import SafePeriodCalculator from "./SafePeriodCalculator";
import DiabeticMonitoringChart from "./DiabeticMonitoringChart";

export default function HealthCalculators() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <div className="space-y-4">
      {/* BMI Calculator Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <button
          onClick={() => toggleSection('bmi')}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
        >
          <span className="text-lg font-medium">BMI Calculator</span>
          {expandedSection === 'bmi' ? (
            <Minus className="h-5 w-5 text-[#0EA5E9]" />
          ) : (
            <Plus className="h-5 w-5 text-[#0EA5E9]" />
          )}
        </button>
        {expandedSection === 'bmi' && (
          <div className="p-4 border-t">
            <BMICalculator />
          </div>
        )}
      </div>

      {/* Pregnancy Calculator Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <button
          onClick={() => toggleSection('pregnancy')}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
        >
          <span className="text-lg font-medium">Pregnancy Calculator</span>
          {expandedSection === 'pregnancy' ? (
            <Minus className="h-5 w-5 text-[#0EA5E9]" />
          ) : (
            <Plus className="h-5 w-5 text-[#0EA5E9]" />
          )}
        </button>
        {expandedSection === 'pregnancy' && (
          <div className="p-4 border-t">
            <PregnancyCalculator />
          </div>
        )}
      </div>

      {/* Safe Period Calculator Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <button
          onClick={() => toggleSection('safe-period')}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
        >
          <span className="text-lg font-medium">Safe Period Calculator</span>
          {expandedSection === 'safe-period' ? (
            <Minus className="h-5 w-5 text-[#0EA5E9]" />
          ) : (
            <Plus className="h-5 w-5 text-[#0EA5E9]" />
          )}
        </button>
        {expandedSection === 'safe-period' && (
          <div className="p-4 border-t">
            <SafePeriodCalculator />
          </div>
        )}
      </div>

      {/* Diabetic Monitoring Chart Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <button
          onClick={() => toggleSection('diabetic')}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
        >
          <span className="text-lg font-medium">Diabetic Monitoring Chart</span>
          {expandedSection === 'diabetic' ? (
            <Minus className="h-5 w-5 text-[#0EA5E9]" />
          ) : (
            <Plus className="h-5 w-5 text-[#0EA5E9]" />
          )}
        </button>
        {expandedSection === 'diabetic' && (
          <div className="p-4 border-t">
            <DiabeticMonitoringChart />
          </div>
        )}
      </div>
    </div>
  );
}