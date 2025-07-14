import { useState } from "react";

// icons
import { FaGlobe } from "react-icons/fa6";
import { TbCodeCircle2Filled } from "react-icons/tb";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import Button from "../../ui/Button";

function ProjectCard({ projectImg, name, description, technologies, gitRepo, liveDemo }) {
  const [showFullDesc, setShowFullDesc] = useState(false);

  const handleClick = () => {
    window.open(liveDemo, "_blank");
  };
  return (
    <div className="group relative w-full max-w-xs rounded-lg border border-border-primary bg-primary-500/70 shadow-lg transition-all duration-300 hover:shadow-xl sm:max-w-sm">
      {/* Image Container with Fixed Size */}
      <div
        className="mb-4 h-auto w-full cursor-pointer overflow-hidden rounded-t-lg pb-0 sm:h-48 sm:p-0"
        onClick={handleClick}
      >
        <img
          className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-90"
          src={projectImg}
          alt="project image"
        />
      </div>

      {/* Card Content */}
      <div className="px-6">
        <a href={liveDemo} target="_blank">
          <h5 className="inline-block text-xl font-bold tracking-tight text-gray-300 underline-offset-2 transition-all group-hover:underline sm:text-2xl">
            {name}
          </h5>
        </a>
        <div className="mb-3 text-xs text-primary-100/80">
          <div className="flex items-center space-x-1 sm:text-sm">{technologies}</div>
        </div>
        <div className="mb-2 mt-1 tracking-wide text-gray-300">
          <div className="text-sm sm:text-base">
            {showFullDesc
              ? description
              : description.length > 100
              ? `${description.slice(0, 100)}...`
              : `${description.slice(0, 100)}`}
          </div>

          {description.length > 100 && (
            <button
              onClick={() => setShowFullDesc(!showFullDesc)}
              className="inline-flex items-center gap-1 text-sm font-medium text-blue-500 transition-colors hover:text-blue-600"
            >
              {showFullDesc ? (
                <>
                  Show less <FaChevronUp className="text-xs" />
                </>
              ) : (
                <>
                  Show more <FaChevronDown className="text-xs" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
      <div className="rounded-b-lg bg-primary-500 p-6 pt-4 sm:pt-6">
        <div className="flex flex-col items-start justify-between md:flex-row">
          <Button
            type="tertiary"
            className="w-full gap-1 bg-primary-400/30 text-gray-300 disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
            disabled={gitRepo?.length === 0 || gitRepo === undefined}
            to={gitRepo}
          >
            <TbCodeCircle2Filled size={18} />
            <span>Source</span>
          </Button>
          <Button
            type="tertiary"
            disabled={liveDemo?.length === 0 || liveDemo === undefined}
            to={liveDemo}
            className="mt-2 w-full bg-primary-400/30 text-gray-300 disabled:cursor-not-allowed disabled:opacity-50 md:mt-0 md:w-auto"
          >
            <FaGlobe size={16} />
            <span>Live Demo</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
