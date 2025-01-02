import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { FileText, Download } from "lucide-react";
import jsPDF from "jspdf";
import GeneralExaminationForm from "./GeneralExaminationForm";
import MedicalHistoryForm from "./MedicalHistoryForm";
import { PrescriptionData } from "../types/prescription";

export default function Prescription() {
  const { toast } = useToast();
  const [prescription, setPrescription] = useState<PrescriptionData>({
    complaints: "",
    pastMedicalHistory: "",
    pastSurgicalHistory: "",
    drugAllergies: "",
    generalExamination: {
      pr: "",
      bp: "",
      temperature: "",
      cvs: "",
      rs: "",
      perAbdomen: "",
    },
    impression: "",
    investigations: "",
    medicines: "",
    dosage: "",
    duration: "",
    notes: "",
  });

  const handleChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setPrescription((prev) => {
        const parentKey = parent as keyof PrescriptionData;
        if (typeof prev[parentKey] === 'object' && prev[parentKey] !== null) {
          return {
            ...prev,
            [parentKey]: {
              ...prev[parentKey],
              [child]: value
            }
          };
        }
        return prev;
      });
    } else {
      setPrescription((prev) => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Prescription Saved",
      description: "The prescription has been saved successfully.",
    });
  };

  const exportToText = () => {
    const content = `
PRESCRIPTION

Complaints: ${prescription.complaints}

Past Medical History: ${prescription.pastMedicalHistory}
Past Surgical History: ${prescription.pastSurgicalHistory}
Drug Allergies: ${prescription.drugAllergies}

General Examination:
- PR: ${prescription.generalExamination.pr}
- BP: ${prescription.generalExamination.bp}
- Temperature: ${prescription.generalExamination.temperature}
- CVS: ${prescription.generalExamination.cvs}
- RS: ${prescription.generalExamination.rs}
- Per Abdomen: ${prescription.generalExamination.perAbdomen}

Impression: ${prescription.impression}
Investigations: ${prescription.investigations}

Medicines: ${prescription.medicines}
Dosage: ${prescription.dosage}
Duration: ${prescription.duration}

Additional Notes: ${prescription.notes}
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'prescription.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Successful",
      description: "Prescription has been exported as text file.",
    });
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    let yPos = 20;
    const lineHeight = 7;

    doc.setFontSize(16);
    doc.text('PRESCRIPTION', 105, yPos, { align: 'center' });
    yPos += lineHeight * 2;

    doc.setFontSize(12);
    doc.text(`Complaints: ${prescription.complaints}`, 20, yPos);
    yPos += lineHeight * 2;

    doc.text(`Past Medical History: ${prescription.pastMedicalHistory}`, 20, yPos);
    yPos += lineHeight;
    doc.text(`Past Surgical History: ${prescription.pastSurgicalHistory}`, 20, yPos);
    yPos += lineHeight;
    doc.text(`Drug Allergies: ${prescription.drugAllergies}`, 20, yPos);
    yPos += lineHeight * 2;

    doc.text('General Examination:', 20, yPos);
    yPos += lineHeight;
    doc.text(`PR: ${prescription.generalExamination.pr}`, 30, yPos);
    yPos += lineHeight;
    doc.text(`BP: ${prescription.generalExamination.bp}`, 30, yPos);
    yPos += lineHeight;
    doc.text(`Temperature: ${prescription.generalExamination.temperature}`, 30, yPos);
    yPos += lineHeight;
    doc.text(`CVS: ${prescription.generalExamination.cvs}`, 30, yPos);
    yPos += lineHeight;
    doc.text(`RS: ${prescription.generalExamination.rs}`, 30, yPos);
    yPos += lineHeight;
    doc.text(`Per Abdomen: ${prescription.generalExamination.perAbdomen}`, 30, yPos);
    yPos += lineHeight * 2;

    doc.text(`Impression: ${prescription.impression}`, 20, yPos);
    yPos += lineHeight * 2;

    doc.text(`Investigations: ${prescription.investigations}`, 20, yPos);
    yPos += lineHeight * 2;

    doc.text(`Medicines: ${prescription.medicines}`, 20, yPos);
    yPos += lineHeight;
    doc.text(`Dosage: ${prescription.dosage}`, 20, yPos);
    yPos += lineHeight;
    doc.text(`Duration: ${prescription.duration}`, 20, yPos);
    yPos += lineHeight * 2;

    doc.text(`Additional Notes: ${prescription.notes}`, 20, yPos);

    doc.save('prescription.pdf');

    toast({
      title: "Export Successful",
      description: "Prescription has been exported as PDF.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Write Prescription</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <MedicalHistoryForm
            complaints={prescription.complaints}
            pastMedicalHistory={prescription.pastMedicalHistory}
            pastSurgicalHistory={prescription.pastSurgicalHistory}
            drugAllergies={prescription.drugAllergies}
            onChange={handleChange}
          />

          <GeneralExaminationForm
            data={prescription.generalExamination}
            onChange={handleChange}
          />

          <div className="space-y-2">
            <Label htmlFor="impression">Impression</Label>
            <Textarea
              id="impression"
              placeholder="Enter impression..."
              value={prescription.impression}
              onChange={(e) => handleChange('impression', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="investigations">Investigations</Label>
            <Textarea
              id="investigations"
              placeholder="Enter required investigations..."
              value={prescription.investigations}
              onChange={(e) => handleChange('investigations', e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="medicines">Medicines</Label>
            <Textarea
              id="medicines"
              placeholder="Enter medicines..."
              value={prescription.medicines}
              onChange={(e) => handleChange('medicines', e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dosage">Dosage</Label>
              <Input
                id="dosage"
                placeholder="e.g., 1-0-1"
                value={prescription.dosage}
                onChange={(e) => handleChange('dosage', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                placeholder="e.g., 7 days"
                value={prescription.duration}
                onChange={(e) => handleChange('duration', e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any additional instructions..."
              value={prescription.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button 
              variant="outline" 
              type="button" 
              onClick={() => setPrescription({
                complaints: "",
                pastMedicalHistory: "",
                pastSurgicalHistory: "",
                drugAllergies: "",
                generalExamination: {
                  pr: "",
                  bp: "",
                  temperature: "",
                  cvs: "",
                  rs: "",
                  perAbdomen: "",
                },
                impression: "",
                investigations: "",
                medicines: "",
                dosage: "",
                duration: "",
                notes: "",
              })}
            >
              Clear
            </Button>
            <Button 
              type="button" 
              variant="outline"
              onClick={exportToText}
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Export as Text
            </Button>
            <Button 
              type="button" 
              variant="outline"
              onClick={exportToPDF}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export as PDF
            </Button>
            <Button type="submit">Save Prescription</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
