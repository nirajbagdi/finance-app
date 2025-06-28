import { queryOptions } from '@tanstack/react-query';

import { supabase } from '@/utils/supabase';

import type { Budget } from '@/types/finance';

export const fetchBudgets = async () => {
    const { data, error } = await supabase.from('budgets').select();

    if (error) throw error;
    return data;
};

export const addBudget = async (budget: Budget) => {
    const { data, error } = await supabase.from('budgets').insert({
        user_id: 'cf360be4-36af-4eb0-98ee-03f2d1e85a22',
        email: 'finance@test.com',
        ...budget,
    });

    if (error) throw error;
    return data;
};

export const editBudget = async (category: string, edits: Partial<Budget>) => {
    const { data, error } = await supabase
        .from('budgets')
        .update(edits)
        .eq('category', category)
        .eq('email', 'finance@test.com');

    if (error) throw error;
    return data;
};

export const deleteBudget = async (category: string) => {
    const { error } = await supabase
        .from('budgets')
        .delete()
        .eq('category', category)
        .eq('user_id', 'cf360be4-36af-4eb0-98ee-03f2d1e85a22');

    if (error) throw error;
    return category;
};

export const budgetsQueryOptions = queryOptions({
    queryKey: ['budgets'],
    queryFn: () => fetchBudgets(),
});
