import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import AppointmentList from "./AppointmentList";
import MedicalRecords from "./MedicalRecords";
import Dependents from "./Dependents";
import Favorites from "./Favorites";
import ProfileForm from "./ProfileForm";
import BMICalculator from "./calculators/BMICalculator";
import PregnancyCalculator from "./calculators/PregnancyCalculator";
import SafePeriodCalculator from "./calculators/SafePeriodCalculator";

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

      <TabsContent value="dependents" className="mt-0">
        <Dependents />
      </TabsContent>

      <TabsContent value="favorites" className="mt-0">
        <Favorites />
      </TabsContent>

      <TabsContent value="profile" className="mt-0">
        <Card className="border-none shadow-none">
          <CardHeader className="px-0 pt-0">
            <CardTitle>Profile Settings</CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <ProfileForm />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="bmi" className="mt-0">
        <BMICalculator />
      </TabsContent>

      <TabsContent value="pregnancy" className="mt-0">
        <PregnancyCalculator />
      </TabsContent>

      <TabsContent value="safe-period" className="mt-0">
        <SafePeriodCalculator />
      </TabsContent>
    </div>
  );
}