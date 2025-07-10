// Components
import ColoredLegend from '@/components/common/ColoredLegend';

// Utils
import { cn, formatAmount } from '@/utils';

type BudgetSummaryProps = {
    spent: number;
    limit: number;
    theme: string;
};

const BudgetSummary = ({ spent, limit, theme }: BudgetSummaryProps) => {
    const isOverBudget = Math.abs(spent) > limit;

    return (
        <>
            <BudgetProgress spent={spent} limit={limit} theme={theme || '#000'} />

            <div className="flex items-center justify-between mt-3 w-[70%]">
                <ColoredLegend
                    value={formatAmount(Math.abs(spent))}
                    label="Spent"
                    theme={theme || '#000'}
                />
                <div className={cn(isOverBudget ? 'text-red' : 'text-foreground')}>
                    <ColoredLegend
                        value={formatAmount(spent + limit)}
                        label="Remaining"
                    />
                </div>
            </div>
        </>
    );
};

type BudgetProgressProps = BudgetSummaryProps;

const BudgetProgress = ({ spent, limit, theme }: BudgetProgressProps) => {
    const basePercentage = Math.abs((spent / limit) * 100);

    return (
        <div
            className="w-full h-8 rounded-sm bg-background overflow-hidden flex items-center px-1"
            style={{ '--progress-theme': theme } as React.CSSProperties}
        >
            <div
                className="h-6 rounded-sm bg-[var(--progress-theme)]"
                style={{ width: `${basePercentage}%` } as React.CSSProperties}
            />
        </div>
    );
};

export default BudgetSummary;
