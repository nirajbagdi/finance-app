// External imports
import { Plus } from 'lucide-react';

// UI/Shared Components
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/layout/PageLayout';

// Store
import useBudgetStore from '@/features/budgets/store/useBudgetStore';
import useTransactionStore from '@/features/transactions/store/useTransactionStore';

// Components
import SpendingSummary from '@/features/budgets/components/SpendingSummary';
import BudgetCategoryCard from '@/features/budgets/components/BudgetCategoryCard';

// Utils
import { getSpendingByCategory } from '@/features/budgets/utils';
import DialogWrapper from '@/components/common/DialogWrapper';

export const Route = createFileRoute({
    component: BudgetsPage,
});

function BudgetsPage() {
    const { budgets } = useBudgetStore();
    const { transactions } = useTransactionStore();

    const categorySpending = getSpendingByCategory(transactions);

    const renderBudgetCards = () =>
        budgets.map((budget) => {
            const { category } = budget;

            const spent = categorySpending[category] || 0;
            const recentTransactions = transactions
                .filter((tx) => tx.category === category)
                .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
                .slice(0, 3);

            return (
                <BudgetCategoryCard
                    key={budget.category}
                    budget={budget}
                    spent={spent}
                    transactions={recentTransactions}
                />
            );
        });

    const renderHeaderAction = () => (
        <DialogWrapper
            title="Add New Budget"
            description="Choose a category to set a spending budget. These categories can help you monitor spending."
            trigger={
                <Button size="lg">
                    <Plus className="-mr-0.5" />
                    Add New Budget
                </Button>
            }
        >
            <form></form>
        </DialogWrapper>
    );

    return (
        <PageLayout title="Budgets" headerAction={renderHeaderAction()}>
            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_2fr] items-start gap-4 lg:gap-6">
                <SpendingSummary
                    budgets={budgets}
                    transactions={transactions}
                    categorySpending={categorySpending}
                />

                <div>{renderBudgetCards()}</div>
            </div>
        </PageLayout>
    );
}
