import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { MedicalRecord } from "./types";

interface RecordsListProps {
  records: MedicalRecord[];
  onDownload: (record: MedicalRecord) => void;
}

export function RecordsList({ records, onDownload }: RecordsListProps) {
  if (records.length === 0) {
    return <p className="text-gray-500">No medical records uploaded</p>;
  }

  return (
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
          <Button variant="outline" onClick={() => onDownload(record)}>
            Download
          </Button>
        </div>
      ))}
    </div>
  );
}