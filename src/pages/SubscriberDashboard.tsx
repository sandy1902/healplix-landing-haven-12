import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, History, FileText, UserCog, Users, Heart } from "lucide-react";
import ProfileSummary from "@/components/dashboard/ProfileSummary";
import QuickStats from "@/components/dashboard/QuickStats";
import ProfileForm from "@/components/dashboard/ProfileForm";
import AppointmentList from "@/components/dashboard/AppointmentList";
import MedicalRecords from "@/components/dashboard/MedicalRecords";
import Dependents from "@/components/dashboard/Dependents";
import Favorites from "@/components/dashboard/Favorites";
import { Navbar } from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function UserDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log("Checking auth in dashboard:", session);
      
      if (!session) {
        console.log("No session found, redirecting to login");
        toast({
          title: "Session expired",
          description: "Please log in again",
        });
        navigate("/login");
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed in dashboard:", event, session);
      
      if (event === 'SIGNED_OUT' || !session) {
        console.log("User signed out or session ended, redirecting to login");
        navigate("/login");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-accent">
      <Navbar />
      <div className="container mx-auto py-24 px-4 space-y-6">
        {/* Profile Summary */}
        <Card className="border-none shadow-lg">
          <CardContent className="p-0">
            <ProfileSummary />
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="animate-fade-up" style={{ animationDelay: "100ms" }}>
          <QuickStats />
        </div>

        {/* Main Content */}
        <div className="animate-fade-up" style={{ animationDelay: "200ms" }}>
          <Tabs defaultValue="appointments" className="w-full">
            <TabsList className="w-full justify-start overflow-x-auto bg-white p-2 rounded-lg mb-4">
              <TabsTrigger value="appointments" className="flex items-center gap-2 data-[state=active]:bg-secondary data-[state=active]:text-white">
                <Clock className="h-4 w-4" />
                Appointments
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2 data-[state=active]:bg-secondary data-[state=active]:text-white">
                <History className="h-4 w-4" />
                History
              </TabsTrigger>
              <TabsTrigger value="records" className="flex items-center gap-2 data-[state=active]:bg-secondary data-[state=active]:text-white">
                <FileText className="h-4 w-4" />
                Medical Records
              </TabsTrigger>
              <TabsTrigger value="dependents" className="flex items-center gap-2 data-[state=active]:bg-secondary data-[state=active]:text-white">
                <Users className="h-4 w-4" />
                Dependents
              </TabsTrigger>
              <TabsTrigger value="favorites" className="flex items-center gap-2 data-[state=active]:bg-secondary data-[state=active]:text-white">
                <Heart className="h-4 w-4" />
                Favorites
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center gap-2 data-[state=active]:bg-secondary data-[state=active]:text-white">
                <UserCog className="h-4 w-4" />
                Profile Settings
              </TabsTrigger>
            </TabsList>

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
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}