import { supabase } from '@/utils/supabase';

export const fetchTransactions = async () => {
    const { data, error } = await supabase.from('transactions').select();

    if (error) {
        console.error('Error fetching transactions: ', error);
        throw new Error('Failed to fetch transactions');
    }

    return data;
};
