// Hooks
import useBillSummaries from '../hooks/useBillSummaries';

// Icons
import RecurringBillIcon from '@/icons/feature/recurring/icon.svg?react';

// Utils
import { cn, formatAmount, sumBy } from '@/utils';

// Types
import type { Transaction } from '@/types/finance';

type RecurringBillSummaryProps = {
    recurringBills: Transaction[];
};

const RecurringBillSummary = ({ recurringBills }: RecurringBillSummaryProps) => {
    const { paid, upcoming, dueSoon, totals } = useBillSummaries(recurringBills);

    const totalBillAmount = sumBy(recurringBills, (bill) => Math.abs(bill.amount));

    const billSummaries = [
        { label: 'Paid Bills', count: paid.length, amount: totals.paid },
        { label: 'Total Upcoming', count: upcoming.length, amount: totals.upcoming },
        { label: 'Due Soon', count: dueSoon.length, amount: totals.dueSoon },
    ];

    return (
        <div className="flex flex-col md:flex-row lg:flex-col gap-5 md:h-48 lg:h-auto">
            <div className="bg-foreground p-6 rounded-xl shadow-2xs text-background text-sm md:flex-1 flex items-center gap-x-5 md:flex-col md:justify-between md:items-start">
                <RecurringBillIcon className="md:mb-6" />

                <div>
                    <p className="mb-2">Total Bills</p>
                    <p className="text-3xl font-bold text-white">
                        {formatAmount(totalBillAmount)}
                    </p>
                </div>
            </div>

            <div className="bg-card p-6 rounded-xl shadow-2xs text-xs md:flex-1">
                <p className="mb-6 text-base font-bold text-primary-foreground">
                    Summary
                </p>

                <div className="flex flex-col gap-4">
                    {billSummaries.map(({ label, count, amount }) => {
                        const isDueSoon = label === 'Due Soon';

                        return (
                            <div
                                key={label}
                                className={cn(
                                    'flex justify-between items-center border-b-2 last:border-b-0 border-gray-200 pb-3',
                                    isDueSoon && 'text-red'
                                )}
                            >
                                <span
                                    className={cn(
                                        isDueSoon
                                            ? 'text-red'
                                            : 'text-secondary-foreground'
                                    )}
                                >
                                    {label}
                                </span>

                                <span className="font-bold">
                                    {count} ({formatAmount(amount)})
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default RecurringBillSummary;
