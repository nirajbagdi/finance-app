import { cn } from '@/utils/ui';
import { formatAmount, formatDate } from '@/utils/formatting';

import type { Transaction } from '@/types/finance';

type TransactionListProps = {
    transactions: Transaction[];
};

const TransactionList = ({ transactions }: TransactionListProps) => (
    <ul className="flex flex-col gap-4 lg:gap-6">
        {transactions.map((transaction, idx) => (
            <TransactionListItem key={idx} {...transaction} />
        ))}
    </ul>
);

type TransactionListItemProps = {
    avatar: string;
    name: string;
    category: string;
    date: string;
    amount: number;
};

const TransactionListItem = ({
    amount,
    avatar,
    date,
    name,
    category,
}: TransactionListItemProps) => {
    const formattedAmount = formatAmount(amount);
    const formattedDate = formatDate(date);

    const isIncome = amount > 0;

    return (
        <li className="border-b-2 last:border-b-0 border-background pb-4 lg:pb-6">
            <article className="flex items-center gap-4">
                <img
                    src={avatar}
                    width={40}
                    height={40}
                    alt={name}
                    className="rounded-full"
                />

                <div className="flex-1">
                    <p className="font-bold text-sm">{name}</p>
                    <span className="text-xs text-secondary-foreground">
                        {category}
                    </span>
                </div>

                <div>
                    <p
                        className={cn(
                            'font-bold text-sm mb-2 text-end',
                            isIncome && 'text-green'
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
