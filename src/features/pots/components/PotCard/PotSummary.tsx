// Feature components
import PotProgress from './PotProgress';

// Utils
import { cn, formatAmount } from '@/utils';

// Types
import type { Pot } from '@/types/finance';
import { MoneyActionTypes } from '@/features/pots/types';

type PotSummaryProps = {
    pot: Pot;
    actionType?: MoneyActionTypes;
    previewAmount?: number;
};

const PotSummary = ({ pot, actionType, previewAmount = 0 }: PotSummaryProps) => {
    const label = actionType ? 'New Amount' : 'Total Saved';
    const effectiveTotal =
        actionType === MoneyActionTypes.Withdraw
            ? pot.total - previewAmount
            : pot.total + previewAmount;

    const percentage = ((effectiveTotal / pot.target) * 100).toFixed(1);

    return (
        <div>
            <div className="flex items-center justify-between mb-5">
                <p className="text-secondary-foreground text-sm">{label}</p>

                <span className="font-bold text-3xl">
                    {formatAmount(effectiveTotal)}
                </span>
            </div>

            <PotProgress
                total={pot.total}
                target={pot.target}
                theme={actionType ? '#201f24' : pot.theme}
                actionType={actionType}
                previewAmount={previewAmount}
            />

            <div className="flex items-center justify-between mt-3 text-xs">
                <span
                    className={cn(
                        'font-bold',
                        actionType === MoneyActionTypes.Add
                            ? 'text-green'
                            : actionType === MoneyActionTypes.Withdraw
                              ? 'text-red'
                              : 'text-secondary-foreground'
                    )}
                >
                    {percentage}%
                </span>

                <span className="text-secondary-foreground">
                    Target of {formatAmount(pot.target)}
                </span>
            </div>
        </div>
    );
};

export default PotSummary;
