import ColoredLegend from '@/components/common/ColoredLegend';

import { formatAmount } from '@/utils/formatting';

import type { Budget } from '@/types/finance';

type BudgetCategoryCardProps = {
    budget: Budget;
    spent: number;
};

const BudgetCategoryCard = ({ budget, spent }: BudgetCategoryCardProps) => {
    const maxBudgetAmount = formatAmount(budget.value);

    return (
        <div className="bg-card p-8 rounded-xl shadow-2xs mb-4 lg:mb-6 last:mb-0">
            <header className="mb-6">
                <div className="flex items-center gap-2.5 mt-6 mb-2">
                    <span
                        className="inline-block w-4 h-4 rounded-full bg-[var(--budget-theme)]"
                        style={
                            {
                                '--budget-theme': budget.theme,
                            } as React.CSSProperties
                        }
                    />
                    <h2 className="font-bold text-xl">{budget.category}</h2>
                </div>

                <p className="text-secondary-foreground text-sm">
                    Maximum of {maxBudgetAmount}
                </p>
            </header>

            <BudgetProgress
                spent={spent}
                limit={budget.value}
                theme={budget.theme || '#000'}
            />

            <div className="flex items-center justify-between mt-3 w-[70%]">
                <ColoredLegend
                    value={formatAmount(Math.abs(spent))}
                    label="Spent"
                    theme={budget.theme || '#000'}
                />
                <ColoredLegend
                    value={formatAmount(spent + budget.value)}
                    label="Remaining"
                    theme="#f8f4f0"
                />
            </div>
        </div>
    );
};

type BudgetProgressProps = {
    spent: number;
    limit: number;
    theme: string;
};

const BudgetProgress = ({ spent, limit, theme }: BudgetProgressProps) => {
    const percentage = Math.abs((spent / limit) * 100);

    return (
        <div
            className="w-full h-8 rounded-md bg-background overflow-hidden flex items-center px-1"
            style={
                {
                    '--progress-theme': theme,
                } as React.CSSProperties
            }
        >
            <div
                className="h-6 rounded-md bg-[var(--progress-theme)]"
                style={
                    {
                        width: `${percentage}%`,
                    } as React.CSSProperties
                }
            />
        </div>
    );
};

export default BudgetCategoryCard;
