import { queryOptions } from '@tanstack/react-query';

import { supabase } from '@/utils/supabase';

export const fetchPots = async () => {
    const { data, error } = await supabase.from('pots').select();

    if (error) throw error;
    return data;
};

export const potsQueryOptions = queryOptions({
    queryKey: ['pots'],
    queryFn: () => fetchPots(),
});
