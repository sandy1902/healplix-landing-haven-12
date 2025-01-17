export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      appointments: {
        Row: {
          appointment_date: string
          created_at: string | null
          doctor_id: string | null
          id: string
          notes: string | null
          patient_id: string | null
          rating: number | null
          status: Database["public"]["Enums"]["appointment_status"] | null
          updated_at: string | null
        }
        Insert: {
          appointment_date: string
          created_at?: string | null
          doctor_id?: string | null
          id?: string
          notes?: string | null
          patient_id?: string | null
          rating?: number | null
          status?: Database["public"]["Enums"]["appointment_status"] | null
          updated_at?: string | null
        }
        Update: {
          appointment_date?: string
          created_at?: string | null
          doctor_id?: string | null
          id?: string
          notes?: string | null
          patient_id?: string | null
          rating?: number | null
          status?: Database["public"]["Enums"]["appointment_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appointments_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      departments: {
        Row: {
          created_at: string | null
          hospital_id: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          hospital_id?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          hospital_id?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "departments_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
        ]
      }
      dependents: {
        Row: {
          created_at: string | null
          date_of_birth: string | null
          first_name: string
          id: string
          last_name: string
          relationship: string | null
          subscriber_id: string | null
        }
        Insert: {
          created_at?: string | null
          date_of_birth?: string | null
          first_name: string
          id?: string
          last_name: string
          relationship?: string | null
          subscriber_id?: string | null
        }
        Update: {
          created_at?: string | null
          date_of_birth?: string | null
          first_name?: string
          id?: string
          last_name?: string
          relationship?: string | null
          subscriber_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dependents_subscriber_id_fkey"
            columns: ["subscriber_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      favorites: {
        Row: {
          created_at: string | null
          doctor_id: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          doctor_id?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          doctor_id?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "favorites_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      government_schemes: {
        Row: {
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      hospital_government_schemes: {
        Row: {
          created_at: string | null
          hospital_id: string | null
          id: string
          scheme_id: string | null
        }
        Insert: {
          created_at?: string | null
          hospital_id?: string | null
          id?: string
          scheme_id?: string | null
        }
        Update: {
          created_at?: string | null
          hospital_id?: string | null
          id?: string
          scheme_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hospital_government_schemes_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hospital_government_schemes_scheme_id_fkey"
            columns: ["scheme_id"]
            isOneToOne: false
            referencedRelation: "government_schemes"
            referencedColumns: ["id"]
          },
        ]
      }
      hospitals: {
        Row: {
          address: string | null
          city: string | null
          created_at: string | null
          district: string | null
          id: string
          managing_director: string | null
          managing_director_phone: string | null
          name: string
          phone_number: string | null
          registration_number: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          created_at?: string | null
          district?: string | null
          id: string
          managing_director?: string | null
          managing_director_phone?: string | null
          name: string
          phone_number?: string | null
          registration_number?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          created_at?: string | null
          district?: string | null
          id?: string
          managing_director?: string | null
          managing_director_phone?: string | null
          name?: string
          phone_number?: string | null
          registration_number?: string | null
        }
        Relationships: []
      }
      insurance_affiliations: {
        Row: {
          created_at: string | null
          hospital_id: string | null
          id: string
          insurance_provider_id: string | null
        }
        Insert: {
          created_at?: string | null
          hospital_id?: string | null
          id?: string
          insurance_provider_id?: string | null
        }
        Update: {
          created_at?: string | null
          hospital_id?: string | null
          id?: string
          insurance_provider_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "insurance_affiliations_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "insurance_affiliations_insurance_provider_id_fkey"
            columns: ["insurance_provider_id"]
            isOneToOne: false
            referencedRelation: "insurance_providers"
            referencedColumns: ["id"]
          },
        ]
      }
      insurance_providers: {
        Row: {
          created_at: string
          id: string
          name: string
          type: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          type: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          type?: string
        }
        Relationships: []
      }
      locations: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      medical_history: {
        Row: {
          allergies: string | null
          chronic_diseases: string | null
          created_at: string | null
          drug_allergies: string | null
          id: string
          previous_surgeries: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          allergies?: string | null
          chronic_diseases?: string | null
          created_at?: string | null
          drug_allergies?: string | null
          id?: string
          previous_surgeries?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          allergies?: string | null
          chronic_diseases?: string | null
          created_at?: string | null
          drug_allergies?: string | null
          id?: string
          previous_surgeries?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "medical_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      medical_records: {
        Row: {
          file_url: string | null
          id: string
          patient_id: string | null
          record_name: string
          record_type: string
          uploaded_at: string | null
        }
        Insert: {
          file_url?: string | null
          id?: string
          patient_id?: string | null
          record_name: string
          record_type: string
          uploaded_at?: string | null
        }
        Update: {
          file_url?: string | null
          id?: string
          patient_id?: string | null
          record_name?: string
          record_type?: string
          uploaded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "medical_records_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          city: string | null
          consultation_fee: number | null
          created_at: string
          district: string | null
          experience: string | null
          first_name: string | null
          hospital_address: string | null
          hospital_name: string | null
          id: string
          last_name: string | null
          phone_number: string | null
          pincode: string | null
          qualification: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          specialization: string | null
          video_consultation_available: boolean | null
          video_consultation_fee: number | null
        }
        Insert: {
          city?: string | null
          consultation_fee?: number | null
          created_at?: string
          district?: string | null
          experience?: string | null
          first_name?: string | null
          hospital_address?: string | null
          hospital_name?: string | null
          id: string
          last_name?: string | null
          phone_number?: string | null
          pincode?: string | null
          qualification?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          specialization?: string | null
          video_consultation_available?: boolean | null
          video_consultation_fee?: number | null
        }
        Update: {
          city?: string | null
          consultation_fee?: number | null
          created_at?: string
          district?: string | null
          experience?: string | null
          first_name?: string | null
          hospital_address?: string | null
          hospital_name?: string | null
          id?: string
          last_name?: string | null
          phone_number?: string | null
          pincode?: string | null
          qualification?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          specialization?: string | null
          video_consultation_available?: boolean | null
          video_consultation_fee?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      appointment_status: "scheduled" | "completed" | "cancelled"
      user_role: "subscriber" | "doctor" | "executive"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
