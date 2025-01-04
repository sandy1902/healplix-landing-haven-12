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
      profiles: ProfilesTable;
      system_settings: SystemSettingsTable;
      user_analytics: UserAnalyticsTable;
      revenue_metrics: RevenueMetricsTable;
      appointments: AppointmentsTable;
    };
    Views: {};
    Functions: {};
    Enums: {
      registration_status: "pending" | "approved" | "rejected";
      user_role: "user" | "doctor" | "executive" | "admin";
    };
    CompositeTypes: {};
  };
}