// UI/Shared Components
import PageLayout from '@/components/layout/PageLayout';

// Components
import SpendingSummary from '@/features/budgets/components/SpendingSummary';
import BudgetCard from '@/features/budgets/components/BudgetCard';
import AddBudgetDialog from '@/features/budgets/components/AddBudgetDialog';

// Utils
import { getSpendingByCategory } from '@/features/budgets/utils';

// Types
import type { BudgetFormFields } from '@/features/budgets/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    addBudget,
    editBudget,
    deleteBudget,
    budgetsQueryOptions,
} from '@/features/budgets/api/queries';
import { transactionsQueryOptions } from '@/features/transactions/api/queries';
import type { Budget } from '@/types/finance';

export const Route = createFileRoute({
    component: BudgetsPage,
});

function BudgetsPage() {
    const queryClient = useQueryClient();

    const { data: budgets = [] } = useQuery(budgetsQueryOptions);
    const { data: transactions = [] } = useQuery(transactionsQueryOptions);

    const categorySpending = getSpendingByCategory(transactions);

    const budgetCategories = [...new Set(transactions.map((tx) => tx.category))];

    const addBudgetMutation = useMutation({
        mutationFn: addBudget,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['budgets'] }),
    });

    const editBudgetMutation = useMutation({
        mutationFn: async ({
            category,
            updates,
        }: {
            category: string;
            updates: Partial<Budget>;
        }) => editBudget(category, updates),

        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['budgets'] }),
    });

    const deleteBudgetMutation = useMutation({
        mutationFn: async (category: string) => deleteBudget(category),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['budgets'] }),
    });

    const handleAddBudget = (data: BudgetFormFields) => {
        addBudgetMutation.mutate({
            category: data.category,
            value: +data.maxSpend,
            theme: data.theme,
        });
    };

    const handleEditBudget = (data: BudgetFormFields) => {
        editBudgetMutation.mutate({
            category: data.category,
            updates: {
                theme: data.theme,
                value: +data.maxSpend,
            },
        });
    };

    const handleDeleteBudget = (category: string | null) => {
        if (category !== null) deleteBudgetMutation.mutate(category);

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
