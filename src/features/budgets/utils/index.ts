import { stringMatches } from '@/utils/string';

import type { Transaction } from '@/types/finance';

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
