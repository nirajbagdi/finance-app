import { stringMatches } from '@/utils';

import type { Budget, Transaction } from '@/types/finance';

export function getSpendingByCategory(transactions: Transaction[]) {
    return transactions.reduce<Record<string, number>>(
        (acc, { category, amount }) => {
            for (const key in acc) {
                if (stringMatches(category, key)) {
                    acc[key] += amount;
                    return acc;
                }
            }

            acc[category] = (acc[category] || 0) + amount;
            return acc;
        },
        {}
    );
}

export function getBudgetUsage(budgets: Budget[], transactions: Transaction[]) {
    const budgetedCategories = budgets.map((b) => b.category);

    const totalSpent = transactions
        .filter((tx) => tx.amount < 0 && budgetedCategories.includes(tx.category))
        .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

    const budgetLimit = budgets.reduce((sum, b) => sum + b.value, 0);

    return { totalSpent, budgetLimit };
}
