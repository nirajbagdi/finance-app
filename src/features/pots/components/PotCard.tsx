// External imports
import { useState } from 'react';
import { Ellipsis, Plus } from 'lucide-react';

// UI/Shared Components
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import DialogWrapper from '@/components/common/DialogWrapper';

// Feature components
import PotForm from './PotForm';
import PotMoneyForm from './PotMoneyForm';

// Utils
import { cn, formatAmount } from '@/utils';

// Types
import type { Pot } from '@/types/finance';
import type { PotFormFields } from '../types';

type PotCardProps = {
    pot: Pot;

    onEditPot: (data: PotFormFields) => void;
    onDeletePot: (category: string | null) => void;

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
    const [newAmount, setNewAmount] = useState(+pot.total);

    const renderEditAction = () => (
        <DialogWrapper
            title="Edit Pot"
            description="If your saving targets change, feel free to update your pots."
            trigger={
                <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    className="text-foreground"
                >
                    Edit
                </DropdownMenuItem>
            }
        >
            <PotForm
                defaultValues={{
                    name: pot.name,
                    target: pot.target + '',
                    theme: pot.theme,
                }}
                actionLabel="Save Changes"
                onSubmit={onEditPot}
            />
        </DialogWrapper>
    );

    const renderDeleteAction = () => (
        <DialogWrapper
            title={`Delete '${pot.name}'?`}
            description="Are you sure you want to delete this pot? This action cannot be reversed, and all the data inside it will be removed forever."
            trigger={
                <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    className="text-red"
                >
                    Delete
                </DropdownMenuItem>
            }
        >
            <div className="mt-2">
                <Button
                    variant="destructive"
                    className="w-full"
                    onClick={onDeletePot.bind(null, pot.name)}
                >
                    Yes, Confirm Deletion
                </Button>

                <Button
                    variant="ghost"
                    className="w-full"
                    onClick={onDeletePot.bind(null, null)}
                >
                    No, Go Back
                </Button>
            </div>
        </DialogWrapper>
    );

    const renderAddMoneyAction = () => (
        <DialogWrapper
            title={`Add to '${pot.name}'?`}
            description="Add money to your pot to keep it separate from your main balance. As soon as you add this money, it will be deducted from your current balance."
            trigger={
                <Button size="lg" variant="secondary" className="font-bold flex-1">
                    <Plus className="-mr-0.5" />
                    Add Money
                </Button>
            }
        >
            <div className="my-3">
                <PotSummary
                    type="add"
                    pot={{ ...pot, total: pot.total + newAmount }}
                />
            </div>

            <PotMoneyForm
                action="Add"
                defaultValues={{ amount: '' }}
                onSubmit={onAddMoney.bind(null, pot)}
                onAmountChange={(data) => setNewAmount(+data.amount)}
            />
        </DialogWrapper>
    );

    const renderWithdrawAction = () => (
        <DialogWrapper
            title={`Withdraw from '${pot.name}'?`}
            description="Withdraw from your pot to put money back in your main balance. This will reduce the amount you have in this pot."
            trigger={
                <Button size="lg" variant="secondary" className="font-bold flex-1">
                    Withdraw
                </Button>
            }
        >
            <div className="my-3">
                <PotSummary
                    type="withdraw"
                    pot={{ ...pot, total: pot.total - newAmount }}
                />
            </div>

            <PotMoneyForm
                action="Withdraw"
                defaultValues={{ amount: '' }}
                onSubmit={onWithdrawMoney.bind(null, pot)}
                onAmountChange={(data) => setNewAmount(+data.amount)}
            />
        </DialogWrapper>
    );

    return (
        <div className="bg-card p-8 rounded-xl shadow-2xs mb-4 lg:mb-6 last:mb-0">
            <header className="mb-6">
                <div className="flex items-center gap-2.5 mb-2">
                    <span
                        className="inline-block w-4 h-4 rounded-full bg-[var(--pot-theme)]"
                        style={
                            {
                                '--pot-theme': pot.theme,
                            } as React.CSSProperties
                        }
                    />
                    <h2 className="font-bold text-xl flex-1">{pot.name}</h2>

                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Ellipsis className="text-grey-300 cursor-pointer" />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                            {renderEditAction()}
                            {renderDeleteAction()}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>

            <PotSummary pot={pot} />

            <div className="mt-10 flex items-center justify-between gap-2">
                {renderAddMoneyAction()}
                {renderWithdrawAction()}
            </div>
        </div>
    );
};

type PotSummaryProps = {
    pot: Pot;
    type?: 'add' | 'withdraw';
};

const PotSummary = ({ pot, type }: PotSummaryProps) => {
    const label =
        type === 'add' || type === 'withdraw' ? 'New Amount' : 'Total Saved';

    return (
        <div>
            <div className="flex items-center justify-between mb-5">
                <p className="text-secondary-foreground text-sm">{label}</p>
                <span className="font-bold text-3xl">{formatAmount(pot.total)}</span>
            </div>

            <PotProgress
                total={pot.total}
                target={pot.target}
                theme={!type ? pot.theme : '#201f24'}
            />

            <div className="flex items-center justify-between mt-3 text-xs">
                <span
                    className={cn(
                        'font-bold',
                        type === 'add'
                            ? 'text-green'
                            : type === 'withdraw'
                              ? 'text-red'
                              : 'text-secondary-foreground'
                    )}
                >
                    {((pot.total / pot.target) * 100).toFixed(1)}%
                </span>

                <span className="text-secondary-foreground">
                    Target of {formatAmount(pot.target)}
                </span>
            </div>
        </div>
    );
};

type PotProgressProps = {
    total: number;
    target: number;
    theme: string;
};

const PotProgress = ({ total, target, theme }: PotProgressProps) => {
    const percentage = Math.abs((total / target) * 100);

    return (
        <div
            className="w-full h-2 rounded-sm bg-background overflow-hidden flex items-center"
            style={
                {
                    '--progress-theme': theme,
                } as React.CSSProperties
            }
        >
            <div
                className="h-2 rounded-sm bg-[var(--progress-theme)]"
                style={
                    {
                        width: `${percentage}%`,
                    } as React.CSSProperties
                }
            />
        </div>
    );
};

export default PotCard;
