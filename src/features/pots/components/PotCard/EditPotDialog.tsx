// UI/Shared components
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import DialogWrapper from '@/components/common/DialogWrapper';

// Feature components
import PotForm from '../PotForm';

// Types
import type { Pot } from '@/types/finance';
import type { PotFormFields } from '@/features/pots/types';

type EditPotDialogProps = {
    pot: Pot;
    onSubmit: (potName: string, data: PotFormFields) => void;
};

const EditPotDialog = ({ pot, onSubmit }: EditPotDialogProps) => (
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
            onSubmit={(data) => onSubmit(pot.name, data)}
        />
    </DialogWrapper>
);

export default EditPotDialog;
