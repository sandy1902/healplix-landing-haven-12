import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, User, Calendar } from "lucide-react";
import { AppointmentDialog } from "@/components/doctor/AppointmentDialog";
import { Doctor } from "@/types/doctor";

interface UserData {
  id: string;
  name: string;
  email: string;
  subscriptionStatus: "active" | "inactive";
  subscriptionPaid: boolean;
  joinDate: string;
}

// Mock doctor data for the appointment dialog
const mockDoctor: Doctor = {
  id: "1",
  name: "Dr. Smith",
  image: "/placeholder.svg",
  qualification: "MBBS, MD",
  specialization: "General Physician",
  experience: "15 years",
  clinicName: "Health Plus Clinic",
  location: "123 Medical Street",
  rating: 4.5,
  email: "dr.smith@healthplus.com",
  contactNumber: "+1 234 567 8900",
  clinicLocation: "123 Medical Street, Medical District",
  clinicTimings: "Mon-Fri: 9:00 AM - 5:00 PM",
  services: ["General Consultation", "Health Checkup", "Vaccinations"],
  videoConsultation: {
    available: true,
    charges: 800
  },
  clinicVisit: {
    available: true,
    charges: 1000
  }
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
        <div className="space-y-8">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex flex-col p-8 border rounded-lg hover:bg-accent/5 space-y-8 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-secondary/20 flex items-center justify-center">
                  <User className="h-8 w-8 text-secondary" />
                </div>
                <div>
                  <h3 className="font-medium text-xl">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <Button 
                variant="secondary"
                className="flex items-center gap-2 w-full py-8"
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