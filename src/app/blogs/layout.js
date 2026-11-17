import BlogProvider from '@/components/blogs/BlogProvider';
import { getBlogSidebarData } from '@/lib/blogSidebar';

/*
  Layout for everything inside app/blog/ (listing, post, category, tag pages).
  It does not add any markup of its own, so each page keeps its full-width hero.
  It loads the sidebar data once and shares it, so pages just wrap their content in <BlogShell>.
  The main app layout is not touched.
*/
export default async function BlogLayout({ children }) {
  const data = await getBlogSidebarData();
  return <BlogProvider data={data}>{children}</BlogProvider>;
}
