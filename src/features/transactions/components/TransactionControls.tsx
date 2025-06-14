import { useState } from 'react';
import { useSearch } from '@tanstack/react-router';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import CategoryIcon from '@/icons/feature/transactions/category.svg?react';
import SortIcon from '@/icons/feature/transactions/sort-by.svg?react';

import { cn } from '@/utils/ui';

import useMediaQuery from '@/hooks/useMediaQuery';

import { sortComparators, ControlType, type SelectControls } from '../constants';

import type { Transaction } from '@/types/finance';

type ControlItem = {
    key: ControlType;
    name: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    items: string[];
};

type TransactionControlsProps = {
    transactions: Transaction[];
    onValueChange: (values: SelectControls) => void;
};

const renderSelectContent = (items: string[]) => (
    <SelectContent>
        {items.map((item, idx) => (
            <SelectItem value={item} key={idx}>
                {item}
            </SelectItem>
        ))}
    </SelectContent>
);

const TransactionControls = ({ transactions, onValueChange }: TransactionControlsProps) => {
    const search = useSearch({ from: '/transactions' });

    const [dropdownOpen, setDropdownOpen] = useState<Record<ControlType, boolean>>({
        [ControlType.SORT]: false,
        [ControlType.CATEGORY]: false,
    });

    const isMobile = useMediaQuery('(max-width: 768px)');

    const sortOptions = Object.keys(sortComparators);
    const categoryOptions = ['All', ...new Set(transactions.map((tx) => tx.category))];

    const controlItems = [
        {
            key: ControlType.SORT,
            name: 'Sort By',
            icon: SortIcon,
            items: sortOptions,
        },
        {
            key: ControlType.CATEGORY,
            name: 'Category',
            icon: CategoryIcon,
            items: categoryOptions,
        },
    ];

    const handleControlChange = (key: keyof SelectControls, value: string) => {
        onValueChange({ [key]: value } as SelectControls);
    };

    const handleDropdownChange = (key: ControlType) => {
        setDropdownOpen((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return (
        <>
            {isMobile ? (
                <MobileTransactionControls
                    controlItems={controlItems}
                    search={search}
                    dropdownOpen={dropdownOpen}
                    handleControlChange={handleControlChange}
                    handleDropdownChange={handleDropdownChange}
                />
            ) : (
                <DesktopTransactionControls
                    controlItems={controlItems}
                    search={search}
                    handleControlChange={handleControlChange}
                />
            )}
        </>
    );
};

const DesktopTransactionControls = ({
    controlItems,
    search,
    handleControlChange,
}: {
    controlItems: ControlItem[];
    search: { sort: string; category: string; [key: string]: string | number };
    handleControlChange: (key: keyof SelectControls, value: string) => void;
}) => (
    <div className="hidden md:flex items-center gap-3 lg:gap-8">
        {controlItems.map((item) => (
            <div key={item.key} className="flex text-sm items-center gap-1.5 lg:gap-2">
                <label htmlFor={item.key} className="text-grey-500">
                    {item.name}
                </label>

                <Select
                    name={item.key}
                    value={search[item.key]}
                    onValueChange={handleControlChange.bind(null, item.key)}
                >
                    <SelectTrigger id={item.key} className="w-25 lg:w-38">
                        <SelectValue placeholder={item.items[0]} />
                    </SelectTrigger>

                    {renderSelectContent(item.items)}
                </Select>
            </div>
        ))}
    </div>
);

const MobileTransactionControls = ({
    controlItems,
    search,
    dropdownOpen,
    handleControlChange,
    handleDropdownChange,
}: {
    controlItems: ControlItem[];
    search: { sort: string; category: string; [key: string]: string | number };
    dropdownOpen: Record<ControlType, boolean>;
    handleControlChange: (key: keyof SelectControls, value: string) => void;
    handleDropdownChange: (key: ControlType) => void;
}) => (
    <div className="flex md:hidden items-center gap-5">
        {controlItems.map((item) => {
            const Icon = item.icon;

            return (
                <div key={item.key} className="items-center gap-1.5">
                    <Select
                        name={item.key}
                        value={search[item.key]}
                        open={dropdownOpen[item.key]}
                        onOpenChange={() => handleDropdownChange(item.key)}
                        onValueChange={handleControlChange.bind(null, item.key)}
                    >
                        <SelectTrigger
                            id={item.key}
                            className={cn(
                                'relative',
                                dropdownOpen[item.key] ? 'fill-green' : 'fill-grey-900'
                            )}
                            asIcon
                        >
                            <Icon fontSize={23} className="fill-inherit cursor-pointer" />

                            {search[item.key] !== item.items[0] && (
                                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-[#9F8170] ring-2 ring-white" />
                            )}
                        </SelectTrigger>

                        {renderSelectContent(item.items)}
                    </Select>
                </div>
            );
        })}
    </div>
);

export default TransactionControls;
