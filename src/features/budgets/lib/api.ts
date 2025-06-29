import { supabase } from '@/utils/supabase';

import type { Budget } from '@/types/finance';

export const fetchBudgets = async () => {
    const { data, error } = await supabase.from('budgets').select();

    if (error) {
        console.error('Error fetching budgets: ', error);
        throw new Error('Failed to fetch budgets');
    }

    return data;
};

export const addBudget = async (budget: Budget) => {
    const { data, error } = await supabase.from('budgets').insert({
        user_id: 'cf360be4-36af-4eb0-98ee-03f2d1e85a22',
        email: 'finance@test.com',
        ...budget,
    });

    if (error) {
        console.error('Error adding budget: ', error);
        throw new Error('Failed to add budget');
    }

    return data;
};

export const editBudget = async (category: string, edits: Partial<Budget>) => {
    const { data, error } = await supabase
        .from('budgets')
        .update(edits)
        .eq('category', category)
        .eq('email', 'finance@test.com');

    if (error) {
        console.error(`Error editing budget for category "${category}":`, error);
        throw new Error('Failed to edit budget');
    }

    return data;
};

export const deleteBudget = async (category: string) => {
    const { error } = await supabase
        .from('budgets')
        .delete()
        .eq('category', category)
        .eq('user_id', 'cf360be4-36af-4eb0-98ee-03f2d1e85a22');

    if (error) {
        console.error(`Error deleting budget for category "${category}":`, error);
        throw new Error('Failed to delete budget');
    }

    return category;
};
