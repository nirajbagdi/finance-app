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
            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_2fr] gap-4 lg:gap-6">
                <SpendingSummary budgets={budgets} transactions={transactions} />
                <div className="bg-card p-8 rounded-xl shadow-2xs">HELLO WORLD</div>
            </div>
        </PageLayout>
    );
}
