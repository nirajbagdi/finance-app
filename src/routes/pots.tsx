// External imports
import { Plus } from 'lucide-react';

// UI/Shared components
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/layout/PageLayout';
import DialogWrapper from '@/components/common/DialogWrapper';

// Feature components
import PotCard from '@/features/pots/components/PotCard';
import PotForm from '@/features/pots/components/PotForm';

// Store
import usePotStore from '@/features/pots/store/usePotStore';

// Types
import type { PotFormFields } from '@/features/pots/types';
import type { Pot } from '@/types/finance';

export const Route = createFileRoute({
    component: PotsPage,
});

function PotsPage() {
    const { pots, addPot, editPot, deletePot, addMoney, withdraw } = usePotStore();

    const handleAddPot = (data: PotFormFields) => {
        addPot({
            name: data.name,
            target: +data.target,
            theme: data.theme,
            total: 0,
        });
    };

    const handleEditPot = (data: PotFormFields) => {
        editPot(data.name, {
            name: data.name,
            theme: data.theme,
            target: +data.target,
        });
    };

    const handleDeletePot = (name: string | null) => {
        if (name !== null) deletePot(name);

        // Find and click the close button to close the dialog
        const closeButton = document.querySelector(
            '[data-slot="dialog-close"]'
        ) as HTMLButtonElement;
        if (closeButton) closeButton.click();
    };

    const handleAddMoney = (pot: Pot, data: { amount: string }) => {
        addMoney(pot.name, +data.amount);
    };

    const handleWithdrawMoney = (pot: Pot, data: { amount: string }) => {
        withdraw(pot.name, +data.amount);
    };

    const renderHeaderAction = () => (
        <DialogWrapper
            title="Add New Pot"
            description="Create a pot to set savings targets. These can help keep you on track as you save for special purchases."
            trigger={
                <Button size="lg">
                    <Plus className="-mr-0.5" />
                    Add New Pot
                </Button>
            }
        >
            <PotForm
                defaultValues={{
                    name: '',
                    target: '',
                    theme: '',
                }}
                actionLabel="Add Pot"
                onSubmit={handleAddPot}
            />
        </DialogWrapper>
    );

    return (
        <PageLayout title="Pots" headerAction={renderHeaderAction()}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                {pots.map((pot) => (
                    <PotCard
                        key={pot.name}
                        pot={pot}
                        onEditPot={handleEditPot}
                        onDeletePot={handleDeletePot}
                        onAddMoney={handleAddMoney}
                        onWithdrawMoney={handleWithdrawMoney}
                    />
                ))}
            </div>
        </PageLayout>
    );
}
