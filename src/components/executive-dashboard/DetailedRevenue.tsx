import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DetailedRevenue() {
  const [revenueData] = useState([
    { month: 'Jan', subscriptions: 3000, appointments: 2000, total: 5000 },
    { month: 'Feb', subscriptions: 4000, appointments: 2500, total: 6500 },
    { month: 'Mar', subscriptions: 3500, appointments: 3000, total: 6500 },
    { month: 'Apr', subscriptions: 4500, appointments: 3500, total: 8000 },
    { month: 'May', subscriptions: 5000, appointments: 4000, total: 9000 },
  ]);

  const [transactionHistory] = useState([
    { date: '2024-03-15', type: 'Subscription', amount: 1000, user: 'John Doe' },
    { date: '2024-03-14', type: 'Appointment', amount: 500, user: 'Jane Smith' },
    { date: '2024-03-13', type: 'Subscription', amount: 1000, user: 'Mike Johnson' },
  ]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="chart">
          <TabsList>
            <TabsTrigger value="chart">Revenue Chart</TabsTrigger>
            <TabsTrigger value="transactions">Transaction History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chart">
            <div className="h-[400px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="subscriptions" fill="#8884d8" name="Subscription Revenue" />
                  <Bar dataKey="appointments" fill="#82ca9d" name="Appointment Revenue" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="transactions">
            <div className="mt-4 space-y-4">
              {transactionHistory.map((transaction, index) => (
                <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{transaction.user}</p>
                    <p className="text-sm text-gray-500">{transaction.type}</p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                  <p className="font-semibold">₹{transaction.amount}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}