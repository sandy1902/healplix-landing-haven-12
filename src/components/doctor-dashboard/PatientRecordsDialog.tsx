import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Appointment } from "./types/appointment";

interface PatientRecordsDialogProps {
  selectedPatient: Appointment | null;
}

export default function PatientRecordsDialog({ selectedPatient }: PatientRecordsDialogProps) {
  const { toast } = useToast();

  if (!selectedPatient) return null;

  return (
    <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>
          Patient Records - {selectedPatient.patientName}
        </DialogTitle>
      </DialogHeader>
      <Tabs defaultValue="consultations" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="consultations">Consultation Notes</TabsTrigger>
          <TabsTrigger value="files">Medical Files</TabsTrigger>
        </TabsList>
        <TabsContent value="consultations">
          <div className="space-y-4 mt-4">
            {selectedPatient.patientRecords.map((record) => (
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
            {selectedPatient.patientRecords.length === 0 && (
              <p className="text-center text-gray-500">No consultation records found for this patient.</p>
            )}
          </div>
        </TabsContent>
        <TabsContent value="files">
          <div className="space-y-4 mt-4">
            {selectedPatient.medicalFiles.map((file) => (
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
            {selectedPatient.medicalFiles.length === 0 && (
              <p className="text-center text-gray-500">No medical files found for this patient.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </DialogContent>
  );
}