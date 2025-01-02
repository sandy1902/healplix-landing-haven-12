import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Share2 } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
}

export default function AppointmentList({ type }: { type: "upcoming" | "past" }) {
  const { toast } = useToast();
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  
  const [appointments] = useState<Appointment[]>([
    {
      id: "1",
      doctorName: "Dr. Sarah Wilson",
      specialty: "Cardiologist",
      date: "2024-04-25", // Updated to April
      time: "10:00 AM",
      location: "Medical Center, Room 302"
    },
    {
      id: "2",
      doctorName: "Dr. Michael Chen",
      specialty: "Dermatologist",
      date: "2024-04-28", // Updated to April
      time: "2:30 PM",
      location: "Health Clinic, Room 105"
    },
    {
      id: "3",
      doctorName: "Dr. Emily Rodriguez",
      specialty: "Neurologist",
      date: "2024-04-30", // Updated to April
      time: "11:15 AM",
      location: "Neurology Center, Room 405"
    },
    {
      id: "4",
      doctorName: "Dr. James Thompson",
      specialty: "Orthopedist",
      date: "2024-02-15",
      time: "9:00 AM",
      location: "Orthopedic Clinic, Room 203"
    }
  ]);

  const filteredAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.date);
    const today = new Date();
    
    // Reset time part for accurate date comparison
    today.setHours(0, 0, 0, 0);
    appointmentDate.setHours(0, 0, 0, 0);
    
    return type === "upcoming" 
      ? appointmentDate >= today 
      : appointmentDate < today;
  });

  const handleShareRecords = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowShareDialog(true);
  };

  const handleConfirmShare = () => {
    if (selectedAppointment) {
      toast({
        title: "Records Shared Successfully",
        description: `Medical records have been shared with ${selectedAppointment.doctorName}`,
      });
      setShowShareDialog(false);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{type === "upcoming" ? "Upcoming Appointments" : "Past Appointments"}</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredAppointments.length > 0 ? (
            <div className="space-y-4">
              {filteredAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="space-y-2">
                    <h3 className="font-semibold">{appointment.doctorName}</h3>
                    <p className="text-sm text-gray-500">{appointment.specialty}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      {appointment.date}
                      <Clock className="h-4 w-4 ml-2" />
                      {appointment.time}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="h-4 w-4" />
                      {appointment.location}
                    </div>
                  </div>
                  {type === "upcoming" && (
                    <div className="mt-4 md:mt-0 space-x-2">
                      <Button 
                        variant="secondary"
                        onClick={() => handleShareRecords(appointment)}
                      >
                        <Share2 className="h-4 w-4 mr-2" />
                        Share Records
                      </Button>
                      <Button variant="outline">Reschedule</Button>
                      <Button variant="destructive">Cancel</Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No {type} appointments</p>
          )}
        </CardContent>
      </Card>

      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Medical Records</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <p className="text-gray-600 mb-4">
              Are you sure you want to share your medical records with {selectedAppointment?.doctorName}? 
              They will only have access during your consultation.
            </p>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowShareDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleConfirmShare}>
                Share Records
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}