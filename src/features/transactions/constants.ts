import type { Transaction } from '@/types/finance';

export enum ControlType {
    SORT = 'sort',
    CATEGORY = 'category',
}

export type SortOption = 'Latest' | 'Oldest' | 'A to Z' | 'Z to A' | 'Highest' | 'Lowest';

export type SelectControls = {
    [ControlType.SORT]: SortOption;
    [ControlType.CATEGORY]: string;
};

export const sortComparators: Record<SortOption, (a: Transaction, b: Transaction) => number> =
    {
        Latest: (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        Oldest: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        'A to Z': (a, b) => a.name.localeCompare(b.name),
        'Z to A': (a, b) => b.name.localeCompare(a.name),
        Highest: (a, b) => b.amount - a.amount,
        Lowest: (a, b) => a.amount - b.amount,
    };
