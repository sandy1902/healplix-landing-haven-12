import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, FileText } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PatientRecord {
  id: string;
  name: string;
  date: string;
  type: string;
  description: string;
}

interface MedicalFile {
  id: string;
  name: string;
  date: string;
  type: string;
  size: string;
}

interface Appointment {
  id: number;
  patientName: string;
  date: string;
  time: string;
  type: string;
  appointmentMode: "clinic" | "video";
  patientRecords: PatientRecord[];
  medicalFiles: MedicalFile[];
}

export default function DoctorAppointments() {
  const { toast } = useToast();
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
      ]
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
              <div
                key={appointment.id}
                className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg hover:bg-accent transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-secondary" />
                    <h3 className="font-semibold">{appointment.patientName}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    {appointment.date}
                    <Clock className="h-4 w-4 ml-2" />
                    {appointment.time}
                  </div>
                  <p className="text-sm text-gray-500">
                    {appointment.type} ({appointment.appointmentMode})
                  </p>
                </div>
                <div className="mt-4 md:mt-0 space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={() => handleViewRecords(appointment)}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    View Records
                  </Button>
                  <Button variant="destructive">Cancel</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={showRecords} onOpenChange={setShowRecords}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Patient Records - {selectedPatient?.patientName}
            </DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="consultations" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="consultations">Consultation Notes</TabsTrigger>
              <TabsTrigger value="files">Medical Files</TabsTrigger>
            </TabsList>
            <TabsContent value="consultations">
              <div className="space-y-4 mt-4">
                {selectedPatient?.patientRecords.map((record) => (
                  <div
                    key={record.id}
                    className="p-4 border rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{record.name}</h3>
                      <span className="text-sm text-gray-500">{record.date}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-1">{record.type}</p>
                    <p className="text-sm">{record.description}</p>
                  </div>
                ))}
                {(!selectedPatient?.patientRecords || selectedPatient.patientRecords.length === 0) && (
                  <p className="text-center text-gray-500">No consultation records found for this patient.</p>
                )}
              </div>
            </TabsContent>
            <TabsContent value="files">
              <div className="space-y-4 mt-4">
                {selectedPatient?.medicalFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <FileText className="h-6 w-6 text-secondary" />
                      <div>
                        <h3 className="font-semibold">{file.name}</h3>
                        <p className="text-sm text-gray-500">
                          Uploaded on {file.date} • {file.type} • {file.size}
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        toast({
                          title: "File Download Started",
                          description: `Downloading ${file.name}...`,
                        });
                      }}
                    >
                      Download
                    </Button>
                  </div>
                ))}
                {(!selectedPatient?.medicalFiles || selectedPatient.medicalFiles.length === 0) && (
                  <p className="text-center text-gray-500">No medical files found for this patient.</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}