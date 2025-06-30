import { getUserOrThrow, supabase } from '@/utils/supabase';

import type { Pot } from '@/types/finance';

export const fetchPots = async () => {
    const user = await getUserOrThrow();

    const { data, error } = await supabase.from('pots').select().eq('user_id', user.id);

    if (error) {
        console.error('Error fetching pots: ', error);
        throw new Error('Failed to fetch pots');
    }
    return data;
};

export const addPot = async (pot: Pot) => {
    const user = await getUserOrThrow();

    const { data, error } = await supabase.from('pots').insert({
        user_id: user.id,
        email: user.email,
        ...pot,
    });

    if (error) {
        console.error('Error adding pot: ', error);
        throw new Error('Failed to add pot');
    }
    return data;
};

export const editPot = async (name: string, edits: Partial<Pot>) => {
    const user = await getUserOrThrow();

    const { data, error } = await supabase
        .from('pots')
        .update(edits)
        .eq('name', name)
        .eq('user_id', user.id);

    if (error) {
        console.error(`Error editing pot "${name}":`, error);
        throw new Error('Failed to edit pot');
    }
    return data;
};

export const deletePot = async (name: string) => {
    const user = await getUserOrThrow();

    const { error } = await supabase.from('pots').delete().eq('name', name).eq('user_id', user.id);

    if (error) {
        console.error(`Error deleting pot "${name}":`, error);
        throw new Error('Failed to delete pot');
    }
    return name;
};

export const addMoneyToPot = async ({ name, amount }: { name: string; amount: number }) => {
    const user = await getUserOrThrow();

    const { data, error } = await supabase.rpc('add_money_to_pot', {
        pot_name: name,
        money_to_add: amount,
        uid: user.id,
    });

    if (error) {
        console.error(`Error adding money to pot "${name}":`, error);
        throw new Error('Failed to add money');
    }
    return data;
};

export const withdrawMoneyFromPot = async ({ name, amount }: { name: string; amount: number }) => {
    const user = await getUserOrThrow();

    const { data, error } = await supabase.rpc('withdraw_from_pot', {
        pot_name: name,
        amount: amount,
        uid: user.id,
    });

    if (error) {
        console.error(`Error withdrawing money from pot "${name}":`, error);
        throw new Error('Failed to withdraw money');
    }
    return data;
};
