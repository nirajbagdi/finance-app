// External imports
import { useQuery } from '@tanstack/react-query';

// UI/Shared Components
import PageLayout from '@/components/layout/PageLayout';

// Feature Components
import BalancePreview from '@/features/overview/components/BalancePreview';
import BudgetPreview from '@/features/budgets/components/BudgetPreview';
import FeatureCard from '@/features/overview/components/FeatureCard';
import PotPreview from '@/features/pots/components/PotPreview';
import TransactionPreview from '@/features/transactions/components/TransactionPreview';
import RecurringBillPreview from '@/features/recurring-bills/components/RecurringBillPreview';

// API
import { transactionsQueryOptions } from '@/features/transactions/api/queries';
import { potsQueryOptions } from '@/features/pots/api/queries';
import { budgetsQueryOptions } from '@/features/budgets/api/queries';

// Utils
import { getBalanceSummary } from '@/features/overview/utils';

export const Route = createFileRoute({
    loader: async ({ context: { queryClient } }) => {
        await Promise.all([
            queryClient.ensureQueryData(transactionsQueryOptions),
            queryClient.ensureQueryData(budgetsQueryOptions),
            queryClient.ensureQueryData(potsQueryOptions),
        ]);
    },

    component: OverviewPage,

    pendingComponent: () => <h2>Loading...</h2>,
});

function OverviewPage() {
    const { data: transactions = [] } = useQuery(transactionsQueryOptions);
    const { data: budgets = [] } = useQuery(budgetsQueryOptions);
    const { data: pots = [] } = useQuery(potsQueryOptions);

    const recurringBills = transactions.filter((tx) => tx.recurring);

    const balance = getBalanceSummary(transactions);

    return (
        <PageLayout title="Overview">
            <BalancePreview balance={balance} />

            <div className="mt-10 grid grid-cols-1 lg:grid-rows-(--dashboard-grid-rows) lg:grid-cols-2 gap-4 lg:gap-6">
                <FeatureCard
                    title="Pots"
                    link={{
                        label: 'See Details',
                        href: '/pots',
                    }}
                >
                    <PotPreview pots={pots} />
                </FeatureCard>

                <FeatureCard
                    title="Budgets"
                    link={{
                        label: 'See Details',
                        href: '/budgets',
                    }}
                    className="lg:row-span-2"
                >
                    <BudgetPreview budgets={budgets} transactions={transactions} />
                </FeatureCard>

                <FeatureCard
                    title="Transactions"
                    link={{
                        label: 'View All',
                        href: '/transactions',
                    }}
                    className="lg:row-span-2"
                >
                    <TransactionPreview transactions={transactions} />
                </FeatureCard>

                <FeatureCard
                    title="Recurring Bills"
                    link={{
                        label: 'See Details',
                        href: '/recurring-bills',
                    }}
                    className="lg:col-start-2 lg:col-end-3"
                >
                    <RecurringBillPreview recurringBills={recurringBills} />
                </FeatureCard>
            </div>
        </PageLayout>
    );
}
