// Hooks
import useBillSummaries from '@/features/recurring-bills/lib/hooks/useBillSummaries';

// Utils
import { formatAmount } from '@/utils';

// Type
import type { Transaction } from '@/types/finance';

type RecurringBillPreviewProps = {
    recurringBills: Transaction[];
};

const RecurringBillPreview = ({ recurringBills }: RecurringBillPreviewProps) => {
    const { totals } = useBillSummaries(recurringBills);

    return (
        <>
            <RecurringBillItem
                label="Paid Bills"
                value={totals.paid}
                theme="#277C78"
            />
            <RecurringBillItem
                label="Total Upcoming"
                value={totals.upcoming}
                theme="#F2CDAC"
            />
            <RecurringBillItem
                label="Due Soon"
                value={totals.dueSoon}
                theme="#82C9D7"
            />
        </>
    );
};

type RecurringBillItemProps = {
    label: string;
    value: number;
    theme: string;
};

const RecurringBillItem = ({ label, value, theme }: RecurringBillItemProps) => (
    <div
        className="flex items-center justify-between text-sm p-6 bg-beige-100 rounded-xl mb-4 border-l-4 border-l-[var(--bill-theme)]"
        style={{ '--bill-theme': theme } as React.CSSProperties}
    >
        <p className="text-grey-500">{label}</p>
        <p className="font-bold">{formatAmount(value)}</p>
    </div>
);

export default RecurringBillPreview;
