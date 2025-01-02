import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, History, FileText, UserCog } from "lucide-react";
import ProfileSummary from "@/components/dashboard/ProfileSummary";
import QuickStats from "@/components/dashboard/QuickStats";
import ProfileForm from "@/components/dashboard/ProfileForm";
import AppointmentList from "@/components/dashboard/AppointmentList";
import MedicalRecords from "@/components/dashboard/MedicalRecords";

export default function UserDashboard() {
  const navigate = useNavigate();
  
  // TODO: Replace with actual auth check
  const isAuthenticated = true;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-accent">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Profile Summary */}
          <Card className="md:col-span-4">
            <CardContent>
              <ProfileSummary />
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="md:col-span-4">
            <QuickStats />
          </div>

          {/* Main Content */}
          <div className="md:col-span-4">
            <Tabs defaultValue="appointments" className="w-full">
              <TabsList className="w-full justify-start overflow-x-auto">
                <TabsTrigger value="appointments" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Appointments
                </TabsTrigger>
                <TabsTrigger value="history" className="flex items-center gap-2">
                  <History className="h-4 w-4" />
                  History
                </TabsTrigger>
                <TabsTrigger value="records" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Medical Records
                </TabsTrigger>
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <UserCog className="h-4 w-4" />
                  Profile Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="appointments">
                <AppointmentList type="upcoming" />
              </TabsContent>

              <TabsContent value="history">
                <AppointmentList type="past" />
              </TabsContent>

              <TabsContent value="records">
                <MedicalRecords />
              </TabsContent>

              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ProfileForm />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}