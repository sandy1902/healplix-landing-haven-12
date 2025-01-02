import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Upload } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface MedicalRecord {
  id: string;
  name: string;
  date: string;
  type: string;
  size: string;
}

export default function MedicalRecords() {
  const { toast } = useToast();
  // In a real application, this would come from your backend
  const [records] = useState<MedicalRecord[]>([
    {
      id: "1",
      name: "Blood Test Results",
      date: "2024-02-15",
      type: "PDF",
      size: "2.5 MB"
    },
    {
      id: "2",
      name: "X-Ray Report",
      date: "2024-01-20",
      type: "PDF",
      size: "5.1 MB"
    }
  ]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Here you would typically handle the file upload to your backend
      console.log('Uploading file:', file);
      toast({
        title: "File Upload",
        description: "Your medical record has been successfully uploaded.",
      });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Medical Records</CardTitle>
        <div>
          <label htmlFor="file-upload">
            <Button variant="secondary" className="cursor-pointer">
              <Upload className="h-4 w-4 mr-2" />
              Upload Record
            </Button>
          </label>
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={handleFileUpload}
          />
        </div>
      </CardHeader>
      <CardContent>
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
                <Button variant="outline">Download</Button>
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