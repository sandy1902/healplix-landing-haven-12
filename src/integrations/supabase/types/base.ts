import { Database } from './database.types';

export type { SystemSettingsTable } from './system-settings';
export type { Database };

export type Tables = Database['public']['Tables'];
export type Enums = Database['public']['Enums'];

export type ProfilesTable = Tables['profiles']['Row'];
export type AppointmentsTable = Tables['appointments']['Row'];
export type UserAnalyticsTable = Tables['user_analytics']['Row'];
export type RevenueMetricsTable = Tables['revenue_metrics']['Row'];