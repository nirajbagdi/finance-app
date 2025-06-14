import { create } from 'zustand';

import type { Budget } from '@/types/finance';

import { budgets } from './mockData';

type BudgetState = {
    budgets: Budget[];

    addBudget: (budget: Budget) => void;
    editBudget: (category: string, edits: Partial<Budget>) => void;
    deleteBudget: (category: string) => void;
};

const useBudgetStore = create<BudgetState>((set) => ({
    budgets,

    addBudget: (budget) => {
        set((state) => ({
            budgets: [...state.budgets, budget],
        }));
    },
    editBudget: (category, edits) => {
        set((state) => ({
            budgets: state.budgets.map((budget) =>
                budget.category === category ? { ...budget, ...edits } : budget
            ),
        }));
    },
    deleteBudget: (category) => {
        set((state) => ({
            budgets: state.budgets.filter((budget) => budget.category !== category),
        }));
    },
}));

export default useBudgetStore;
