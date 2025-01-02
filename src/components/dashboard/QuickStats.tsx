import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift, CalendarDays, Users, Heart } from "lucide-react";
import { useState } from "react";

export default function QuickStats() {
  // In a real application, these would come from your backend
  const [stats] = useState({
    rewardPoints: 500,
    upcomingAppointments: 2,
    dependants: 3,
    favorites: 5
  });

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Gift className="h-4 w-4" />
            Reward Points
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{stats.rewardPoints}</p>
        </CardContent>
      </Card>

      <Card>
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

      <Card>
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

      <Card>
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