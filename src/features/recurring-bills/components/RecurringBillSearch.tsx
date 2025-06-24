// External imports
import { useSearch } from '@tanstack/react-router';

// UI/Shared components
import { Input } from '@/components/ui/input';

type RecurringBillSearchProps = {
    onSearch: (query: string) => void;
};

const RecurringBillSearch = ({ onSearch }: RecurringBillSearchProps) => {
    const search = useSearch({ from: '/recurring-bills' });

    return (
        <div className="w-full md:w-80">
            <Input
                type="text"
                placeholder="Search bills"
                variant="search"
                value={search.query}
                onChange={(event) => onSearch(event.target.value)}
            />
        </div>
    );
};

export default RecurringBillSearch;
