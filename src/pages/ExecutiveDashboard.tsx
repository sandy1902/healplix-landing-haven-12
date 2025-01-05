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
import { Navbar } from "@/components/Navbar";
import { useIsMobile } from "@/hooks/use-mobile";

export default function ExecutiveDashboard() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const isAuthenticated = true; // TODO: Replace with actual auth check

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent to-background">
      <Navbar />
      <div className="container mx-auto py-6 md:py-24 px-4 space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold text-primary mb-4 md:mb-8 animate-fade-up">
          Executive Dashboard
        </h1>
        
        <Tabs defaultValue="analytics" className="w-full">
          <TabsList 
            className={`w-full justify-start ${
              isMobile ? 'flex-wrap gap-2' : 'overflow-x-auto'
            } bg-white/80 backdrop-blur-sm p-2 rounded-lg mb-6 shadow-md`}
          >
            <TabsTrigger 
              value="analytics" 
              className="flex items-center gap-2 data-[state=active]:bg-secondary data-[state=active]:text-white transition-all duration-200"
            >
              <BarChart className="h-4 w-4" />
              <span className="hidden md:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger 
              value="users" 
              className="flex items-center gap-2 data-[state=active]:bg-secondary data-[state=active]:text-white transition-all duration-200"
            >
              <Users className="h-4 w-4" />
              <span className="hidden md:inline">Users</span>
            </TabsTrigger>
            <TabsTrigger 
              value="appointments" 
              className="flex items-center gap-2 data-[state=active]:bg-secondary data-[state=active]:text-white transition-all duration-200"
            >
              <Calendar className="h-4 w-4" />
              <span className="hidden md:inline">Appointments</span>
            </TabsTrigger>
            <TabsTrigger 
              value="revenue" 
              className="flex items-center gap-2 data-[state=active]:bg-secondary data-[state=active]:text-white transition-all duration-200"
            >
              <DollarSign className="h-4 w-4" />
              <span className="hidden md:inline">Revenue</span>
            </TabsTrigger>
            <TabsTrigger 
              value="affiliate" 
              className="flex items-center gap-2 data-[state=active]:bg-secondary data-[state=active]:text-white transition-all duration-200"
            >
              <Link className="h-4 w-4" />
              <span className="hidden md:inline">Affiliate</span>
            </TabsTrigger>
            <TabsTrigger 
              value="profile" 
              className="flex items-center gap-2 data-[state=active]:bg-secondary data-[state=active]:text-white transition-all duration-200"
            >
              <UserCog className="h-4 w-4" />
              <span className="hidden md:inline">Profile</span>
            </TabsTrigger>
          </TabsList>

          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 md:p-8 shadow-lg space-y-4">
            <TabsContent value="analytics" className="mt-0">
              <div className="grid grid-cols-1 gap-6">
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