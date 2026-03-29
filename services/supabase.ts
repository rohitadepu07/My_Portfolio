/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ooxvbawqxdlfwczgezwy.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_qZ3h9JGRXcWxGazLxN0PEQ_7KGxvnDT';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
    console.warn('Supabase env vars not provided at build time. Using fallback values.\n' +
        'For GitHub Pages, set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your build pipeline (actions/secrets).');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
