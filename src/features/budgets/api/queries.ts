import { queryOptions } from '@tanstack/react-query';

import { supabase } from '@/utils/supabase';

export const fetchBudgets = async () => {
    const { data, error } = await supabase.from('budgets').select();

    if (error) throw error;
    return data;
};

export const budgetsQueryOptions = queryOptions({
    queryKey: ['budgets'],
    queryFn: () => fetchBudgets(),
});
