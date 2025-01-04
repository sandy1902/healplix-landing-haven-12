export interface AppointmentsTable {
  Row: {
    id: string;
    user_id: string | null;
    doctor_id: string | null;
    doctor_name: string;
    specialty: string;
    date: string;
    time: string;
    location: string;
    status: string;
    for_whom: string;
    rating: number | null;
    review: string | null;
    type: string;
    created_at: string;
  };
  Insert: {
    id?: string;
    user_id?: string | null;
    doctor_id?: string | null;
    doctor_name: string;
    specialty: string;
    date: string;
    time: string;
    location: string;
    status?: string;
    for_whom: string;
    rating?: number | null;
    review?: string | null;
    type: string;
    created_at?: string;
  };
  Update: {
    id?: string;
    user_id?: string | null;
    doctor_id?: string | null;
    doctor_name?: string;
    specialty?: string;
    date?: string;
    time?: string;
    location?: string;
    status?: string;
    for_whom?: string;
    rating?: number | null;
    review?: string | null;
    type?: string;
    created_at?: string;
  };
  Relationships: [];
}