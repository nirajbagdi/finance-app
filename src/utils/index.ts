import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

type DateFormatOptions = {
    day?: Intl.DateTimeFormatOptions['day'];
    month?: Intl.DateTimeFormatOptions['month'];
    year?: Intl.DateTimeFormatOptions['year'];
};

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function stringMatches(str: string, query: string) {
    return str.toLowerCase().includes(query.toLowerCase());
}

export function formatAmount(amount: number, currency = 'USD') {
    return amount.toLocaleString('en-US', { style: 'currency', currency });
}

export function formatDate(date: string | Date, options: DateFormatOptions = {}) {
    const { day = '2-digit', month = 'short', year = 'numeric' } = options;

    return new Intl.DateTimeFormat('en-US', {
        day,
        month,
        year,
    }).format(new Date(date));
}

export function sumBy<T>(
    items: T[],
    getValue: (item: T) => number = (item) => item as unknown as number
) {
    return items.reduce((total, item) => total + getValue(item), 0);
}
