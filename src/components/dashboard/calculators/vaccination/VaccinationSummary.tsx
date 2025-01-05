interface VaccinationSummaryProps {
  selectedChild: string;
  childBirthDate: string;
  totalVaccinations: number;
  completedVaccinations: number;
  nextVaccinationName?: string;
  nextVaccinationDate?: string;
}

export function VaccinationSummary({
  selectedChild,
  childBirthDate,
  totalVaccinations,
  completedVaccinations,
  nextVaccinationName,
  nextVaccinationDate,
}: VaccinationSummaryProps) {
  if (!selectedChild || !childBirthDate) return null;

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
      <h3 className="font-medium mb-2">Summary for {selectedChild}</h3>
      <p className="text-sm text-gray-600">
        Completed: {completedVaccinations} of {totalVaccinations} vaccinations
      </p>
      <div className="mt-2 text-sm text-gray-600">
        Next due: {nextVaccinationName || "All vaccinations completed!"}
      </div>
      <div className="mt-2 text-sm text-gray-600">
        Next vaccination due date: {nextVaccinationDate || "N/A"}
      </div>
    </div>
  );
}