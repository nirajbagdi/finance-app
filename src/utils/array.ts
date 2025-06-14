export function sortBy<T, K extends keyof T>(
    arr: T[],
    key: K,
    direction: 'asc' | 'desc' = 'asc'
) {
    return [...arr].sort((a, b) => {
        const aVal = a[key];
        const bVal = b[key];

        if (typeof aVal !== 'number' || typeof bVal !== 'number')
            throw new Error(
                `sortBy: key "${String(key)}" must reference number values`
            );

        return direction === 'asc' ? aVal - bVal : bVal - aVal;
    });
}
