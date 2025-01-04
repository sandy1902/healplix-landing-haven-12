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
          created_at: string
          date: string
          doctor_id: string | null
          doctor_name: string
          for_whom: string
          id: string
          location: string
          rating: number | null
          review: string | null
          specialty: string
          status: string
          time: string
          type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          date: string
          doctor_id?: string | null
          doctor_name: string
          for_whom: string
          id?: string
          location: string
          rating?: number | null
          review?: string | null
          specialty: string
          status?: string
          time: string
          type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          date?: string
          doctor_id?: string | null
          doctor_name?: string
          for_whom?: string
          id?: string
          location?: string
          rating?: number | null
          review?: string | null
          specialty?: string
          status?: string
          time?: string
          type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          bio: string | null
          created_at: string
          full_name: string | null
          id: string
          phone_number: string | null
          registration_status:
            | Database["public"]["Enums"]["registration_status"]
            | null
          role: Database["public"]["Enums"]["user_role"] | null
          specialization: string | null
        }
        Insert: {
          address?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          phone_number?: string | null
          registration_status?:
            | Database["public"]["Enums"]["registration_status"]
            | null
          role?: Database["public"]["Enums"]["user_role"] | null
          specialization?: string | null
        }
        Update: {
          address?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone_number?: string | null
          registration_status?:
            | Database["public"]["Enums"]["registration_status"]
            | null
          role?: Database["public"]["Enums"]["user_role"] | null
          specialization?: string | null
        }
        Relationships: []
      }
      revenue_metrics: {
        Row: {
          appointment_revenue: number
          created_at: string
          date: string
          id: string
          subscription_revenue: number
          total_revenue: number
        }
        Insert: {
          appointment_revenue?: number
          created_at?: string
          date: string
          id?: string
          subscription_revenue?: number
          total_revenue?: number
        }
        Update: {
          appointment_revenue?: number
          created_at?: string
          date?: string
          id?: string
          subscription_revenue?: number
          total_revenue?: number
        }
        Relationships: []
      }
      system_settings: {
        Row: {
          created_at: string
          id: string
          setting_key: string
          setting_value: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          setting_key: string
          setting_value?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          setting_key?: string
          setting_value?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_analytics: {
        Row: {
          active_users: number
          appointments_booked: number
          created_at: string
          date: string
          id: string
          new_users: number
          total_users: number
        }
        Insert: {
          active_users?: number
          appointments_booked?: number
          created_at?: string
          date: string
          id?: string
          new_users?: number
          total_users?: number
        }
        Update: {
          active_users?: number
          appointments_booked?: number
          created_at?: string
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