// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ayglbhzigyajywxmojmj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5Z2xiaHppZ3lhanl3eG1vam1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYwMTk4MTMsImV4cCI6MjA1MTU5NTgxM30.qvVVuUYCoCNqiBtbNW0SWTwyc0Xi7tdxsSDCq-KdTAU";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);