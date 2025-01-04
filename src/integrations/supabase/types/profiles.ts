export interface ProfilesTable {
  Row: {
    id: string;
    full_name: string | null;
    role: "user" | "doctor" | "executive" | "admin" | null;
    registration_status: "pending" | "approved" | "rejected" | null;
    phone_number: string | null;
    address: string | null;
    bio: string | null;
    specialization: string | null;
    created_at: string;
  };
  Insert: {
    id: string;
    full_name?: string | null;
    role?: "user" | "doctor" | "executive" | "admin" | null;
    registration_status?: "pending" | "approved" | "rejected" | null;
    phone_number?: string | null;
    address?: string | null;
    bio?: string | null;
    specialization?: string | null;
    created_at?: string;
  };
  Update: {
    id?: string;
    full_name?: string | null;
    role?: "user" | "doctor" | "executive" | "admin" | null;
    registration_status?: "pending" | "approved" | "rejected" | null;
    phone_number?: string | null;
    address?: string | null;
    bio?: string | null;
    specialization?: string | null;
    created_at?: string;
  };
  Relationships: [];
}