import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Loader2 } from "lucide-react";

interface UserAnalytics {
  date: string;
  total_users: number;
  new_users: number;
  active_users: number;
  appointments_booked: number;
}

interface RevenueMetrics {
  date: string;
  total_revenue: number;
  appointment_revenue: number;
  subscription_revenue: number;
}

export const AdminAnalyticsDashboard = () => {
  const { data: userAnalytics, isLoading: loadingUserAnalytics } = useQuery({
    queryKey: ["userAnalytics"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_analytics")
        .select("*")
        .order("date", { ascending: true })
        .limit(30);

      if (error) throw error;
      return data as UserAnalytics[];
    },
  });

  const { data: revenueMetrics, isLoading: loadingRevenueMetrics } = useQuery({
    queryKey: ["revenueMetrics"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("revenue_metrics")
        .select("*")
        .order("date", { ascending: true })
        .limit(30);

      if (error) throw error;
      return data as RevenueMetrics[];
    },
  });

  if (loadingUserAnalytics || loadingRevenueMetrics) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {userAnalytics?.[userAnalytics.length - 1]?.total_users || 0}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>New Users</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {userAnalytics?.[userAnalytics.length - 1]?.new_users || 0}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Users</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {userAnalytics?.[userAnalytics.length - 1]?.active_users || 0}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Appointments</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {userAnalytics?.[userAnalytics.length - 1]?.appointments_booked || 0}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>Last 30 days trend</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userAnalytics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="total_users"
                    stroke="#8884d8"
                    name="Total Users"
                  />
                  <Line
                    type="monotone"
                    dataKey="new_users"
                    stroke="#82ca9d"
                    name="New Users"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Last 30 days trend</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="total_revenue"
                    stroke="#8884d8"
                    name="Total Revenue"
                  />
                  <Line
                    type="monotone"
                    dataKey="appointment_revenue"
                    stroke="#82ca9d"
                    name="Appointment Revenue"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};