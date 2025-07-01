// External imports
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// UI/Shared components
import PageLayout from '@/components/layout/PageLayout';
import Loader from '@/components/common/Loader';

// Feature components
import PotCard from '@/features/pots/components/PotCard';
import AddPotDialog from '@/features/pots/components/AddPotDialog';

// Lib
import {
    addMoneyToPot,
    addPot,
    deletePot,
    editPot,
    withdrawMoneyFromPot,
} from '@/features/pots/lib/api';
import { potsQueryOptions } from '@/features/pots/lib/queries';

// Types
import type { PotFormFields } from '@/features/pots/lib/types';
import type { Pot } from '@/types/finance';

export const Route = createFileRoute({
    loader: async ({ context: { queryClient } }) => {
        await queryClient.ensureQueryData(potsQueryOptions);
    },

    component: PotsPage,

    pendingComponent: () => <Loader />,
});

function PotsPage() {
    const queryClient = useQueryClient();

    const { data: pots = [] } = useQuery(potsQueryOptions);

    const addPotMutation = useMutation({
        mutationFn: addPot,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pots'] });

            // Find and click the close button to close the dialog
            const closeButton = document.querySelector(
                '[data-slot="dialog-close"]'
            ) as HTMLButtonElement;
            if (closeButton) closeButton.click();
        },
    });

    const editPotMutation = useMutation({
        mutationFn: async ({
            name,
            updates,
        }: {
            name: string;
            updates: Partial<Pot>;
        }) => editPot(name, updates),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pots'] });

            // Find and click the close button to close the dialog
            const closeButton = document.querySelector(
                '[data-slot="dialog-close"]'
            ) as HTMLButtonElement;
            if (closeButton) closeButton.click();
        },
    });

    const deletePotMutation = useMutation({
        mutationFn: async (name: string) => deletePot(name),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pots'] });

            // Find and click the close button to close the dialog
            const closeButton = document.querySelector(
                '[data-slot="dialog-close"]'
            ) as HTMLButtonElement;
            if (closeButton) closeButton.click();
        },
    });

    const addMoneyMutation = useMutation({
        mutationFn: addMoneyToPot,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pots'] });

            // Find and click the close button to close the dialog
            const closeButton = document.querySelector(
                '[data-slot="dialog-close"]'
            ) as HTMLButtonElement;
            if (closeButton) closeButton.click();
        },
    });

    const withdrawMoneyMutation = useMutation({
        mutationFn: withdrawMoneyFromPot,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pots'] });

            // Find and click the close button to close the dialog
            const closeButton = document.querySelector(
                '[data-slot="dialog-close"]'
            ) as HTMLButtonElement;
            if (closeButton) closeButton.click();
        },
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
            headerAction={
                <AddPotDialog
                    onAddPot={handleAddPot}
                    isAdding={addPotMutation.isPending}
                />
            }
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
                        isEditing={
                            editPotMutation.isPending &&
                            editPotMutation.variables?.name === pot.name
                        }
                        isDeleting={
                            deletePotMutation.isPending &&
                            deletePotMutation.variables === pot.name
                        }
                        isDepositing={
                            addMoneyMutation.isPending &&
                            addMoneyMutation.variables?.name === pot.name
                        }
                        isWithdrawing={
                            withdrawMoneyMutation.isPending &&
                            withdrawMoneyMutation.variables?.name === pot.name
                        }
                    />
                ))}
            </div>
        </PageLayout>
    );
}
