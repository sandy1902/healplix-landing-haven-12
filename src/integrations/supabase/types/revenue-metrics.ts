export interface RevenueMetricsTable {
  Row: {
    id: string;
    date: string;
    total_revenue: number;
    appointment_revenue: number;
    subscription_revenue: number;
    created_at: string;
  };
  Insert: {
    id?: string;
    date: string;
    total_revenue?: number;
    appointment_revenue?: number;
    subscription_revenue?: number;
    created_at?: string;
  };
  Update: {
    id?: string;
    date?: string;
    total_revenue?: number;
    appointment_revenue?: number;
    subscription_revenue?: number;
    created_at?: string;
  };
  Relationships: [];
}