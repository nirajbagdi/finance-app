// Utils
import { cn, formatAmount, getDayWithSuffix } from '@/utils';
import { getBillStatus } from '../lib/utils';

// Icons
import BillPaidIcon from '@/icons/common/bill-paid.svg?react';
import BillDueIcon from '@/icons/common/bill-due.svg?react';

// Types
import type { Transaction } from '@/types/finance';

type RecurringBillListProps = {
    recurringBills: Transaction[];
    compact?: boolean;
};

const RecurringBillList = ({
    recurringBills,
    compact = false,
}: RecurringBillListProps) => (
    <ul
        className={cn(
            'flex flex-col',
            compact ? 'gap-2 lg:gap-4' : 'gap-4 lg:gap-6'
        )}
    >
        {recurringBills.map((bill, idx) => (
            <RecurringBillListItem key={idx} bill={bill} compact={compact} />
        ))}
    </ul>
);

type RecurringBillListItemProps = {
    bill: Transaction;
    compact?: boolean;
};

const RecurringBillListItem = ({ bill, compact }: RecurringBillListItemProps) => {
    const formattedAmount = formatAmount(bill.amount);

    const isIncome = bill.amount > 0;

    const isBillPaid = getBillStatus(bill) === 'paid';
    const isBillDue = getBillStatus(bill) === 'dueSoon';

    return (
        <li
            className={cn(
                'border-b-2 last:border-b-0',
                compact ? 'pb-2' : 'pb-4 lg:pb-6',
                compact ? 'border-gray-200' : 'border-background'
            )}
        >
            <article className="flex items-center gap-4">
                <img
                    src={bill.avatar}
                    width={compact ? 28 : 40}
                    height={compact ? 28 : 40}
                    alt={bill.name}
                    className="rounded-full"
                />

                <div className="flex-1">
                    <p
                        className={cn(
                            'font-bold mb-0.5',
                            compact ? 'text-[13px]' : 'text-sm'
                        )}
                    >
                        {bill.name}
                    </p>

                    <time
                        dateTime={bill.date as string}
                        className={cn(
                            'text-xs flex items-center gap-1',
                            isBillPaid
                                ? 'text-green'
                                : isBillDue
                                  ? 'text-red'
                                  : 'text-secondary-foreground'
                        )}
                    >
                        {`Monthly - ${getDayWithSuffix(bill.date)}`}
                        {isBillPaid && <BillPaidIcon />}
                        {isBillDue && <BillDueIcon />}
                    </time>
                </div>

                <div>
                    <p
                        className={cn(
                            'font-bold text-end',
                            isIncome && 'text-green',
                            compact ? 'text-[13px] mb-0' : 'text-sm mb-2'
                        )}
                    >
                        {isIncome ? '+' : ''}
                        {formattedAmount}
                    </p>
                </div>
            </article>
        </li>
    );
};

export default RecurringBillList;
