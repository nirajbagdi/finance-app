import useTransactionStore from '@/features/transactions/store/useTransactionStore';
import useBudgetStore from '@/features/budgets/store/useBudgetStore';
import usePotStore from '@/features/pots/store/usePotStore';

import TransactionPreview from '@/features/transactions/components/TransactionPreview';
import BalancePreview from '@/features/overview/components/BalancePreview';
import BudgetPreview from '@/features/budgets/components/BudgetPreview';
import PotPreview from '@/features/pots/components/PotPreview';

import FeatureCard from '@/features/overview/components/FeatureCard';
import PageLayout from '@/components/layout/PageLayout';

import { getBalanceSummary } from '@/features/overview/utils';

export const Route = createFileRoute({
    component: OverviewPage,
});

function OverviewPage() {
    const { transactions } = useTransactionStore();
    const { budgets } = useBudgetStore();
    const { pots } = usePotStore();

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
            </div>
        </PageLayout>
    );
}
