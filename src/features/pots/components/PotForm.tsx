// External imports
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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

// Constants
import { themeColors as potColors } from '@/constants';

const formSchema = z.object({
    name: z.string().nonempty({ message: 'Name must not be empty' }),
    target: z
        .string()
        .refine((val) => !isNaN(parseInt(val, 10)) && parseInt(val) > 0, {
            message: 'Target must be greater than 0',
        }),
    theme: z.string().nonempty({ message: 'Theme must be selected' }),
});

type FormFields = z.infer<typeof formSchema>;

type PotFormProps = {
    defaultValues: FormFields;

    actionLabel: string;

    onSubmit: (data: FormFields) => void;
};

const PotForm = ({ defaultValues, actionLabel, onSubmit }: PotFormProps) => {
    const form = useForm<FormFields>({
        defaultValues,
        resolver: zodResolver(formSchema),
    });

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
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Pot Name</FormLabel>

                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="eg. Savings"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="target"
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
                                                {potColors.find(
                                                    (c) => c.hex === field.value
                                                )?.name ?? 'Unknown Theme'}
                                            </div>
                                        ) : (
                                            <SelectValue placeholder="Select a theme" />
                                        )}
                                    </SelectTrigger>
                                </FormControl>

                                <SelectContent>
                                    {potColors.map((color) => (
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

                <Button size="lg" className="w-full mt-2">
                    {actionLabel}
                </Button>
            </form>
        </Form>
    );
};

export default PotForm;
