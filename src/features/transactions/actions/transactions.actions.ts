import { supabase } from '@/utils/supabase';

export async function getTransactions() {
    const { data: transactions } = await supabase.from('transactions').select();
    return transactions;
}
