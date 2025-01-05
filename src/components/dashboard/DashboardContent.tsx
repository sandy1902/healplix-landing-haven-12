import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import AppointmentList from "./AppointmentList";
import MedicalRecords from "./MedicalRecords";
import Dependents from "./Dependents";
import Favorites from "./Favorites";
import ProfileForm from "./ProfileForm";
import HealthCalculators from "./calculators/HealthCalculators";

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

      <TabsContent value="calculators" className="mt-0 space-y-6">
        <HealthCalculators />
      </TabsContent>
    </div>
  );
}