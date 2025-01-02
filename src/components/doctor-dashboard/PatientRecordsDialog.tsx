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
    <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-white">
      <DialogHeader className="border-b pb-4">
        <DialogTitle className="text-xl font-bold text-primary">
          Patient Records - {selectedPatient.patientName}
        </DialogTitle>
      </DialogHeader>
      <Tabs defaultValue="consultations" className="w-full mt-4">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="consultations" className="text-sm font-medium">
            Consultation Notes
          </TabsTrigger>
          <TabsTrigger value="files" className="text-sm font-medium">
            Medical Files
          </TabsTrigger>
        </TabsList>
        <TabsContent value="consultations">
          <div className="space-y-4">
            {selectedPatient.patientRecords.map((record) => (
              <div
                key={record.id}
                className="p-6 border rounded-lg bg-accent/50 hover:bg-accent transition-colors duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-primary">{record.name}</h3>
                  <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full">
                    {record.date}
                  </span>
                </div>
                <p className="text-sm font-medium text-secondary mb-2">{record.type}</p>
                <p className="text-gray-700 leading-relaxed">{record.description}</p>
              </div>
            ))}
            {selectedPatient.patientRecords.length === 0 && (
              <p className="text-center text-gray-500 py-8">No consultation records found for this patient.</p>
            )}
          </div>
        </TabsContent>
        <TabsContent value="files">
          <div className="space-y-4">
            {selectedPatient.medicalFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-6 border rounded-lg bg-accent/50 hover:bg-accent transition-colors duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-secondary/10 rounded-lg">
                    <FileText className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">{file.name}</h3>
                    <p className="text-sm text-gray-600">
                      Uploaded on {file.date} • {file.type} • {file.size}
                    </p>
                  </div>
                </div>
                <Button 
                  variant="outline"
                  className="hover:bg-secondary hover:text-white transition-colors"
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
              <p className="text-center text-gray-500 py-8">No medical files found for this patient.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </DialogContent>
  );
}