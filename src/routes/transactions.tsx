import { useMemo } from 'react';
import { useSearch, useNavigate } from '@tanstack/react-router';

import useTransactionStore from '@/features/transactions/useTransactionStore';

import useMediaQuery from '@/hooks/useMediaQuery';
import usePagination from '@/hooks/usePagination';

import TransactionList from '@/features/transactions/components/TransactionList';
import TransactionTable from '@/features/transactions/components/TransactionTable';
import TransactionSearch from '@/features/transactions/components/TransactionSearch';

import PageLayout from '@/components/layout/PageLayout';
import PaginationControls from '@/components/common/PaginationControls';

import { stringMatches } from '@/utils/string';
import { sortComparators, type SortOption } from '@/features/transactions/constants';

type SearchParams = {
    query: string;
    sort: SortOption;
    category: string;
    page: number;
};

export const Route = createFileRoute({
    component: TransactionsPage,

    validateSearch: (search: SearchParams) => {
        return {
            query: search.query ?? '',
            sort: search.sort ?? 'Latest',
            category: search.category ?? 'All',
            page: +(search.page ?? 1),
        };
    },
});

function TransactionsPage() {
    const search = useSearch({ from: '/transactions' });
    const navigate = useNavigate({ from: '/transactions' });

    const { transactions } = useTransactionStore();

    const { query, sort, category } = search;

    const updateSearchParams = (updates: Partial<typeof search>) => {
        navigate({ search: (prev) => ({ ...prev, ...updates }) });
    };

    // Filter transactions based on "search query" and "category"
    const filteredTransactions = useMemo(() => {
        const isAllCategories = category === 'All';

        return transactions.filter(({ name: txName, category: txCategory }) => {
            const matchesQuery = stringMatches(txName, query);
            const matchesCategory = isAllCategories || stringMatches(txCategory, category);

            return matchesQuery && matchesCategory;
        });
    }, [transactions, query, category]);

    // Sort transactions based on "sort" criteria
    const sortedTransactions = useMemo(() => {
        const comparator = sortComparators[sort];
        return [...filteredTransactions].sort(comparator);
    }, [filteredTransactions, sort]);

    const isMobile = useMediaQuery('(max-width: 768px)');

    const {
        currentPage,
        paginatedItems,
        totalPages,
        handlePageChange: onPageChange,
    } = usePagination(sortedTransactions);

    const handlePageChange = (newPage: number) => {
        updateSearchParams({ page: newPage });
        onPageChange(newPage);
    };

    const handleTransactionSearch = (query: string) => {
        updateSearchParams({ query, page: 1 });
    };

    return (
        <PageLayout title="Transactions">
            <div className="bg-card p-8 rounded-xl shadow-2xs">
                <div className="mb-10 flex items-center justify-between gap-6">
                    <TransactionSearch onSearch={handleTransactionSearch} />
                </div>

                {isMobile ? (
                    <TransactionList transactions={paginatedItems} />
                ) : (
                    <TransactionTable transactions={paginatedItems} />
                )}

                {totalPages > 1 && (
                    <div className="mt-10">
                        <PaginationControls
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}
            </div>
        </PageLayout>
    );
}
