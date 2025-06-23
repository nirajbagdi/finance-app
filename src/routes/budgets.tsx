// External imports
import { Plus } from 'lucide-react';

// UI/Shared Components
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/layout/PageLayout';
import DialogWrapper from '@/components/common/DialogWrapper';

// Store
import useBudgetStore from '@/features/budgets/store/useBudgetStore';
import useTransactionStore from '@/features/transactions/store/useTransactionStore';

// Components
import BudgetForm from '@/features/budgets/components/BudgetForm';
import SpendingSummary from '@/features/budgets/components/SpendingSummary';
import BudgetCard from '@/features/budgets/components/BudgetCard';

// Utils
import { getSpendingByCategory } from '@/features/budgets/utils';

// Types
import type { BudgetFormFields } from '@/features/budgets/types';

export const Route = createFileRoute({
    component: BudgetsPage,
});

function BudgetsPage() {
    const { budgets, addBudget, editBudget, deleteBudget } = useBudgetStore();
    const { transactions } = useTransactionStore();

    const categorySpending = getSpendingByCategory(transactions);

    const budgetCategories = [...new Set(transactions.map((tx) => tx.category))];

    const handleAddBudget = (data: BudgetFormFields) => {
        addBudget({
            category: data.category,
            value: +data.maxSpend,
            theme: data.theme,
        });
    };

    const handleEditBudget = (data: BudgetFormFields) => {
        editBudget(data.category, {
            theme: data.theme,
            value: +data.maxSpend,
        });
    };

    const handleDeleteBudget = (category: string | null) => {
        if (category !== null) deleteBudget(category);

        // Find and click the close button to close the dialog
        const closeButton = document.querySelector(
            '[data-slot="dialog-close"]'
        ) as HTMLButtonElement;
        if (closeButton) closeButton.click();
    };

    const renderBudgetCards = () =>
        budgets.map((budget) => {
            const { category } = budget;

            const spent = categorySpending[category] || 0;
            const recentTransactions = [...transactions]
                .filter((tx) => tx.category === category)
                .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
                .slice(0, 3);

            return (
                <BudgetCard
                    key={budget.category}
                    budget={budget}
                    spent={spent}
                    transactions={recentTransactions}
                    onEditBudget={handleEditBudget}
                    onDeleteBudget={handleDeleteBudget}
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
            <BudgetForm
                defaultValues={{
                    category: '',
                    theme: '',
                    maxSpend: '',
                }}
                categoryOptions={budgetCategories}
                actionLabel="Add Budget"
                onSubmit={handleAddBudget}
            />
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
