// UI/Shared components
import PageLayout from '@/components/layout/PageLayout';

// Feature components
import PotCard from '@/features/pots/components/PotCard';
import AddPotDialog from '@/features/pots/components/AddPotDialog';

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

    const handleEditPot = (potName: string, data: PotFormFields) => {
        editPot(potName, {
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

    return (
        <PageLayout
            title="Pots"
            headerAction={<AddPotDialog onAddPot={handleAddPot} />}
        >
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
