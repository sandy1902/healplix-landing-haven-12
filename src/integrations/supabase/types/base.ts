import { Database } from './database.types';
import type { ProfilesTable } from './profiles';
import type { SystemSettingsTable } from './system-settings';
import type { UserAnalyticsTable } from './user-analytics';
import type { RevenueMetricsTable } from './revenue-metrics';
import type { AppointmentsTable } from './appointments';

export type Tables = Database['public']['Tables'];
export type Enums = Database['public']['Enums'];
export type Functions = Database['public']['Functions'];

export type { ProfilesTable };
export type { SystemSettingsTable };
export type { UserAnalyticsTable };
export type { RevenueMetricsTable };
export type { AppointmentsTable };