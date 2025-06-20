// External imports
import { Plus } from 'lucide-react';

// UI/Shared components
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/layout/PageLayout';
import DialogWrapper from '@/components/common/DialogWrapper';

// Components
import PotCard from '@/features/pots/components/PotCard';

// Store
import usePotStore from '@/features/pots/store/usePotStore';

export const Route = createFileRoute({
    component: PotsPage,
});

function PotsPage() {
    const { pots } = usePotStore();

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
            <div>Hello, Pots!</div>
        </DialogWrapper>
    );

    return (
        <PageLayout title="Pots" headerAction={renderHeaderAction()}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                {pots.map((pot) => (
                    <PotCard key={pot.name} pot={pot} />
                ))}
            </div>
        </PageLayout>
    );
}
