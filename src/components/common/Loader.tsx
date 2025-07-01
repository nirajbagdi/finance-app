import LoadingSpinner from '@/icons/common/spinner.svg?react';

const Loader = () => (
    <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner className="w-16 h-16 animate-spin fill-foreground" />
    </div>
);

export default Loader;
