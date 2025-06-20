// External imports
import { create } from 'zustand';

// Constants
import { pots } from '../mockData';

// Types
import type { Pot } from '@/types/finance';

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
            pots: [pot, ...state.pots],
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
