import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

type PaginationControlsProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

const PaginationControls = ({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationControlsProps) => {
    if (totalPages <= 1) return null;

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    return (
        <Pagination>
            <PaginationContent className="flex-1 justify-between">
                <PaginationItem>
                    <PaginationPrevious
                        href={isFirstPage ? undefined : '#'}
                        onClick={(e) => {
                            e.preventDefault();
                            onPageChange(currentPage - 1);
                        }}
                        className={isFirstPage ? 'pointer-events-none opacity-50' : ''}
                    />
                </PaginationItem>

                <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <PaginationItem key={page}>
                            <PaginationLink
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onPageChange(page);
                                }}
                                isActive={currentPage === page}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                </div>

                <PaginationItem>
                    <PaginationNext
                        href={isLastPage ? undefined : '#'}
                        onClick={(e) => {
                            e.preventDefault();
                            onPageChange(currentPage + 1);
                        }}
                        className={isLastPage ? 'pointer-events-none opacity-50' : ''}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationControls;
