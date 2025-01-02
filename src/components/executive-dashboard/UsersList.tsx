import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { User, UserPlus } from "lucide-react";

interface UserData {
  id: string;
  name: string;
  email: string;
  subscriptionStatus: "active" | "inactive";
  subscriptionPaid: boolean;
  joinDate: string;
}

export default function UsersList() {
  const { toast } = useToast();
  const [users] = useState<UserData[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      subscriptionStatus: "active",
      subscriptionPaid: false,
      joinDate: "2024-03-15"
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      subscriptionStatus: "inactive",
      subscriptionPaid: false,
      joinDate: "2024-03-10"
    }
  ]);

  const handleSubscriptionPayment = (userId: string) => {
    // Here you would typically integrate with a payment gateway
    toast({
      title: "Processing Payment",
      description: "Initiating subscription payment...",
    });
  };

  const handleViewUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (!user?.subscriptionPaid) {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "Please complete the subscription payment to view user details.",
      });
      return;
    }
    // Handle viewing user details
    toast({
      title: "Success",
      description: "Accessing user details...",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Users List</span>
          <Button className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Add User
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/5"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center">
                  <User className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-medium">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-sm ${
                  user.subscriptionStatus === "active" ? "text-green-600" : "text-red-600"
                }`}>
                  {user.subscriptionStatus === "active" ? "Subscribed" : "Not Subscribed"}
                </span>
                {!user.subscriptionPaid ? (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleSubscriptionPayment(user.id)}
                  >
                    Pay Subscription
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewUser(user.id)}
                  >
                    View Details
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}