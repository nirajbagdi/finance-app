import type { Transaction } from '@/types/finance';

export function getBalanceSummary(transactions: Transaction[]) {
    const income = transactions
        .filter((tx) => tx.amount > 0)
        .reduce((sum, tx) => sum + tx.amount, 0);

    const expenses =
        transactions
            .filter((tx) => tx.amount < 0)
            .reduce((sum, tx) => sum + tx.amount, 0) * -1;

    const current = income - expenses;
    return { income, expenses, current };
}
