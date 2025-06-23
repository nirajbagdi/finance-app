// External imports
import { Plus } from 'lucide-react';

// UI/Shared components
import { Button } from '@/components/ui/button';
import DialogWrapper from '@/components/common/DialogWrapper';

// Feature components
import PotForm from '@/features/pots/components/PotForm';

// Types
import type { PotFormFields } from '../types';

type AddPotDialogProps = {
    onAddPot: (data: PotFormFields) => void;
};

const AddPotDialog = ({ onAddPot }: AddPotDialogProps) => (
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
            onSubmit={onAddPot}
        />
    </DialogWrapper>
);

export default AddPotDialog;
