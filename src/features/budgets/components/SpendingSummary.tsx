// UI/Shared components
import BudgetChart from './BudgetChart';

// Utils
import { cn, formatAmount } from '@/utils';

// Types
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
    <div className="bg-card p-8 rounded-xl shadow-2xs md:flex md:items-center md:gap-20 lg:block">
        <div className="flex md:ml-15 lg:ml-0">
            <BudgetChart budgets={budgets} transactions={transactions} />
        </div>

        <div className="flex-1">
            <h2 className="mt-6 font-bold text-xl">Spending Summary</h2>

            <div className="flex flex-col gap-4 mt-6">
                {budgets.map((budget) => {
                    const spent = categorySpending[budget.category];
                    const isOverBudget = Math.abs(spent) > budget.value;

                    return (
                        <SpendingSummaryItem
                            key={budget.category}
                            spent={spent}
                            isOverBudget={isOverBudget}
                            {...budget}
                        />
                    );
                })}
            </div>
        </div>
    </div>
);

type SpendingSummaryItemProps = Budget & { spent: number; isOverBudget: boolean };

const SpendingSummaryItem = ({
    category,
    theme,
    value: budgeted,
    spent,
    isOverBudget,
}: SpendingSummaryItemProps) => (
    <div className="border-b-2 last:border-b-0 border-[#0000000d] pb-4">
        <div
            className="relative pl-4"
            style={{ '--legend-theme': theme } as React.CSSProperties}
        >
            <div className="absolute top-1 sm:top-0 left-0 w-1 h-full rounded-full bg-[var(--legend-theme)]" />

            <div className="flex items-center justify-between">
                <p
                    className={cn(
                        'text-sm',
                        isOverBudget
                            ? 'text-red font-semibold'
                            : 'text-secondary-foreground '
                    )}
                >
                    {category}
                </p>

                <p className="text-xs text-secondary-foreground">
                    <span className="text-sm font-bold text-foreground mr-1.5">
                        {formatAmount(Math.abs(spent))}
                    </span>
                    of {formatAmount(budgeted)}
                </p>
            </div>
        </div>
    </div>
);

export default SpendingSummary;
