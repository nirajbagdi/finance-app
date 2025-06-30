import { getUserOrThrow, supabase } from '@/utils/supabase';

import type { Budget } from '@/types/finance';

export const fetchBudgets = async () => {
    const user = await getUserOrThrow();

    const { data, error } = await supabase.from('budgets').select().eq('user_id', user.id);

    if (error) {
        console.error('Error fetching budgets: ', error);
        throw new Error('Failed to fetch budgets');
    }
    return data;
};

export const addBudget = async (budget: Budget) => {
    const user = await getUserOrThrow();

    const { data, error } = await supabase.from('budgets').insert({
        user_id: user.id,
        email: user.email,
        ...budget,
    });

    if (error) {
        console.error('Error adding budget: ', error);
        throw new Error('Failed to add budget');
    }
    return data;
};

export const editBudget = async (category: string, edits: Partial<Budget>) => {
    const user = await getUserOrThrow();

    const { data, error } = await supabase
        .from('budgets')
        .update(edits)
        .eq('category', category)
        .eq('user_id', user.id);

    if (error) {
        console.error(`Error editing budget for category "${category}":`, error);
        throw new Error('Failed to edit budget');
    }
    return data;
};

export const deleteBudget = async (category: string) => {
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { error } = await supabase
        .from('budgets')
        .delete()
        .eq('category', category)
        .eq('user_id', user.id);

    if (error) {
        console.error(`Error deleting budget for category "${category}":`, error);
        throw new Error('Failed to delete budget');
    }
    return category;
};
