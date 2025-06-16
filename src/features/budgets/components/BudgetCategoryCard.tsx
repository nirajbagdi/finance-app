import { Link } from '@tanstack/react-router';

import ColoredLegend from '@/components/common/ColoredLegend';
import RightArrowIcon from '@/icons/common/right-arrow.svg?react';

import TransactionList from '@/features/transactions/components/TransactionList';

import { formatAmount } from '@/utils/formatting';

import type { Budget, Transaction } from '@/types/finance';

type BudgetCategoryCardProps = {
    budget: Budget;
    spent: number;
    transactions: Transaction[];
};

const BudgetCategoryCard = ({
    budget,
    spent,
    transactions,
}: BudgetCategoryCardProps) => {
    const maxBudgetAmount = formatAmount(budget.value);

    return (
        <div className="bg-card p-8 rounded-xl shadow-2xs mb-4 lg:mb-6 last:mb-0">
            <header className="mb-6">
                <div className="flex items-center gap-2.5 mb-2">
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

            <div className="bg-background rounded-xl px-4 py-6 mt-6">
                <div className="mb-5 flex items-center justify-between">
                    <h3 className="text-base font-bold">Latest Spending</h3>

                    <Link
                        to="/transactions"
                        search={{
                            query: '',
                            page: 1,
                            sort: 'Latest',
                            category: budget.category,
                        }}
                        className="flex items-center gap-2 text-[13px] text-secondary-foreground fill-secondary-foreground hover:text-primary-foreground hover:fill-primary-foreground"
                    >
                        <span>See All</span>
                        <RightArrowIcon className="fill-inherit" />
                    </Link>
                </div>

                <TransactionList transactions={transactions} compact />
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
            className="w-full h-8 rounded-sm bg-background overflow-hidden flex items-center px-1"
            style={
                {
                    '--progress-theme': theme,
                } as React.CSSProperties
            }
        >
            <div
                className="h-6 rounded-sm bg-[var(--progress-theme)]"
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
