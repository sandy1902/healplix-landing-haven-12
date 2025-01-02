import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Calendar, DollarSign, UserCog, Link, BarChart } from "lucide-react";
import UsersList from "@/components/executive-dashboard/UsersList";
import ExecutiveProfile from "@/components/executive-dashboard/ExecutiveProfile";
import AffiliateLink from "@/components/executive-dashboard/AffiliateLink";
import BookAppointment from "@/components/executive-dashboard/BookAppointment";
import DetailedRevenue from "@/components/executive-dashboard/DetailedRevenue";
import UserAnalytics from "@/components/executive-dashboard/UserAnalytics";

export default function ExecutiveDashboard() {
  const navigate = useNavigate();
  const isAuthenticated = true; // TODO: Replace with actual auth check

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent to-background">
      <div className="container mx-auto py-8 px-4 space-y-6">
        <h1 className="text-3xl font-bold text-primary mb-8 animate-fade-up">
          Executive Dashboard
        </h1>
        
        <Tabs defaultValue="analytics" className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto bg-white/80 backdrop-blur-sm p-2 rounded-lg mb-6 shadow-md">
            <TabsTrigger 
              value="analytics" 
              className="flex items-center gap-2 data-[state=active]:bg-secondary data-[state=active]:text-white transition-all duration-200"
            >
              <BarChart className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger 
              value="users" 
              className="flex items-center gap-2 data-[state=active]:bg-secondary data-[state=active]:text-white transition-all duration-200"
            >
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger 
              value="appointments" 
              className="flex items-center gap-2 data-[state=active]:bg-secondary data-[state=active]:text-white transition-all duration-200"
            >
              <Calendar className="h-4 w-4" />
              Book Appointments
            </TabsTrigger>
            <TabsTrigger 
              value="revenue" 
              className="flex items-center gap-2 data-[state=active]:bg-secondary data-[state=active]:text-white transition-all duration-200"
            >
              <DollarSign className="h-4 w-4" />
              Revenue
            </TabsTrigger>
            <TabsTrigger 
              value="affiliate" 
              className="flex items-center gap-2 data-[state=active]:bg-secondary data-[state=active]:text-white transition-all duration-200"
            >
              <Link className="h-4 w-4" />
              Affiliate Link
            </TabsTrigger>
            <TabsTrigger 
              value="profile" 
              className="flex items-center gap-2 data-[state=active]:bg-secondary data-[state=active]:text-white transition-all duration-200"
            >
              <UserCog className="h-4 w-4" />
              Profile
            </TabsTrigger>
          </TabsList>

          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
            <TabsContent value="analytics" className="mt-0 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <UserAnalytics />
              </div>
            </TabsContent>

            <TabsContent value="users" className="mt-0">
              <UsersList />
            </TabsContent>

            <TabsContent value="appointments" className="mt-0">
              <BookAppointment />
            </TabsContent>

            <TabsContent value="revenue" className="mt-0">
              <DetailedRevenue />
            </TabsContent>

            <TabsContent value="affiliate" className="mt-0">
              <AffiliateLink />
            </TabsContent>

            <TabsContent value="profile" className="mt-0">
              <ExecutiveProfile />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}