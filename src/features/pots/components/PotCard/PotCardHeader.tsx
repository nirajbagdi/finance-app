// External imports
import { Ellipsis } from 'lucide-react';

// UI/Shared components
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Feature components
import EditPotDialog from './EditPotDialog';
import DeletePotDialog from './DeletePotDialog';

// Types
import type { Pot } from '@/types/finance';
import type { PotFormFields } from '@/features/pots/types';

type PotCardHeaderProps = {
    pot: Pot;

    onEditPot: (potName: string, data: PotFormFields) => void;
    onDeletePot: (name: string | null) => void;
};

const PotCardHeader = ({ pot, onEditPot, onDeletePot }: PotCardHeaderProps) => (
    <header className="mb-6">
        <div className="flex items-center gap-2.5 mb-2">
            <span
                className="inline-block w-4 h-4 rounded-full bg-[var(--pot-theme)]"
                style={{ '--pot-theme': pot.theme } as React.CSSProperties}
            />
            <h2 className="font-bold text-xl flex-1">{pot.name}</h2>

            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Ellipsis className="text-grey-300 cursor-pointer" />
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <EditPotDialog pot={pot} onSubmit={onEditPot} />
                    <DeletePotDialog potName={pot.name} onDelete={onDeletePot} />
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </header>
);

export default PotCardHeader;
