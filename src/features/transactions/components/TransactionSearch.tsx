import { Input } from '@/components/ui/input';
import { useSearch } from '@tanstack/react-router';

type TransactionSearchProps = {
    onSearch: (query: string) => void;
};

const TransactionSearch = ({ onSearch }: TransactionSearchProps) => {
    const search = useSearch({ from: '/transactions' });

    return (
        <div className="w-full md:w-80">
            <Input
                type="text"
                placeholder="Search transactions"
                variant="search"
                value={search.query}
                onChange={(event) => onSearch(event.target.value)}
            />
        </div>
    );
};

export default TransactionSearch;
