import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: true, storage: localStorage },
});

export const getUserOrThrow = async () => {
    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
        console.error('Authentication error:', error);
        throw new Error('User not authenticated');
    }
    return data.user;
};
