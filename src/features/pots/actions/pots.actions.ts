import { supabase } from '@/utils/supabase';

export async function getPots() {
    const { data: pots } = await supabase.from('pots').select();
    return pots;
}
