// External imports
import { useMemo } from 'react';
import { useDebounce } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';
import { useSearch, useNavigate } from '@tanstack/react-router';

// UI/Shared components
import PageLayout from '@/components/layout/PageLayout';
import Loader from '@/components/common/Loader';

// Hooks
import useMediaQuery from '@/hooks/useMediaQuery';

// Components
import RecurringBillSummary from '@/features/recurring-bills/components/RecurringBillSummary';
import RecurringBillSearch from '@/features/recurring-bills/components/RecurringBillSearch';
import RecurringBillControls from '@/features/recurring-bills/components/RecurringBillControls';
import RecurringBillTable from '@/features/recurring-bills/components/RecurringBillTable';
import RecurringBillList from '@/features/recurring-bills/components/RecurringBillList';

// Lib
import { transactionsQueryOptions } from '@/features/transactions/lib/queries';

// Utils
import { stringMatches } from '@/utils';

// Types
import {
    sortComparators,
    type SelectControls,
    type SortOption,
} from '@/features/recurring-bills/lib/constants';

type SearchParams = {
    query: string;
    sort: SortOption;
};

export const Route = createFileRoute({
    component: RecurringBillsPage,
    pendingComponent: () => <Loader />, // <-- Loader added here

    validateSearch: (search: SearchParams) => {
        return {
            query: search.query ?? '',
            sort: search.sort ?? 'Latest',
        };
    },
});

function RecurringBillsPage() {
    const search = useSearch({ from: '/recurring-bills' });
    const navigate = useNavigate({ from: '/recurring-bills' });

    const [debouncedQuery] = useDebounce(search.query, 300);

    const { data: transactions = [] } = useQuery(transactionsQueryOptions);

    const recurringBills = transactions.filter((tx) => tx.recurring);

    const isMobile = useMediaQuery('(max-width: 768px)');

    // Filter bills based on "search query"
    const filteredBills = useMemo(() => {
        return recurringBills.filter(({ name: billName }) => {
            const matchesQuery = stringMatches(billName, debouncedQuery);
            return matchesQuery;
        });
    }, [recurringBills, debouncedQuery, search.query]);

    // Sort transactions based on "sort" criteria
    const sortedBills = useMemo(() => {
        const comparator = sortComparators[search.sort];
        return [...filteredBills].sort(comparator);
    }, [filteredBills, search.sort]);

    const updateSearchParams = (updates: Partial<typeof search>) => {
        navigate({ search: (prev) => ({ ...prev, ...updates }) });
    };

    const handleBillSearch = (query: string) => {
        updateSearchParams({ query });
    };

    const handleItemSelect = (values: SelectControls) => {
        updateSearchParams({ ...values });
    };

    return (
        <PageLayout title="Recurring Bills">
            <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_2fr] items-start gap-4 lg:gap-6">
                <RecurringBillSummary recurringBills={recurringBills} />

                <div className="bg-card p-8 rounded-xl shadow-2xs">
                    <div className="mb-10 flex items-center justify-between gap-6">
                        <RecurringBillSearch onSearch={handleBillSearch} />
                        <RecurringBillControls onValueChange={handleItemSelect} />
                    </div>

                    {isMobile ? (
                        <RecurringBillList recurringBills={sortedBills} />
                    ) : (
                        <RecurringBillTable recurringBills={sortedBills} />
                    )}
                </div>
            </div>
        </PageLayout>
    );
}
