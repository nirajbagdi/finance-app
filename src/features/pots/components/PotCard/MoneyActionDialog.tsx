// External imports
import { Plus } from 'lucide-react';

// UI/Shared components
import { Button } from '@/components/ui/button';

// Feature components
import DialogWrapper from '@/components/common/DialogWrapper';
import PotMoneyForm from './PotMoneyForm';
import PotSummary from './PotSummary';

// Types
import type { Pot } from '@/types/finance';
import { MoneyActionTypes } from '@/features/pots/lib/types';

const potActionMeta = {
    [MoneyActionTypes.Add]: {
        label: 'Add Money',
        icon: 'plus',
        title: (name: string) => `Add to '${name}'?`,
        description:
            'Add money to your pot to keep it separate from your main balance. As soon as you add this money, it will be deducted from your current balance.',
    },

    [MoneyActionTypes.Withdraw]: {
        label: 'Withdraw',
        icon: null,
        title: (name: string) => `Withdraw from '${name}'?`,
        description:
            'Withdraw from your pot to put money back in your main balance. This will reduce the amount you have in this pot.',
    },
};

type MoneyActionDialogProps = {
    actionType: MoneyActionTypes;

    pot: Pot;
    previewAmount: number;
    maxAmount: number;

    onSubmit: (data: { amount: string }) => void;
    onAmountChange: (data: { amount: string }) => void;
};

const MoneyActionDialog = ({
    actionType,
    pot,
    previewAmount,
    maxAmount,
    onSubmit,
    onAmountChange,
}: MoneyActionDialogProps) => {
    const meta = potActionMeta[actionType];
    const Icon = actionType === MoneyActionTypes.Add ? Plus : null;

    return (
        <DialogWrapper
            title={meta.title(pot.name)}
            description={meta.description}
            trigger={
                <Button size="lg" variant="secondary" className="font-bold flex-1">
                    {Icon && <Icon className="-mr-0.5" />}
                    {meta.label}
                </Button>
            }
        >
            <div className="my-3">
                <PotSummary
                    pot={pot}
                    actionType={actionType}
                    previewAmount={previewAmount}
                />
            </div>

            <PotMoneyForm
                actionType={actionType}
                defaultValues={{ amount: '' }}
                maxAmount={maxAmount}
                onSubmit={onSubmit}
                onAmountChange={onAmountChange}
            />
        </DialogWrapper>
    );
};

export default MoneyActionDialog;
