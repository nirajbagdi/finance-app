export type Balance = {
    current: number;
    income: number;
    expenses: number;
};

export type Budget = {
    category: string;
    value: number;
    theme?: string;
};

export type Pot = {
    name: string;
    target: number;
    total: number;
    theme: string;
};

export type Transaction = {
    avatar: string;
    name: string;
    category: string;
    date: string;
    amount: number;
    recurring: boolean;
};
