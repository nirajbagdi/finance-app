// UI/Shared Components
import PageLayout from '@/components/layout/PageLayout';

// Store
import useBudgetStore from '@/features/budgets/store/useBudgetStore';
import useTransactionStore from '@/features/transactions/store/useTransactionStore';

// Components
import SpendingSummary from '@/features/budgets/components/SpendingSummary';
import BudgetCard from '@/features/budgets/components/BudgetCard';
import AddBudgetDialog from '@/features/budgets/components/AddBudgetDialog';

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

    return (
        <PageLayout
            title="Budgets"
            headerAction={
                <AddBudgetDialog
                    categoryOptions={budgetCategories}
                    onAddBudget={handleAddBudget}
                />
            }
        >
            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_2fr] items-start gap-4 lg:gap-6">
                <SpendingSummary
                    budgets={budgets}
                    transactions={transactions}
                    categorySpending={categorySpending}
                />

                <div>
                    {budgets.map((budget) => {
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
                    })}
                </div>
            </div>
        </PageLayout>
    );
}
