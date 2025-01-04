export interface UserAnalyticsTable {
  Row: {
    id: string;
    date: string;
    total_users: number;
    new_users: number;
    active_users: number;
    appointments_booked: number;
    created_at: string;
  };
  Insert: {
    id?: string;
    date: string;
    total_users?: number;
    new_users?: number;
    active_users?: number;
    appointments_booked?: number;
    created_at?: string;
  };
  Update: {
    id?: string;
    date?: string;
    total_users?: number;
    new_users?: number;
    active_users?: number;
    appointments_booked?: number;
    created_at?: string;
  };
  Relationships: [];
}