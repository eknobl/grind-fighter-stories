import { createClient } from '@supabase/supabase-js';

// Server-side only — uses service_role key to bypass RLS
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default supabaseAdmin;
