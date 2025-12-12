import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

// Internal project files – features
import BlogCard from "../features/blogs/BlogCard";
import useBlogsQuery from "../features/blogs/useBlogsQuery";
import { selectBlogs } from "../features/blogs/blogsSlice";
import CategoryFilter from "../features/goodies/components/CategoryFilter";

// UI components
import Breadcrumbs from "../ui/Breadcrumbs";
import SearchBar from "../ui/SearchBar";
import Pagination from "../ui/pagination";

function BlogsPage() {
  const { data: blogsData = [], isPending, isError, error } = useBlogsQuery();
  const blogsFromStore = useSelector(selectBlogs);
  const blogs = blogsFromStore.length ? blogsFromStore : blogsData;

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 4;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const categories = useMemo(() => {
    const unique = new Set(blogs.map((blog) => blog.category || "General"));
    return ["All", ...Array.from(unique)];
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return blogs.filter((blog) => {
      const matchesCategory = category === "All" || blog.category === category;
      const matchesQuery = normalized
        ? blog.title.toLowerCase().includes(normalized) ||
          (blog.excerpt || "").toLowerCase().includes(normalized) ||
          (blog.tags || []).some((tag) => tag.toLowerCase().includes(normalized))
        : true;

      return matchesCategory && matchesQuery;
    });
  }, [blogs, category, query]);

  useEffect(() => {
    setCurrentPage(1);
  }, [category, query]);

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const start = (currentPage - 1) * blogsPerPage;
  const currentBlogs = filteredBlogs.slice(start, start + blogsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="mb-6">
        <Breadcrumbs />
      </div>

      <div className="mb-6 rounded-3xl border border-slate-700/40 bg-gradient-to-br from-primary-800/70 via-primary-900/80 to-slate-900/60 px-6 py-8 shadow-xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-center text-4xl font-bold text-gray-50">Blogs</h1>
          </div>

          <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-start sm:justify-center md:justify-end">
            <div className="w-full min-w-[240px] sm:w-72">
              <SearchBar
                value={query}
                onChange={setQuery}
                placeholder="Search title, tags, keywords..."
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mb-10 w-full rounded-2xl border border-slate-700/40 bg-primary-900/50 p-4 sm:w-auto">
        <CategoryFilter
          categories={categories}
          activeCategory={category}
          onSelect={(cat) => setCategory(cat)}
        />
      </div>
      {isPending ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="h-80 animate-pulse rounded-2xl border border-slate-700/40 bg-primary-900/40"
            />
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-3xl border border-dashed border-slate-700/50 bg-primary-900/40 p-12 text-center text-gray-400">
          {error?.message || "Failed to load blogs. Please try again."}
        </div>
      ) : filteredBlogs.length ? (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {currentBlogs.map((blog) => (
              <BlogCard key={blog.slug} {...blog} />
            ))}
          </div>

          {filteredBlogs.length > blogsPerPage && (
            <div className="mt-10 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-700/50 bg-primary-900/40 p-12 text-center text-gray-400">
          No articles found. Try a different keyword or category.
        </div>
      )}
    </section>
  );
}

export default BlogsPage;
