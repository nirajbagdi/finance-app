export function formatAmount(amount: number, currency = 'USD') {
    return amount.toLocaleString('en-US', { style: 'currency', currency });
}

export function formatDate(
    date: string | Date,
    day: Intl.DateTimeFormatOptions['day'] = '2-digit',
    month: Intl.DateTimeFormatOptions['month'] = 'short',
    year: Intl.DateTimeFormatOptions['year'] = 'numeric'
) {
    return new Intl.DateTimeFormat('en-US', {
        day,
        month,
        year,
    }).format(new Date(date));
}
