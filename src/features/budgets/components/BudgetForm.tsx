// External imports
import { Loader2Icon } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// UI components
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Lib
import { budgetsQueryOptions } from '../lib/queries';

// Constants
import { themeColors as budgetColors } from '@/constants';

const formSchema = z.object({
    category: z.string().nonempty({ message: 'Category must be selected' }),
    maxSpend: z
        .string()
        .refine((val) => !isNaN(parseInt(val, 10)) && parseInt(val) > 0, {
            message: 'Maximum spend must be greater than 0',
        }),
    theme: z.string().nonempty({ message: 'Theme must be selected' }),
});

type FormFields = z.infer<typeof formSchema>;

type BudgetFormProps = {
    defaultValues: FormFields;
    categoryOptions?: string[];
    actionLabel: string;

    isLoading?: boolean;

    onSubmit: (data: FormFields) => void;
};

const BudgetForm = ({
    defaultValues,
    categoryOptions,
    actionLabel,
    isLoading = false,
    onSubmit,
}: BudgetFormProps) => {
    const form = useForm<FormFields>({
        defaultValues,
        resolver: zodResolver(formSchema),
    });

    const { data: budgets = [] } = useQuery(budgetsQueryOptions);

    const isEditAction = actionLabel.toLowerCase().includes('edit');

    function handleSubmit(data: FormFields) {
        onSubmit(data);
        form.reset();
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col gap-y-4"
            >
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Budget Category</FormLabel>

                            <Select
                                disabled={isEditAction}
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                </FormControl>

                                <SelectContent>
                                    {!categoryOptions?.length &&
                                        defaultValues.category && (
                                            <SelectItem
                                                disabled
                                                value={defaultValues.category}
                                            >
                                                {defaultValues.category}
                                            </SelectItem>
                                        )}

                                    {categoryOptions?.map((option) => {
                                        const isCategoryUsed = budgets.some((b) =>
                                            option.includes(b.category)
                                        );

                                        return (
                                            <SelectItem
                                                disabled={isCategoryUsed}
                                                key={option}
                                                value={option}
                                            >
                                                {option}{' '}
                                                {isCategoryUsed
                                                    ? '(Already used)'
                                                    : ''}
                                            </SelectItem>
                                        );
                                    })}
                                </SelectContent>
                            </Select>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="maxSpend"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Maximum Spend</FormLabel>

                            <FormControl>
                                <Input
                                    type="number"
                                    variant="currency"
                                    placeholder="eg. 2000"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="theme"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Theme</FormLabel>

                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        {field.value ? (
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className="w-4 h-4 rounded-sm"
                                                    style={{
                                                        backgroundColor: field.value,
                                                    }}
                                                />
                                                {budgetColors.find(
                                                    (c) => c.hex === field.value
                                                )?.name ?? 'Unknown Theme'}
                                            </div>
                                        ) : (
                                            <SelectValue placeholder="Select a theme" />
                                        )}
                                    </SelectTrigger>
                                </FormControl>

                                <SelectContent>
                                    {budgetColors.map((color) => (
                                        <SelectItem
                                            key={color.name}
                                            value={color.hex}
                                            style={
                                                {
                                                    '--budget-theme': color.hex,
                                                } as React.CSSProperties
                                            }
                                        >
                                            <span className="w-4 h-4 rounded-sm bg-[var(--budget-theme)] mt-0.5" />
                                            {color.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button size="lg" className="w-full mt-2" disabled={isLoading}>
                    <div className="flex items-center gap-2">
                        {isLoading && <Loader2Icon className="animate-spin" />}
                        {actionLabel}
                    </div>
                </Button>
            </form>
        </Form>
    );
};

export default BudgetForm;
