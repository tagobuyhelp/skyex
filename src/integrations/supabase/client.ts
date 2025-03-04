
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Replace these values with your new Supabase account credentials
const SUPABASE_URL = "YOUR_NEW_SUPABASE_URL";
const SUPABASE_PUBLISHABLE_KEY = "YOUR_NEW_SUPABASE_ANON_KEY";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
