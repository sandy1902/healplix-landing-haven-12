import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import AppointmentList from "./AppointmentList";
import MedicalRecords from "./MedicalRecords";
import Dependents from "./Dependents";
import Favorites from "./Favorites";
import HealthCalculators from "./calculators/HealthCalculators";
import MedicalHistoryForm from "./MedicalHistoryForm";

export function DashboardContent() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <TabsContent value="appointments" className="mt-0">
        <AppointmentList type="upcoming" />
      </TabsContent>

      <TabsContent value="history" className="mt-0">
        <AppointmentList type="past" />
      </TabsContent>

      <TabsContent value="records" className="mt-0">
        <MedicalRecords />
      </TabsContent>

      <TabsContent value="medical-history" className="mt-0">
        <MedicalHistoryForm />
      </TabsContent>

      <TabsContent value="dependents" className="mt-0">
        <Dependents />
      </TabsContent>

      <TabsContent value="favorites" className="mt-0">
        <Favorites />
      </TabsContent>

      <TabsContent value="calculators" className="mt-0 space-y-6">
        <HealthCalculators />
      </TabsContent>
    </div>
  );
}