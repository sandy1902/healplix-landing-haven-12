export interface GeneralExamination {
  pr: string;
  bp: string;
  temperature: string;
  cvs: string;
  rs: string;
  perAbdomen: string;
}

export interface PrescriptionData {
  complaints: string;
  pastMedicalHistory: string;
  pastSurgicalHistory: string;
  drugAllergies: string;
  generalExamination: GeneralExamination;
  impression: string;
  investigations: string;
  medicines: string;
  dosage: string;
  duration: string;
  notes: string;
}