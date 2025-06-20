// External imports
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Store
import useBudgetStore from '@/features/budgets/store/useBudgetStore';

// UI compoonents
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

const formSchema = z.object({
    category: z.string(),
    maxSpend: z
        .string()
        .refine((val) => !isNaN(parseInt(val, 10)) && parseInt(val) > 0, {
            message: 'Maximum spend must be greater than 0',
        }),
    theme: z.string(),
});

type FormFields = z.infer<typeof formSchema>;

type BudgetFormProps = {
    defaultValues: FormFields;

    categoryOptions: string[];
    themeOptions: string[];

    actionLabel: string;

    onSubmit: (data: FormFields) => void;
};

const BudgetForm = ({
    defaultValues,
    categoryOptions,
    themeOptions,
    actionLabel,
    onSubmit,
}: BudgetFormProps) => {
    const form = useForm<FormFields>({
        defaultValues,
        resolver: zodResolver(formSchema),
    });

    const { budgets } = useBudgetStore();

    const isEditAction = actionLabel.toLowerCase().includes('edit');

    function handleSubmit(data: FormFields) {
        onSubmit(data);
        form.reset();

        // Find and click the close button to close the dialog
        const closeButton = document.querySelector(
            '[data-slot="dialog-close"]'
        ) as HTMLButtonElement;
        if (closeButton) closeButton.click();
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
                                    {categoryOptions.map((option) => {
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
                                        <SelectValue placeholder="Select a theme" />
                                    </SelectTrigger>
                                </FormControl>

                                <SelectContent>
                                    {themeOptions.map((option) => (
                                        <SelectItem key={option} value={option}>
                                            {option}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button size="lg" className="w-full mt-2">
                    {actionLabel}
                </Button>
            </form>
        </Form>
    );
};

export default BudgetForm;
