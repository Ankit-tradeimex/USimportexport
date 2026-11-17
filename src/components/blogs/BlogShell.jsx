import BlogSidebar from './BlogSidebar';

export default function BlogShell({ children, sidebar = true }) {
  return (
    <section className="px-4 py-12 sm:py-16">
      <div
        className={`mx-auto w-full max-w-7xl ${
          sidebar
            ? 'grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_360px]'
            : ''
        }`}
      >
        <div className="min-w-0">{children}</div>
        {sidebar && (
          <aside
            aria-label="Blog sidebar"
            className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto lg:[scrollbar-width:none] lg:[&::-webkit-scrollbar]:hidden"
          >
            <BlogSidebar />
          </aside>
        )}
      </div>
    </section>
  );
}
