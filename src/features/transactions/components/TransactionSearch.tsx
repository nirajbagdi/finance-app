import { useState, useEffect } from 'react';

import { Input } from '@/components/ui/input';

type TransactionSearchProps = {
    onSearch: (query: string) => void;
};

const TransactionSearch = ({ onSearch }: TransactionSearchProps) => {
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const timeout = setTimeout(() => onSearch(searchQuery), 500);
        return () => clearTimeout(timeout);
    }, [searchQuery]);

    return (
        <div className="w-full md:w-80">
            <Input
                type="text"
                placeholder="Search transactions"
                variant="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    );
};

export default TransactionSearch;
