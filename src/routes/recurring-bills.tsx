// UI/Shared components
import PageLayout from '@/components/layout/PageLayout';

// Store
import useRecurringBillStore from '@/features/recurring-bills/store/useRecurringBillStore';

// Components
import RecurringBillSummary from '@/features/recurring-bills/components/RecurringBillSummary';

export const Route = createFileRoute({
    component: RecurringBillsPage,
});

function RecurringBillsPage() {
    const { recurringBills } = useRecurringBillStore();

    return (
        <PageLayout title="Recurring Bills">
            <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_2fr] items-start gap-4 lg:gap-6">
                <RecurringBillSummary recurringBills={recurringBills} />

                <div className="bg-card p-8 rounded-xl shadow-2xs">
                    RECURRING BILLS LIST
                </div>
            </div>
        </PageLayout>
    );
}
