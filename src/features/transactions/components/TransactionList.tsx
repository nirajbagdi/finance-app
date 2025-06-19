import { cn } from '@/utils';
import { formatAmount, formatDate } from '@/utils';

import type { Transaction } from '@/types/finance';

type TransactionListProps = {
    transactions: Transaction[];
    compact?: boolean;
};

const TransactionList = ({
    transactions,
    compact = false,
}: TransactionListProps) => (
    <ul
        className={cn(
            'flex flex-col',
            compact ? 'gap-2 lg:gap-4' : 'gap-4 lg:gap-6'
        )}
    >
        {transactions.map((transaction, idx) => (
            <TransactionListItem key={idx} {...transaction} compact={compact} />
        ))}
    </ul>
);

type TransactionListItemProps = {
    avatar: string;
    name: string;
    category: string;
    date: string;
    amount: number;
    compact?: boolean;
};

const TransactionListItem = ({
    amount,
    avatar,
    date,
    name,
    category,
    compact,
}: TransactionListItemProps) => {
    const formattedAmount = formatAmount(amount);
    const formattedDate = formatDate(date);

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

                    {!compact ? (
                        <span className="text-xs text-secondary-foreground">
                            {category}
                        </span>
                    ) : null}
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
                    <time
                        dateTime={date as string}
                        className="text-xs text-secondary-foreground"
                    >
                        {formattedDate}
                    </time>
                </div>
            </article>
        </li>
    );
};

export default TransactionList;
