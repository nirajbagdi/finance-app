// External imports
import { cn, formatAmount, getDayWithSuffix } from '@/utils';

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
            <RecurringBillListItem key={idx} {...bill} compact={compact} />
        ))}
    </ul>
);

type RecurringBillListItemProps = {
    avatar: string;
    name: string;
    date: string;
    amount: number;
    compact?: boolean;
};

const RecurringBillListItem = ({
    amount,
    avatar,
    date,
    name,
    compact,
}: RecurringBillListItemProps) => {
    const formattedAmount = formatAmount(amount);

    const isIncome = amount > 0;

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
                    src={avatar}
                    width={compact ? 28 : 40}
                    height={compact ? 28 : 40}
                    alt={name}
                    className="rounded-full"
                />

                <div className="flex-1">
                    <p
                        className={cn(
                            'font-bold',
                            compact ? 'text-[13px]' : 'text-sm'
                        )}
                    >
                        {name}
                    </p>

                    <time
                        dateTime={date as string}
                        className="text-xs text-secondary-foreground"
                    >
                        {`Monthly - ${getDayWithSuffix(date)}`}
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
