import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import ProfileSummary from "@/components/dashboard/ProfileSummary";
import QuickStats from "@/components/dashboard/QuickStats";
import { Navbar } from "@/components/Navbar";
import { DashboardTabs } from "@/components/dashboard/DashboardTabs";
import { DashboardContent } from "@/components/dashboard/DashboardContent";

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
            <DashboardTabs />
            <DashboardContent />
          </Tabs>
        </div>
      </div>
    </div>
  );
}