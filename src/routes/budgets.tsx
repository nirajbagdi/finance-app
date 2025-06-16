import useBudgetStore from '@/features/budgets/store/useBudgetStore';
import useTransactionStore from '@/features/transactions/store/useTransactionStore';

import PageLayout from '@/components/layout/PageLayout';

import SpendingSummary from '@/features/budgets/components/SpendingSummary';

export const Route = createFileRoute({
    component: BudgetsPage,
});

function BudgetsPage() {
    const { budgets } = useBudgetStore();
    const { transactions } = useTransactionStore();

    return (
        <PageLayout title="Budgets">
            <SpendingSummary budgets={budgets} transactions={transactions} />
        </PageLayout>
    );
}
