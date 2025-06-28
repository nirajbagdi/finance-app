import { queryOptions } from '@tanstack/react-query';

import { supabase } from '@/utils/supabase';

import type { Pot } from '@/types/finance';

export const fetchPots = async () => {
    const { data, error } = await supabase.from('pots').select();

    if (error) throw error;
    return data;
};

export const addPot = async (pot: Pot) => {
    const { data, error } = await supabase.from('pots').insert({
        user_id: 'cf360be4-36af-4eb0-98ee-03f2d1e85a22',
        email: 'finance@test.com',
        ...pot,
    });

    if (error) throw error;
    return data;
};

export const editPot = async (name: string, edits: Partial<Pot>) => {
    const { data, error } = await supabase
        .from('pots')
        .update(edits)
        .eq('name', name)
        .eq('email', 'finance@test.com');

    if (error) throw error;
    return data;
};

export const deletePot = async (name: string) => {
    const { error } = await supabase
        .from('pots')
        .delete()
        .eq('name', name)
        .eq('user_id', 'cf360be4-36af-4eb0-98ee-03f2d1e85a22');

    if (error) throw error;
    return name;
};

export const potsQueryOptions = queryOptions({
    queryKey: ['pots'],
    queryFn: () => fetchPots(),
});
