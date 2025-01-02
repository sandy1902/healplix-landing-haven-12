export interface PatientRecord {
  id: string;
  name: string;
  date: string;
  type: string;
  description: string;
}

export interface MedicalFile {
  id: string;
  name: string;
  date: string;
  type: string;
  size: string;
}

export interface Appointment {
  id: number;
  patientName: string;
  date: string;
  time: string;
  type: string;
  appointmentMode: "clinic" | "video";
  patientRecords: PatientRecord[];
  medicalFiles: MedicalFile[];
}