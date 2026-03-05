/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ooxvbawqxdlfwczgezwy.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_qZ3h9JGRXcWxGazLxN0PEQ_7KGxvnDT';

export const supabase = createClient(supabaseUrl, supabaseKey);
