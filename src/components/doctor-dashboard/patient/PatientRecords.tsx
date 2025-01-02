import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Upload } from "lucide-react";
import { useState, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";

interface MedicalRecord {
  id: string;
  name: string;
  date: string;
  type: string;
  size: string;
}

export default function PatientRecords() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [records, setRecords] = useState<MedicalRecord[]>([]);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newRecord: MedicalRecord = {
        id: Date.now().toString(),
        name: file.name,
        date: new Date().toISOString().split('T')[0],
        type: file.type.split('/')[1].toUpperCase(),
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      };
      
      setRecords([...records, newRecord]);
      toast({
        title: "File Upload Successful",
        description: "Medical record has been successfully uploaded.",
      });
      
      if (event.target) {
        event.target.value = '';
      }
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Patient Records</CardTitle>
        <Button variant="secondary" onClick={handleUploadClick}>
          <Upload className="h-4 w-4 mr-2" />
          Upload Record
        </Button>
      </CardHeader>
      <CardContent>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          onChange={handleFileUpload}
        />
        {records.length > 0 ? (
          <div className="space-y-4">
            {records.map((record) => (
              <div
                key={record.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
              >
                <div className="flex items-center gap-4">
                  <FileText className="h-6 w-6 text-secondary" />
                  <div>
                    <h3 className="font-semibold">{record.name}</h3>
                    <p className="text-sm text-gray-500">
                      Uploaded on {record.date} • {record.type} • {record.size}
                    </p>
                  </div>
                </div>
                <Button variant="outline">View</Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No medical records uploaded</p>
        )}
      </CardContent>
    </Card>
  );
}