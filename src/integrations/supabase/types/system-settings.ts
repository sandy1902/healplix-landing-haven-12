export interface SystemSettingsTable {
  Row: {
    id: string;
    setting_key: string;
    setting_value: string | null;
    created_at: string;
    updated_at: string;
  };
  Insert: {
    id?: string;
    setting_key: string;
    setting_value?: string | null;
    created_at?: string;
    updated_at?: string;
  };
  Update: {
    id?: string;
    setting_key?: string;
    setting_value?: string | null;
    created_at?: string;
    updated_at?: string;
  };
  Relationships: [];
}