import type { Transaction } from '@/types/finance';

export enum ControlType {
    SORT = 'sort',
    CATEGORY = 'category',
}

export type SortOption =
    | 'Latest'
    | 'Oldest'
    | 'A to Z'
    | 'Z to A'
    | 'Highest'
    | 'Lowest';

export type SelectControls = {
    [ControlType.SORT]: SortOption;
    [ControlType.CATEGORY]: string;
};

export const sortComparators: Record<
    SortOption,
    (a: Transaction, b: Transaction) => number
> = {
    Latest: (a, b) => Date.parse(b.date) - Date.parse(a.date),
    Oldest: (a, b) => Date.parse(a.date) - Date.parse(b.date),

    'A to Z': (a, b) => a.name.localeCompare(b.name),
    'Z to A': (a, b) => b.name.localeCompare(a.name),

    Highest: (a, b) => b.amount - a.amount,
    Lowest: (a, b) => a.amount - b.amount,
};
