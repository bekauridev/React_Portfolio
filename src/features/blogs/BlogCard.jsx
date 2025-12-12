import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { motion } from "framer-motion";

import thumbnailFallback from "../../assets/images/project-images/placeholder.png";

function BlogCard({ coverImage, title, excerpt, slug, tags = [], category }) {
  const navigate = useNavigate();
  const image = coverImage || thumbnailFallback;

  const handleClick = () => {
    navigate(`/blog/${slug}`);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-700/40 bg-primary-900/40 shadow-lg backdrop-blur-md"
    >
      <div
        className="relative h-48 w-full cursor-pointer overflow-hidden"
        onClick={handleClick}
      >
        <img
          src={image}
          alt={`${title} cover`}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/40 to-transparent" />
        <div className="absolute bottom-3 left-3 flex gap-2">
          {category && (
            <span className="rounded-full bg-primary-800/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-100">
              {category}
            </span>
          )}
          {tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-800/70 px-3 py-1 text-xs font-medium text-gray-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <Link to={`/blog/${slug}`}>
          <h3 className="cursor-pointer text-xl font-semibold text-gray-100 hover:text-primary-100">
            {title}
          </h3>
        </Link>
        <p className="line-clamp-3 text-sm text-gray-300">{excerpt}</p>
        <button
          onClick={handleClick}
          className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary-200 transition hover:underline group-hover:text-primary-100"
        >
          Read article <FaArrowRightLong />
        </button>
      </div>
    </motion.article>
  );
}

export default BlogCard;
