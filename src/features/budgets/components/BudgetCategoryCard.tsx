// External imports
import { Link } from '@tanstack/react-router';
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
import ColoredLegend from '@/components/common/ColoredLegend';

// Icons
import RightArrowIcon from '@/icons/common/right-arrow.svg?react';

// Components
import TransactionList from '@/features/transactions/components/TransactionList';
import BudgetForm from './BudgetForm';

// Utils
import { cn, formatAmount } from '@/utils';

// Types
import type { Budget, Transaction } from '@/types/finance';
import type { BudgetFormFields } from '../types';

type BudgetCategoryCardProps = {
    budget: Budget;
    spent: number;
    transactions: Transaction[];

    categoryOptions: string[];

    onEditBudget: (data: BudgetFormFields) => void;
    onDeleteBudget: (category: string | null) => void;
};

const BudgetCategoryCard = ({
    budget,
    spent,
    transactions,
    categoryOptions,
    onEditBudget,
    onDeleteBudget,
}: BudgetCategoryCardProps) => {
    const isOverBudget = Math.abs(spent) > budget.value;

    const renderEditAction = () => (
        <DialogWrapper
            title="Edit Budget"
            description="As your budgets change, feel free to update your spending limits."
            trigger={
                <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    className="text-foreground"
                >
                    Edit
                </DropdownMenuItem>
            }
        >
            <BudgetForm
                defaultValues={{
                    category: budget.category,
                    theme: budget.theme || '#000',
                    maxSpend: budget.value + '',
                }}
                categoryOptions={categoryOptions}
                actionLabel="Edit Budget"
                onSubmit={onEditBudget}
            />
        </DialogWrapper>
    );

    const renderDeleteAction = () => (
        <DialogWrapper
            title={`Delete '${budget.category}'?`}
            description="Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever."
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
                <Button
                    variant="destructive"
                    className="w-full"
                    onClick={onDeleteBudget.bind(null, budget.category)}
                >
                    Yes, Confirm Deletion
                </Button>

                <Button
                    variant="ghost"
                    className="w-full"
                    onClick={onDeleteBudget.bind(null, null)}
                >
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
                        className="inline-block w-4 h-4 rounded-full bg-[var(--budget-theme)]"
                        style={
                            {
                                '--budget-theme': budget.theme,
                            } as React.CSSProperties
                        }
                    />
                    <h2 className="font-bold text-xl flex-1">{budget.category}</h2>

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

                <p className="text-secondary-foreground text-sm">
                    Maximum of {formatAmount(budget.value)}
                </p>
            </header>

            <BudgetProgress
                spent={spent}
                limit={budget.value}
                theme={budget.theme || '#000'}
            />

            <div className="flex items-center justify-between mt-3 w-[70%]">
                <ColoredLegend
                    value={formatAmount(Math.abs(spent))}
                    label="Spent"
                    theme={budget.theme || '#000'}
                />
                <div className={cn(isOverBudget ? 'text-red' : 'text-foreground')}>
                    <ColoredLegend
                        value={formatAmount(spent + budget.value)}
                        label="Remaining"
                        theme="#f8f4f0"
                    />
                </div>
            </div>

            <div className="bg-background rounded-xl px-4 py-6 mt-6">
                <div className="mb-5 flex items-center justify-between">
                    <h3 className="text-base font-bold">Latest Spending</h3>

                    <Link
                        to="/transactions"
                        search={{
                            query: '',
                            page: 1,
                            sort: 'Latest',
                            category: budget.category,
                        }}
                        className="flex items-center gap-2 text-[13px] text-secondary-foreground fill-secondary-foreground hover:text-primary-foreground hover:fill-primary-foreground"
                    >
                        <span>See All</span>
                        <RightArrowIcon className="fill-inherit" />
                    </Link>
                </div>

                <TransactionList transactions={transactions} compact />
            </div>
        </div>
    );
};

type BudgetProgressProps = {
    spent: number;
    limit: number;
    theme: string;
};

const BudgetProgress = ({ spent, limit, theme }: BudgetProgressProps) => {
    const percentage = Math.abs((spent / limit) * 100);

    return (
        <div
            className="w-full h-8 rounded-sm bg-background overflow-hidden flex items-center px-1"
            style={
                {
                    '--progress-theme': theme,
                } as React.CSSProperties
            }
        >
            <div
                className="h-6 rounded-sm bg-[var(--progress-theme)]"
                style={
                    {
                        width: `${percentage}%`,
                    } as React.CSSProperties
                }
            />
        </div>
    );
};

export default BudgetCategoryCard;
