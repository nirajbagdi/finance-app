// UI/Shared components
import PageLayout from '@/components/layout/PageLayout';

export const Route = createFileRoute({
    component: RecurringBillsPage,
});

function RecurringBillsPage() {
    return (
        <PageLayout title="Recurring Bills">
            <div>Recurring Bills</div>
        </PageLayout>
    );
}
