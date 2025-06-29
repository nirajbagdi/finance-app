// Utils
import { cn } from '@/utils';

// Types
import { MoneyActionTypes } from '@/features/pots/lib/types';

type PotProgressProps = {
    actionType?: MoneyActionTypes;

    total: number;
    target: number;
    previewAmount?: number;

    theme: string;
};

const PotProgress = ({
    actionType,
    total,
    target,
    previewAmount = 0,
    theme,
}: PotProgressProps) => {
    const basePercentage = (total / target) * 100;
    const previewPercentage = (previewAmount / target) * 100;

    const isAddAction = actionType === MoneyActionTypes.Add;

    return (
        <div
            className="w-full h-2 rounded-sm bg-background overflow-hidden relative flex items-center"
            style={{ '--progress-theme': theme } as React.CSSProperties}
        >
            <div
                className={cn(
                    'h-2 rounded-l-sm bg-[var(--progress-theme)]',
                    isAddAction ? 'rounded-r-none' : 'rounded-r-sm'
                )}
                style={{ width: `${basePercentage}%` }}
            />

            {actionType && (
                <div
                    className={cn(
                        'h-2 absolute rounded-r-sm',
                        isAddAction
                            ? 'bg-green ml-0.5'
                            : 'bg-red border-l-3 border-l-background'
                    )}
                    style={{
                        left: isAddAction
                            ? `${basePercentage}%`
                            : `${basePercentage - previewPercentage}%`,
                        width: `${previewPercentage}%`,
                    }}
                />
            )}
        </div>
    );
};

export default PotProgress;
