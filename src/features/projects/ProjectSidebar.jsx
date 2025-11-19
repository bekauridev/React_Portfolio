import { FaDatabase, FaGithub, FaGlobe } from "react-icons/fa";
import { TbCodeCircle2Filled } from "react-icons/tb";

function ProjectSidebar({ technologies = [], gitRepo, liveDemo, database }) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-200">Technologies</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {technologies.map((tech, idx) => (
            <span
              key={idx}
              className="rounded-full bg-gray-800/60 px-3 py-1 text-sm text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {(gitRepo || liveDemo || database) && (
        <div>
          <h3 className="text-lg font-semibold text-gray-200">Links</h3>
          <div className="mt-3 flex flex-col gap-2">
            {gitRepo && (
              <a
                href={gitRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300"
              >
                <FaGithub /> Source Code
              </a>
            )}
            {database && (
              <a
                href={database}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300"
              >
                <FaDatabase /> database
              </a>
            )}

            {liveDemo && (
              <a
                href={liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300"
              >
                <FaGlobe /> Live Demo
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectSidebar;
