type PageLayoutProps = {
    title: string;
    headerAction?: React.ReactNode;
    children: React.ReactNode;
};

const PageLayout = ({ title, headerAction = false, children }: PageLayoutProps) => (
    <section className="py-6 xl:py-12 pb-20 md:pb-30 xl:pb-12 px-4 md:px-10">
        <header className="flex items-center justify-between mb-8 xl:mb-10">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            </div>
            {headerAction}
        </header>

        {children}
    </section>
);

export default PageLayout;
