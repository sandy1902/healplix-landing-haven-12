import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState } from "react";

export default function UserAnalytics() {
  const [analyticsData] = useState([
    { month: 'Jan', users: 30, activeUsers: 25, appointments: 45 },
    { month: 'Feb', users: 40, activeUsers: 32, appointments: 55 },
    { month: 'Mar', users: 45, activeUsers: 38, appointments: 65 },
    { month: 'Apr', users: 55, activeUsers: 45, appointments: 75 },
    { month: 'May', users: 65, activeUsers: 52, appointments: 85 },
  ]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="#8884d8" name="Total Users" />
              <Line type="monotone" dataKey="activeUsers" stroke="#82ca9d" name="Active Users" />
              <Line type="monotone" dataKey="appointments" stroke="#ffc658" name="Appointments" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}