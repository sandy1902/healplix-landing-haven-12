import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { useState } from "react";
import { Appointment } from "./types/appointment";
import AppointmentCard from "./AppointmentCard";
import PatientRecordsDialog from "./PatientRecordsDialog";

export default function DoctorAppointments() {
  const [showRecords, setShowRecords] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Appointment | null>(null);

  // Sample data - in a real app, this would come from your backend
  const appointments: Appointment[] = [
    {
      id: 1,
      patientName: "John Doe",
      date: "2024-03-15",
      time: "10:00 AM",
      type: "Regular Checkup",
      appointmentMode: "clinic",
      patientRecords: [
        {
          id: "1",
          name: "Previous Consultation",
          date: "2024-02-15",
          type: "Consultation Notes",
          description: "Patient reported mild fever and cough. Prescribed antibiotics."
        },
        {
          id: "2",
          name: "Blood Test Results",
          date: "2024-02-10",
          type: "Lab Report",
          description: "All parameters within normal range."
        }
      ],
      medicalFiles: [
        {
          id: "1",
          name: "Blood Test Report.pdf",
          date: "2024-02-10",
          type: "PDF",
          size: "2.5 MB"
        },
        {
          id: "2",
          name: "X-Ray Image.jpg",
          date: "2024-02-10",
          type: "Image",
          size: "5.1 MB"
        }
      ]
    },
    {
      id: 2,
      patientName: "Jane Smith",
      date: "2024-03-15",
      time: "2:30 PM",
      type: "Follow-up",
      appointmentMode: "video",
      patientRecords: [
        {
          id: "3",
          name: "Previous Consultation",
          date: "2024-03-01",
          type: "Consultation Notes",
          description: "Follow-up for respiratory infection. Symptoms improving."
        }
      ],
      medicalFiles: []
    }
  ];

  const handleViewRecords = (appointment: Appointment) => {
    setSelectedPatient(appointment);
    setShowRecords(true);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                onViewRecords={handleViewRecords}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={showRecords} onOpenChange={setShowRecords}>
        <PatientRecordsDialog selectedPatient={selectedPatient} />
      </Dialog>
    </>
  );
}