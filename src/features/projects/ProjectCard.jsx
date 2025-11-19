import { useState } from "react";
import { motion } from "framer-motion";
import { FaGlobe } from "react-icons/fa6";
import { GoInfo } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { cn } from "../../utils/helpers";
function ProjectCard({ cardImage, name, slug, slogan, technologies, liveDemo }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false); // shared hover state

  const handleGoToDetails = () => {
    navigate(`/projects/${slug}`);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1 }}
      className="relative flex flex-col overflow-hidden rounded-xl border border-slate-700/30 bg-primary-900/10 shadow-lg backdrop-blur-xl transition-all duration-300"
      style={{ backdropFilter: "blur(1px)" }}
    >
      {/* IMAGE */}
      <div
        className="relative h-52 w-full cursor-pointer overflow-hidden"
        onClick={handleGoToDetails}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={cardImage}
          alt={`${name} cover`}
          className="h-full w-full object-cover transition-transform duration-500"
          style={{ transform: isHovered ? "scale(1.02)" : "scale(1)" }}
        />
        {/* Overlay effect for image */}
        <div
          className={cn(
            "absolute inset-0 bg-primary-600/30 transition-opacity duration-300",
            isHovered && "opacity-20"
          )}
        ></div>

        {/* Top Right Icon */}
        <div
          className={`absolute right-3 top-3 z-10 rounded-full bg-gray-900/70 p-1 backdrop-blur-md transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
          }`}
        >
          <GoInfo size={22} className="text-indigo-300" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent" />
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col p-6">
        <h2 className="text-xl font-semibold transition">
          <span
            onClick={handleGoToDetails}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`cursor-pointer transition ${
              isHovered ? "text-indigo-300" : "text-white hover:text-indigo-300"
            }`}
          >
            {name}
          </span>
        </h2>

        {/* Technologies */}
        <div className="mt-2 flex flex-wrap gap-2">
          {technologies.slice(0, 3).map((tech, idx) => (
            <span
              key={idx}
              className="rounded-full bg-gray-700/40 px-2.5 py-0.5 text-xs text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* slogan */}
        <p className="mb-1 mt-3 line-clamp-3 text-sm text-gray-300">{slogan}</p>
      </div>

      {/* Bottom actions */}
      <div className="flex items-center justify-between gap-3 border-t border-slate-700/30 px-5 py-3">
        <button
          onClick={handleGoToDetails}
          className="rounded-lg bg-indigo-600/70 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
        >
          View More
        </button>

        {liveDemo && (
          <a
            href={liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300"
          >
            <FaGlobe size={16} /> Live Demo
          </a>
        )}
      </div>
    </motion.article>
  );
}

export default ProjectCard;
