'use client';
import { createContext, useContext } from 'react';

const BlogSidebarContext = createContext(null);

export default function BlogProvider({ data, children }) {
  return <BlogSidebarContext.Provider value={data}>{children}</BlogSidebarContext.Provider>;
}

export function useBlogSidebarData() {
  return useContext(BlogSidebarContext);
}
