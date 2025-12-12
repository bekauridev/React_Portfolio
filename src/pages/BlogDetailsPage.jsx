import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

// Icons
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { MdPersonOutline } from "react-icons/md";
import { FaTag } from "react-icons/fa";

import { motion } from "framer-motion";

// Internal project files – features
import { selectBlogBySlug, selectBlogs } from "../features/blogs/blogsSlice";
import MarkdownRenderer from "../features/blogs/MarkdownRenderer";
import useBlogsQuery from "../features/blogs/useBlogsQuery";

// UI components
import Breadcrumbs from "../ui/Breadcrumbs";
import Button from "../ui/Button";

import thumbnailFallback from "../assets/images/project-images/placeholder.png";

function BlogDetailsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const blogsFromStore = useSelector(selectBlogs);
  const storedBlog = useSelector((state) => selectBlogBySlug(state, slug));
  const { data: blogs = [], isPending, isError, error } = useBlogsQuery();

  const blogList = blogsFromStore.length ? blogsFromStore : blogs;
  const blog = storedBlog ?? blogList.find((b) => b.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (isPending && !blog) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-300">
        Loading article...
      </div>
    );
  }

  if (isError && !blog) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-400">
        {error?.message || "Failed to load this article."}
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-400">
        Article not found.
      </div>
    );
  }

  const { title, excerpt, coverImage, tags = [], category, author, content } = blog;
  const heroImage = coverImage || thumbnailFallback;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="mx-auto min-h-[80vh] w-full max-w-5xl px-4 py-10"
    >
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <Breadcrumbs />
        <Button
          type="none"
          callBack={() => navigate(-1)}
          className="flex items-center gap-1 text-[14px] font-semibold tracking-wide text-gray-50 transition-colors duration-200 hover:text-primary-300"
        >
          <HiOutlineArrowSmLeft className="text-lg" />
          <span>Back</span>
        </Button>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-700/40 bg-primary-900/40 shadow-xl">
        <div className="relative h-72 w-full overflow-hidden sm:h-80">
          <img
            src={heroImage}
            alt={`${title} cover`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/60 to-transparent" />
          <div className="absolute inset-0 bg-primary-900/60 md:bg-primary-900/10" />

          <div className="absolute inset-x-4 bottom-5 space-y-3 sm:inset-x-8 sm:bottom-6">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-primary-800/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary-100">
                {category || "Article"}
              </span>
              {tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-black/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary-100"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <h1 className="text-2xl font-bold text-white drop-shadow-lg sm:text-3xl md:text-4xl">
              {title}
            </h1>
            <p className="max-w-3xl text-sm text-gray-200/85 sm:text-base">{excerpt}</p>
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-primary-200/90">
              <MdPersonOutline />
              <span>{author || "BekauriDev"}</span>
            </div>
          </div>
        </div>

        <div className="space-y-6 px-6 py-8 sm:px-8 sm:py-10">
          <div className="flex flex-wrap items-center gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full border border-primary-500/40 bg-primary-800/40 px-3 py-1 text-xs font-semibold text-primary-100"
              >
                <FaTag className="text-[11px]" /> {tag}
              </span>
            ))}
          </div>

          <MarkdownRenderer content={content} />
        </div>
      </div>
    </motion.section>
  );
}

export default BlogDetailsPage;
