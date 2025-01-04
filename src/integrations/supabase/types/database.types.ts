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
          id: string
          user_id: string | null
          doctor_id: string | null
          doctor_name: string
          specialty: string
          date: string
          time: string
          location: string
          status: string
          for_whom: string
          rating: number | null
          review: string | null
          type: string
          created_at: string
        }
      }
      profiles: {
        Row: {
          id: string
          full_name: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          registration_status: Database["public"]["Enums"]["registration_status"] | null
          phone_number: string | null
          address: string | null
          bio: string | null
          specialization: string | null
          created_at: string
        }
      }
      revenue_metrics: {
        Row: {
          id: string
          date: string
          total_revenue: number
          appointment_revenue: number
          subscription_revenue: number
          created_at: string
        }
      }
      system_settings: {
        Row: {
          id: string
          setting_key: string
          setting_value: string | null
          created_at: string
          updated_at: string
        }
      }
      user_analytics: {
        Row: {
          id: string
          date: string
          total_users: number
          new_users: number
          active_users: number
          appointments_booked: number
          created_at: string
        }
      }
    }
    Enums: {
      user_role: "user" | "doctor" | "admin" | "executive"
      registration_status: "pending" | "approved" | "rejected"
    }
  }
}