import type { Transaction } from '@/types/finance';

export function getBillStatus(bill: Transaction, today = new Date()) {
    const billDay = new Date(bill.date).getDate();
    const currentDay = today.getDate();

    const daysUntilDue = billDay - currentDay;

    if (daysUntilDue >= 0 && daysUntilDue <= 3) return 'dueSoon';
    if (daysUntilDue > 3) return 'upcoming';
    return 'paid';
}
