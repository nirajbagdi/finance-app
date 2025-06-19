import { formatAmount } from '@/utils';

import BudgetChart from './BudgetChart';

import type { Budget, Transaction } from '@/types/finance';

type SpendingSummaryProps = {
    budgets: Budget[];
    transactions: Transaction[];
    categorySpending: Record<string, number>;
};

const SpendingSummary = ({
    budgets,
    transactions,
    categorySpending,
}: SpendingSummaryProps) => (
    <div className="bg-card p-8 rounded-xl shadow-2xs">
        <div className="flex">
            <BudgetChart budgets={budgets} transactions={transactions} />
        </div>

        <h2 className="mt-6 font-bold text-xl">Spending Summary</h2>

        <div className="flex flex-col gap-4 mt-6">
            {budgets.map((budget) => (
                <SpendingSummaryItem
                    key={budget.category}
                    {...budget}
                    spent={categorySpending[budget.category]}
                />
            ))}
        </div>
    </div>
);

type SpendingSummaryItemProps = Budget & { spent: number };

const SpendingSummaryItem = ({
    category,
    theme,
    value: budgeted,
    spent,
}: SpendingSummaryItemProps) => (
    <div className="border-b-2 last:border-b-0 border-background pb-4">
        <div
            className="relative pl-4"
            style={
                {
                    '--legend-theme': theme,
                } as React.CSSProperties
            }
        >
            <div className="absolute top-1 sm:top-0 left-0 w-1 h-full rounded-full bg-[var(--legend-theme)]" />

            <div className="flex items-center justify-between">
                <p className="text-secondary-foreground text-sm">{category}</p>

                <p className="text-xs text-secondary-foreground">
                    <span className="text-sm font-bold text-grey-900 mr-1.5">
                        {formatAmount(Math.abs(spent))}
                    </span>
                    of {formatAmount(budgeted)}
                </p>
            </div>
        </div>
    </div>
);

export default SpendingSummary;
