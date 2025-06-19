// External imports
import { cn } from '@/utils';

// Utils
import { formatAmount } from '@/utils';

type BalancePreviewProps = {
    balance: {
        current: number;
        income: number;
        expenses: number;
    };
};

const BalancePreview = ({ balance }: BalancePreviewProps) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
        <BalanceCard label="Current Balance" amount={balance.current} dark />
        <BalanceCard label="Income" amount={balance.income} />
        <BalanceCard label="Expenses" amount={balance.expenses} />
    </div>
);

type BalanceCardProps = {
    label: string;
    amount: number;
    dark?: boolean;
};

const BalanceCard = ({ label, amount, dark = false }: BalanceCardProps) => (
    <div
        className={cn(
            'p-6 rounded-xl shadow-2xs',
            dark ? 'bg-foreground' : 'bg-card'
        )}
    >
        <div
            className={cn(
                'text-sm mb-2.5',
                dark ? 'text-background' : 'text-secondary-foreground'
            )}
        >
            {label}
        </div>
        <div
            className={cn(
                'font-bold text-3xl',
                dark ? 'text-card' : 'text-foreground'
            )}
        >
            {formatAmount(amount)}
        </div>
    </div>
);

export default BalancePreview;
