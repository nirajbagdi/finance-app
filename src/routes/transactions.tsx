import useTransactionStore from '@/features/transactions/useTransactionStore';

import useMediaQuery from '@/hooks/useMediaQuery';

import TransactionList from '@/features/transactions/components/TransactionList';
import TransactionTable from '@/features/transactions/components/TransactionTable';
import TransactionSearch from '@/features/transactions/components/TransactionSearch';

import PageLayout from '@/components/layout/PageLayout';

export const Route = createFileRoute({
    component: TransactionsPage,
});

function TransactionsPage() {
    const { transactions } = useTransactionStore();

    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <PageLayout title="Transactions">
            <div className="bg-card p-8 rounded-xl shadow-2xs">
                <div className="mb-10 flex items-center justify-between gap-6">
                    <TransactionSearch onSearch={() => {}} />
                </div>

                {isMobile ? (
                    <TransactionList transactions={transactions} />
                ) : (
                    <TransactionTable transactions={transactions} />
                )}
            </div>
        </PageLayout>
    );
}
