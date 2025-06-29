import { supabase } from '@/utils/supabase';

import type { Pot } from '@/types/finance';

export const fetchPots = async () => {
    const { data, error } = await supabase.from('pots').select();

    if (error) {
        console.error('Error fetching pots: ', error);
        throw new Error('Failed to fetch pots');
    }

    return data;
};

export const addPot = async (pot: Pot) => {
    const { data, error } = await supabase.from('pots').insert({
        user_id: 'cf360be4-36af-4eb0-98ee-03f2d1e85a22',
        email: 'finance@test.com',
        ...pot,
    });

    if (error) {
        console.error('Error adding pot: ', error);
        throw new Error('Failed to add pot');
    }

    return data;
};

export const editPot = async (name: string, edits: Partial<Pot>) => {
    const { data, error } = await supabase
        .from('pots')
        .update(edits)
        .eq('name', name)
        .eq('email', 'finance@test.com');

    if (error) {
        console.error(`Error editing pot "${name}":`, error);
        throw new Error('Failed to edit pot');
    }

    return data;
};

export const deletePot = async (name: string) => {
    const { error } = await supabase
        .from('pots')
        .delete()
        .eq('name', name)
        .eq('user_id', 'cf360be4-36af-4eb0-98ee-03f2d1e85a22');

    if (error) {
        console.error(`Error deleting pot "${name}":`, error);
        throw new Error('Failed to delete pot');
    }

    return name;
};

export const addMoneyToPot = async ({
    name,
    amount,
}: {
    name: string;
    amount: number;
}) => {
    const { data, error } = await supabase.rpc('add_money_to_pot', {
        pot_name: name,
        money_to_add: amount,
        uid: 'cf360be4-36af-4eb0-98ee-03f2d1e85a22',
    });

    if (error) {
        console.error(`Error adding money to pot "${name}":`, error);
        throw new Error('Failed to add money');
    }

    return data;
};

export const withdrawMoneyFromPot = async ({
    name,
    amount,
}: {
    name: string;
    amount: number;
}) => {
    const { data, error } = await supabase.rpc('withdraw_from_pot', {
        pot_name: name,
        amount: amount,
        uid: 'cf360be4-36af-4eb0-98ee-03f2d1e85a22',
    });

    if (error) {
        console.error(`Error withdrawing money from pot "${name}":`, error);
        throw new Error('Failed to withdraw money');
    }

    return data;
};
