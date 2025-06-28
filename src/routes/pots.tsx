// UI/Shared components
import PageLayout from '@/components/layout/PageLayout';

// Feature components
import PotCard from '@/features/pots/components/PotCard';
import AddPotDialog from '@/features/pots/components/AddPotDialog';

// Types
import type { PotFormFields } from '@/features/pots/types';
import type { Pot } from '@/types/finance';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    addMoneyToPot,
    addPot,
    deletePot,
    editPot,
    potsQueryOptions,
    withdrawMoneyFromPot,
} from '@/features/pots/api/queries';

export const Route = createFileRoute({
    component: PotsPage,
});

function PotsPage() {
    const queryClient = useQueryClient();

    const { data: pots = [] } = useQuery(potsQueryOptions);

    const addPotMutation = useMutation({
        mutationFn: addPot,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['pots'] }),
    });

    const editPotMutation = useMutation({
        mutationFn: async ({
            name,
            updates,
        }: {
            name: string;
            updates: Partial<Pot>;
        }) => editPot(name, updates),

        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['pots'] }),
    });

    const deletePotMutation = useMutation({
        mutationFn: async (name: string) => deletePot(name),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['pots'] }),
    });

    const addMoneyMutation = useMutation({
        mutationFn: addMoneyToPot,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['pots'] }),
    });

    const withdrawMoneyMutation = useMutation({
        mutationFn: withdrawMoneyFromPot,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['pots'] }),
    });

    const handleAddPot = (data: PotFormFields) => {
        addPotMutation.mutate({
            name: data.name,
            target: +data.target,
            theme: data.theme,
            total: 0,
        });
    };

    const handleEditPot = (potName: string, data: PotFormFields) => {
        editPotMutation.mutate({
            name: potName,
            updates: {
                name: data.name,
                theme: data.theme,
                target: +data.target,
            },
        });
    };

    const handleDeletePot = (name: string | null) => {
        if (name !== null) deletePotMutation.mutate(name);

        // Find and click the close button to close the dialog
        const closeButton = document.querySelector(
            '[data-slot="dialog-close"]'
        ) as HTMLButtonElement;
        if (closeButton) closeButton.click();
    };

    const handleAddMoney = (pot: Pot, data: { amount: string }) => {
        addMoneyMutation.mutate({ name: pot.name, amount: +data.amount });
    };

    const handleWithdrawMoney = (pot: Pot, data: { amount: string }) => {
        withdrawMoneyMutation.mutate({ name: pot.name, amount: +data.amount });
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
