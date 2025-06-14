import { useState } from 'react';

export default function usePagination<T>(items: T[], itemsPerPage = 10) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(items.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const paginatedItems = items.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return {
        currentPage,
        totalPages,
        startIndex,
        endIndex,
        paginatedItems,
        handlePageChange,
    };
}
