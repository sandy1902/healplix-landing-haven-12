import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function DoctorRevenue() {
  const monthlyData = [
    { month: 'Jan', revenue: 4000, patients: 20 },
    { month: 'Feb', revenue: 3000, patients: 15 },
    { month: 'Mar', revenue: 5000, patients: 25 },
    { month: 'Apr', revenue: 4500, patients: 22 },
    { month: 'May', revenue: 6000, patients: 30 },
    { month: 'Jun', revenue: 5500, patients: 28 },
  ];

  const weeklyData = [
    { day: 'Mon', revenue: 800, patients: 4 },
    { day: 'Tue', revenue: 1200, patients: 6 },
    { day: 'Wed', revenue: 1000, patients: 5 },
    { day: 'Thu', revenue: 1400, patients: 7 },
    { day: 'Fri', revenue: 1100, patients: 6 },
    { day: 'Sat', revenue: 900, patients: 4 },
    { day: 'Sun', revenue: 600, patients: 3 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="monthly" className="space-y-4">
          <TabsList>
            <TabsTrigger value="monthly">Monthly View</TabsTrigger>
            <TabsTrigger value="weekly">Weekly View</TabsTrigger>
          </TabsList>

          <TabsContent value="monthly" className="space-y-4">
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#4A9C94" 
                    strokeWidth={2}
                    name="Revenue ($)"
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="patients" 
                    stroke="#FF8042" 
                    strokeWidth={2}
                    name="Patients"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-4">
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#4A9C94" name="Revenue ($)" />
                  <Bar dataKey="patients" fill="#FF8042" name="Patients" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}