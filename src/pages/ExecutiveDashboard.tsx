import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Users, Calendar, DollarSign, UserCog, Link } from "lucide-react";
import DoctorRevenue from "@/components/doctor-dashboard/DoctorRevenue";
import UsersList from "@/components/executive-dashboard/UsersList";
import ExecutiveProfile from "@/components/executive-dashboard/ExecutiveProfile";
import AffiliateLink from "@/components/executive-dashboard/AffiliateLink";
import BookAppointment from "@/components/executive-dashboard/BookAppointment";

export default function ExecutiveDashboard() {
  const navigate = useNavigate();
  const isAuthenticated = true; // TODO: Replace with actual auth check

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-accent">
      <div className="container mx-auto py-8 px-4 space-y-6">
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto bg-white p-2 rounded-lg mb-4">
            <TabsTrigger value="users" className="flex items-center gap-2 data-[state=active]:bg-secondary data-[state=active]:text-white">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center gap-2 data-[state=active]:bg-secondary data-[state=active]:text-white">
              <Calendar className="h-4 w-4" />
              Book Appointments
            </TabsTrigger>
            <TabsTrigger value="revenue" className="flex items-center gap-2 data-[state=active]:bg-secondary data-[state=active]:text-white">
              <DollarSign className="h-4 w-4" />
              Revenue
            </TabsTrigger>
            <TabsTrigger value="affiliate" className="flex items-center gap-2 data-[state=active]:bg-secondary data-[state=active]:text-white">
              <Link className="h-4 w-4" />
              Affiliate Link
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2 data-[state=active]:bg-secondary data-[state=active]:text-white">
              <UserCog className="h-4 w-4" />
              Profile
            </TabsTrigger>
          </TabsList>

          <div className="bg-white rounded-lg p-6 shadow-lg">
            <TabsContent value="users" className="mt-0">
              <UsersList />
            </TabsContent>

            <TabsContent value="appointments" className="mt-0">
              <BookAppointment />
            </TabsContent>

            <TabsContent value="revenue" className="mt-0">
              <DoctorRevenue />
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