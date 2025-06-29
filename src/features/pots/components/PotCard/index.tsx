// External imports
import { useState, useMemo } from 'react';

// Feature components
import PotCardHeader from './PotCardHeader';
import PotSummary from './PotSummary';
import MoneyActionDialog from './MoneyActionDialog';

// Types
import type { Pot } from '@/types/finance';
import { MoneyActionTypes, type PotFormFields } from '@/features/pots/lib/types';

type PotCardProps = {
    pot: Pot;

    onEditPot: (potName: string, data: PotFormFields) => void;
    onDeletePot: (name: string | null) => void;

    onAddMoney: (pot: Pot, data: { amount: string }) => void;
    onWithdrawMoney: (pot: Pot, data: { amount: string }) => void;
};

const PotCard = ({
    pot,

    onEditPot,
    onDeletePot,

    onAddMoney,
    onWithdrawMoney,
}: PotCardProps) => {
    const [previewAmount, setPreviewAmount] = useState(0);
    const availableToAdd = useMemo(() => pot.target - pot.total, [pot]);

    return (
        <div className="bg-card p-8 rounded-xl shadow-2xs mb-4 lg:mb-6 last:mb-0">
            <PotCardHeader
                pot={pot}
                onEditPot={onEditPot}
                onDeletePot={onDeletePot}
            />

            <PotSummary pot={pot} />

            <div className="mt-10 flex items-center justify-between gap-2">
                <MoneyActionDialog
                    actionType={MoneyActionTypes.Add}
                    pot={pot}
                    previewAmount={previewAmount}
                    maxAmount={availableToAdd}
                    onSubmit={(data) => onAddMoney(pot, data)}
                    onAmountChange={(data) => setPreviewAmount(+data.amount)}
                />

                <MoneyActionDialog
                    actionType={MoneyActionTypes.Withdraw}
                    pot={pot}
                    previewAmount={previewAmount}
                    maxAmount={pot.total}
                    onSubmit={(data) => onWithdrawMoney(pot, data)}
                    onAmountChange={(data) => setPreviewAmount(+data.amount)}
                />
            </div>
        </div>
    );
};

export default PotCard;
