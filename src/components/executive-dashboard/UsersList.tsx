import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, User, Calendar } from "lucide-react";
import { AppointmentDialog } from "@/components/doctor/AppointmentDialog";

interface UserData {
  id: string;
  name: string;
  email: string;
  subscriptionStatus: "active" | "inactive";
  subscriptionPaid: boolean;
  joinDate: string;
}

// Mock doctor data for the appointment dialog
const mockDoctor = {
  id: "1",
  name: "Dr. Smith",
  specialization: "General Physician",
  experience: "15 years",
  clinicName: "Health Plus Clinic",
  clinicAddress: "123 Medical Street",
  clinicVisit: { charges: 1000 },
  videoConsultation: { charges: 800 },
  rating: 4.5,
  totalRatings: 150,
  availability: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  imageUrl: "/placeholder.svg"
};

export default function UsersList() {
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

  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [isAppointmentDialogOpen, setIsAppointmentDialogOpen] = useState(false);

  const handleBookAppointment = (user: UserData) => {
    setSelectedUser(user);
    setIsAppointmentDialogOpen(true);
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
              <Button 
                variant="secondary"
                className="flex items-center gap-2"
                onClick={() => handleBookAppointment(user)}
              >
                <Calendar className="h-4 w-4" />
                Book Appointment
              </Button>
            </div>
          ))}
        </div>
      </CardContent>

      {selectedUser && (
        <AppointmentDialog
          doctor={mockDoctor}
          open={isAppointmentDialogOpen}
          onOpenChange={setIsAppointmentDialogOpen}
        />
      )}
    </Card>
  );
}