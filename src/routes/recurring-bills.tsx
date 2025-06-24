// External imports
import { useSearch, useNavigate } from '@tanstack/react-router';

// UI/Shared components
import PageLayout from '@/components/layout/PageLayout';

// Store
import useRecurringBillStore from '@/features/recurring-bills/store/useRecurringBillStore';

// Hooks
import useMediaQuery from '@/hooks/useMediaQuery';

// Components
import RecurringBillSummary from '@/features/recurring-bills/components/RecurringBillSummary';
import RecurringBillSearch from '@/features/recurring-bills/components/RecurringBillSearch';
import RecurringBillControls from '@/features/recurring-bills/components/RecurringBillControls';
import RecurringBillTable from '@/features/recurring-bills/components/RecurringBillTable';
import RecurringBillList from '@/features/recurring-bills/components/RecurringBillList';

// Types
import {
    type SelectControls,
    type SortOption,
} from '@/features/recurring-bills/constants';

type SearchParams = {
    query: string;
    sort: SortOption;
};

export const Route = createFileRoute({
    component: RecurringBillsPage,

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

    const { recurringBills } = useRecurringBillStore();

    const isMobile = useMediaQuery('(max-width: 768px)');

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
                        <RecurringBillList recurringBills={recurringBills} />
                    ) : (
                        <RecurringBillTable recurringBills={recurringBills} />
                    )}
                </div>
            </div>
        </PageLayout>
    );
}
