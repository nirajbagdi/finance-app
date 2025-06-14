import { create } from 'zustand';

import type { Pot } from '@/types/finance';

import { pots } from './mockData';

type PotState = {
    pots: Pot[];

    addPot: (pot: Pot) => void;
    editPot: (name: string, edits: Partial<Pot>) => void;
    deletePot: (name: string) => void;
};

const usePotStore = create<PotState>((set) => ({
    pots: pots,

    addPot: (pot) => {
        set((state) => ({
            pots: [...state.pots, pot],
        }));
    },
    editPot: (name, edits) => {
        set((state) => ({
            pots: state.pots.map((pot) =>
                pot.name === name ? { ...pot, ...edits } : pot
            ),
        }));
    },
    deletePot: (name) => {
        set((state) => ({
            pots: state.pots.filter((pot) => pot.name !== name),
        }));
    },
}));

export default usePotStore;
