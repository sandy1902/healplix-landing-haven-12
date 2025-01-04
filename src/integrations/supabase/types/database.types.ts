export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          role: string | null;
          registration_status: string | null;
          phone_number: string | null;
          address: string | null;
          bio: string | null;
          specialization: string | null;
          created_at: string;
        };
      };
      appointments: {
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
      };
      user_analytics: {
        Row: {
          id: string;
          date: string;
          total_users: number;
          new_users: number;
          active_users: number;
          appointments_booked: number;
          created_at: string;
        };
      };
      revenue_metrics: {
        Row: {
          id: string;
          date: string;
          total_revenue: number;
          appointment_revenue: number;
          subscription_revenue: number;
          created_at: string;
        };
      };
    };
    Enums: {
      user_role: 'user' | 'doctor' | 'executive' | 'admin';
      registration_status: 'pending' | 'approved' | 'rejected';
    };
  };
}