import { supabase } from '@/utils/supabase';

export async function getBudgets() {
    const { data: budgets } = await supabase.from('budgets').select();
    return budgets;
}
