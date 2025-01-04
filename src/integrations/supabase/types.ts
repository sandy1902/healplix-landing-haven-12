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
      admin_logs: {
        Row: {
          action_type: Database["public"]["Enums"]["admin_action_type"]
          admin_id: string | null
          created_at: string | null
          description: string
          id: string
        }
        Insert: {
          action_type: Database["public"]["Enums"]["admin_action_type"]
          admin_id?: string | null
          created_at?: string | null
          description: string
          id?: string
        }
        Update: {
          action_type?: Database["public"]["Enums"]["admin_action_type"]
          admin_id?: string | null
          created_at?: string | null
          description?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_logs_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      admission_enquiries: {
        Row: {
          admission_date: string | null
          admission_type: string | null
          created_at: string | null
          diagnosis: string | null
          hospital_id: string | null
          id: string
          insurance_provider: string | null
          medical_records_path: string | null
          patient_name: string
          status: string | null
        }
        Insert: {
          admission_date?: string | null
          admission_type?: string | null
          created_at?: string | null
          diagnosis?: string | null
          hospital_id?: string | null
          id?: string
          insurance_provider?: string | null
          medical_records_path?: string | null
          patient_name: string
          status?: string | null
        }
        Update: {
          admission_date?: string | null
          admission_type?: string | null
          created_at?: string | null
          diagnosis?: string | null
          hospital_id?: string | null
          id?: string
          insurance_provider?: string | null
          medical_records_path?: string | null
          patient_name?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admission_enquiries_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
        ]
      }
      appointments: {
        Row: {
          created_at: string | null
          date: string
          doctor_id: string | null
          doctor_name: string
          for_whom: string | null
          id: string
          location: string
          rating: number | null
          review: string | null
          specialty: string
          status: string | null
          time: string
          type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          date: string
          doctor_id?: string | null
          doctor_name: string
          for_whom?: string | null
          id?: string
          location: string
          rating?: number | null
          review?: string | null
          specialty: string
          status?: string | null
          time: string
          type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string
          doctor_id?: string | null
          doctor_name?: string
          for_whom?: string | null
          id?: string
          location?: string
          rating?: number | null
          review?: string | null
          specialty?: string
          status?: string | null
          time?: string
          type?: string
          user_id?: string | null
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
            foreignKeyName: "appointments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_forms: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          status: string | null
          subject: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          status?: string | null
          subject: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          status?: string | null
          subject?: string
        }
        Relationships: []
      }
      dependents: {
        Row: {
          age: string
          created_at: string | null
          gender: string
          id: string
          name: string
          relation: string
          status: string | null
          user_id: string | null
        }
        Insert: {
          age: string
          created_at?: string | null
          gender: string
          id?: string
          name: string
          relation: string
          status?: string | null
          user_id?: string | null
        }
        Update: {
          age?: string
          created_at?: string | null
          gender?: string
          id?: string
          name?: string
          relation?: string
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dependents_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      executive_reports: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          metrics: Json | null
          report_date: string
          title: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          metrics?: Json | null
          report_date: string
          title: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          metrics?: Json | null
          report_date?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "executive_reports_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      favorites: {
        Row: {
          created_at: string | null
          id: string
          name: string
          type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "favorites_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      hospital_images: {
        Row: {
          created_at: string | null
          hospital_id: string | null
          id: string
          image_type: string | null
          image_url: string
          is_primary: boolean | null
        }
        Insert: {
          created_at?: string | null
          hospital_id?: string | null
          id?: string
          image_type?: string | null
          image_url: string
          is_primary?: boolean | null
        }
        Update: {
          created_at?: string | null
          hospital_id?: string | null
          id?: string
          image_type?: string | null
          image_url?: string
          is_primary?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "hospital_images_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
        ]
      }
      hospital_reviews: {
        Row: {
          created_at: string | null
          hospital_id: string | null
          id: string
          rating: number
          review_text: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          hospital_id?: string | null
          id?: string
          rating: number
          review_text?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          hospital_id?: string | null
          id?: string
          rating?: number
          review_text?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hospital_reviews_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hospital_reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      hospitals: {
        Row: {
          accreditation: string[] | null
          contact_number: string | null
          created_at: string | null
          description: string | null
          email: string | null
          emergency_services: boolean | null
          facilities: string[] | null
          id: string
          insurance_providers: string[] | null
          location: string
          name: string
          operating_hours: Json | null
          rating: number | null
          specialities: string[] | null
          total_reviews: number | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          accreditation?: string[] | null
          contact_number?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          emergency_services?: boolean | null
          facilities?: string[] | null
          id?: string
          insurance_providers?: string[] | null
          location: string
          name: string
          operating_hours?: Json | null
          rating?: number | null
          specialities?: string[] | null
          total_reviews?: number | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          accreditation?: string[] | null
          contact_number?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          emergency_services?: boolean | null
          facilities?: string[] | null
          id?: string
          insurance_providers?: string[] | null
          location?: string
          name?: string
          operating_hours?: Json | null
          rating?: number | null
          specialities?: string[] | null
          total_reviews?: number | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      medical_records: {
        Row: {
          created_at: string | null
          date: string
          file_path: string
          id: string
          name: string
          size: string
          type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          date: string
          file_path: string
          id?: string
          name: string
          size: string
          type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string
          file_path?: string
          id?: string
          name?: string
          size?: string
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "medical_records_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          bio: string | null
          clinic_address: string | null
          clinic_name: string | null
          full_name: string | null
          id: string
          phone_number: string | null
          practice_locations: string[] | null
          profile_image_url: string | null
          registration_status:
            | Database["public"]["Enums"]["registration_status"]
            | null
          role: Database["public"]["Enums"]["user_role"]
          specialization: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          bio?: string | null
          clinic_address?: string | null
          clinic_name?: string | null
          full_name?: string | null
          id: string
          phone_number?: string | null
          practice_locations?: string[] | null
          profile_image_url?: string | null
          registration_status?:
            | Database["public"]["Enums"]["registration_status"]
            | null
          role?: Database["public"]["Enums"]["user_role"]
          specialization?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          bio?: string | null
          clinic_address?: string | null
          clinic_name?: string | null
          full_name?: string | null
          id?: string
          phone_number?: string | null
          practice_locations?: string[] | null
          profile_image_url?: string | null
          registration_status?:
            | Database["public"]["Enums"]["registration_status"]
            | null
          role?: Database["public"]["Enums"]["user_role"]
          specialization?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      revenue_metrics: {
        Row: {
          appointment_revenue: number
          created_at: string | null
          date: string
          id: string
          other_revenue: number
          subscription_revenue: number
          total_revenue: number
        }
        Insert: {
          appointment_revenue?: number
          created_at?: string | null
          date: string
          id?: string
          other_revenue?: number
          subscription_revenue?: number
          total_revenue?: number
        }
        Update: {
          appointment_revenue?: number
          created_at?: string | null
          date?: string
          id?: string
          other_revenue?: number
          subscription_revenue?: number
          total_revenue?: number
        }
        Relationships: []
      }
      reward_points: {
        Row: {
          amount: number | null
          created_at: string | null
          id: string
          points: number | null
          transaction_type: string
          user_id: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          id?: string
          points?: number | null
          transaction_type: string
          user_id?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          id?: string
          points?: number | null
          transaction_type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reward_points_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      shared_records: {
        Row: {
          appointment_id: string | null
          expires_at: string | null
          id: string
          shared_at: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          appointment_id?: string | null
          expires_at?: string | null
          id?: string
          shared_at?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          appointment_id?: string | null
          expires_at?: string | null
          id?: string
          shared_at?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shared_records_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shared_records_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      system_settings: {
        Row: {
          id: string
          last_modified_at: string | null
          last_modified_by: string | null
          setting_key: string
          setting_value: Json
        }
        Insert: {
          id?: string
          last_modified_at?: string | null
          last_modified_by?: string | null
          setting_key: string
          setting_value: Json
        }
        Update: {
          id?: string
          last_modified_at?: string | null
          last_modified_by?: string | null
          setting_key?: string
          setting_value?: Json
        }
        Relationships: [
          {
            foreignKeyName: "system_settings_last_modified_by_fkey"
            columns: ["last_modified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_analytics: {
        Row: {
          active_users: number
          appointments_booked: number
          created_at: string | null
          date: string
          id: string
          new_users: number
          total_users: number
        }
        Insert: {
          active_users?: number
          appointments_booked?: number
          created_at?: string | null
          date: string
          id?: string
          new_users?: number
          total_users?: number
        }
        Update: {
          active_users?: number
          appointments_booked?: number
          created_at?: string | null
          date?: string
          id?: string
          new_users?: number
          total_users?: number
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
      admin_action_type:
        | "user_management"
        | "system_config"
        | "security"
        | "audit"
      registration_status: "pending" | "approved" | "rejected"
      user_role: "user" | "doctor" | "executive" | "admin"
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
