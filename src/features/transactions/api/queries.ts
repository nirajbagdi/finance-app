import { queryOptions } from '@tanstack/react-query';

import { supabase } from '@/utils/supabase';

export const fetchTransactions = async () => {
    const { data, error } = await supabase.from('transactions').select();

    if (error) throw error;
    return data;
};

export const transactionsQueryOptions = queryOptions({
    queryKey: ['transactions'],
    queryFn: () => fetchTransactions(),
});
