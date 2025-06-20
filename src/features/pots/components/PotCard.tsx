// External imports
import { Ellipsis } from 'lucide-react';

// UI/Shared Components
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import DialogWrapper from '@/components/common/DialogWrapper';

// Types
import type { Pot } from '@/types/finance';

type PotCardProps = {
    pot: Pot;
};

const PotCard = ({ pot }: PotCardProps) => {
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
            <div>Edit Pot!</div>
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
                <Button variant="destructive" className="w-full">
                    Yes, Confirm Deletion
                </Button>

                <Button variant="ghost" className="w-full">
                    No, Go Back
                </Button>
            </div>
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
        </div>
    );
};

export default PotCard;
