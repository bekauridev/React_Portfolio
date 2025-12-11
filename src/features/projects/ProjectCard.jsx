import { useState } from "react";
import { motion } from "framer-motion";
import { FaGlobe } from "react-icons/fa6";
import { GoInfo } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { cn } from "../../utils/helpers";
import thumbnailFallback from "../../assets/images/project-images/placeholder.png";
function ProjectCard({ cardImage, name, slug, slogan, technologies = [], liveDemo }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false); // shared hover state
  const imageSrc = cardImage || thumbnailFallback;

  const handleGoToDetails = () => {
    navigate(`/projects/${slug}`);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1 }}
      className="relative flex flex-col overflow-hidden transition-all duration-300 border shadow-lg rounded-xl border-slate-700/30 bg-primary-900/10 backdrop-blur-xl"
      style={{ backdropFilter: "blur(1px)" }}
    >
      {/* IMAGE */}
      <div
        className="relative w-full overflow-hidden cursor-pointer h-52"
        onClick={handleGoToDetails}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={imageSrc}
          alt={`${name} cover`}
          className="object-cover w-full h-full transition-transform duration-500"
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
      <div className="flex flex-col flex-1 p-6">
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
        <div className="flex flex-wrap gap-2 mt-2">
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
        <p className="mt-3 mb-1 text-sm text-gray-300 line-clamp-3">{slogan}</p>
      </div>

      {/* Bottom actions */}
      <div className="flex items-center justify-between gap-3 px-5 py-3 border-t border-slate-700/30">
        <button
          onClick={handleGoToDetails}
          className="px-4 py-2 text-sm font-medium text-white transition rounded-lg bg-indigo-600/70 hover:bg-indigo-500"
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
