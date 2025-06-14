import type { Budget, Transaction } from '@/types/finance';

export function calculateTotal<T>(
    items: T[],
    getValue: (item: T) => number = (item) => item as unknown as number
) {
    return items.reduce((total, item) => total + getValue(item), 0);
}

export function calculateBalance(transactions: Transaction[]) {
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

export function calculateBudgetUsage(
    budgets: Budget[],
    transactions: Transaction[]
) {
    const budgetedCategories = budgets.map((b) => b.category);

    const totalSpent = transactions
        .filter((tx) => tx.amount < 0 && budgetedCategories.includes(tx.category))
        .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

    const budgetLimit = budgets.reduce((sum, b) => sum + b.value, 0);

    return { totalSpent, budgetLimit };
}
