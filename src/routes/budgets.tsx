import { Plus } from 'lucide-react';

import useBudgetStore from '@/features/budgets/store/useBudgetStore';
import useTransactionStore from '@/features/transactions/store/useTransactionStore';

import { Button } from '@/components/ui/button';
import PageLayout from '@/components/layout/PageLayout';

import SpendingSummary from '@/features/budgets/components/SpendingSummary';
import BudgetCategoryCard from '@/features/budgets/components/BudgetCategoryCard';

import { getSpendingByCategory } from '@/features/budgets/utils';

export const Route = createFileRoute({
    component: BudgetsPage,
});

function BudgetsPage() {
    const { budgets } = useBudgetStore();
    const { transactions } = useTransactionStore();

    const categorySpending = getSpendingByCategory(transactions);

    return (
        <PageLayout
            title="Budgets"
            headerAction={
                <Button size="lg">
                    <Plus className="-mr-0.5" />
                    Add New Budget
                </Button>
            }
        >
            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_2fr] items-start gap-4 lg:gap-6">
                <SpendingSummary
                    budgets={budgets}
                    transactions={transactions}
                    categorySpending={categorySpending}
                />

                <div>
                    {budgets.map((budget) => (
                        <BudgetCategoryCard
                            key={budget.category}
                            budget={budget}
                            spent={categorySpending[budget.category]}
                            transactions={transactions
                                .filter((tx) => tx.category === budget.category)
                                .slice(0, 3)}
                        />
                    ))}
                </div>
            </div>
        </PageLayout>
    );
}
