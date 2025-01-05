import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift, CalendarDays, Users, Heart } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function QuickStats() {
  const { toast } = useToast();
  // In a real application, these would come from your backend
  const [stats] = useState({
    rewardPoints: 500,
    upcomingAppointments: 2,
    dependants: 3,
    favorites: 5,
    // Added transaction history for demonstration
    transactions: [
      { type: 'appointment', amount: 1000, date: '2024-03-15' },
      { type: 'subscription', amount: 2000, date: '2024-03-10' },
    ]
  });

  // Calculate total rewards
  const totalSpent = stats.transactions.reduce((acc, curr) => acc + curr.amount, 0);
  const calculatedRewards = Math.floor(totalSpent * 0.1);

  const handleRedeemPoints = () => {
    toast({
      title: "Reward Points",
      description: `Your reward points (₹${calculatedRewards}) can be redeemed during your next appointment booking.`,
    });
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="border border-gray-200 hover:border-primary/50 transition-colors">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Gift className="h-4 w-4" />
            Reward Points
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold mb-2">₹{calculatedRewards}</p>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={handleRedeemPoints}
          >
            View Details
          </Button>
        </CardContent>
      </Card>

      <Card className="border border-gray-200 hover:border-primary/50 transition-colors">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <CalendarDays className="h-4 w-4" />
            Upcoming
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{stats.upcomingAppointments}</p>
        </CardContent>
      </Card>

      <Card className="border border-gray-200 hover:border-primary/50 transition-colors">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4" />
            Dependants
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{stats.dependants}</p>
        </CardContent>
      </Card>

      <Card className="border border-gray-200 hover:border-primary/50 transition-colors">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Heart className="h-4 w-4" />
            Favorites
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{stats.favorites}</p>
        </CardContent>
      </Card>
    </div>
  );
}