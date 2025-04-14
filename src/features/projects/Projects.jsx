import ProjectCard from "./ProjectCard";
import { useState } from "react";
import Fuse from "fuse.js";
import { projects } from "./api";

import Breadcrumbs from "../../ui/Breadcrumbs";
import Pagination from "../../ui/pagination";

// Fuse.js initialization
const fuse = new Fuse(projects, {
  keys: ["name", "technologies"],
  threshold: 0.3,
});

function Projects() {
  // for search
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 2;

  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;

  // Filter projects based on search query
  const filteredProjects = query
    ? fuse.search(query).map((result) => result.item)
    : projects;

  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex min-h-screen flex-col p-6 sm:max-w-[44rem]">
      {/* Breadcrumbs */}
      <div className="self-center sm:self-start">
        <Breadcrumbs />
      </div>

      <div className="mb-4 flex flex-col items-center justify-between gap-3 sm:mt-8 sm:flex-row sm:gap-4">
        <h1 className="text-4xl font-bold text-primary-100">My Projects</h1>

        <input
          type="text"
          placeholder="Search projects..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setCurrentPage(1); // Reset to the first page when searching
          }}
          className="rounded-lg border border-primary-400 bg-primary-900 py-2 pl-2 text-primary-100 placeholder-primary-300 focus:border-primary-300 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 min-h-[55vh] items-start justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {currentProjects.length > 0 ? (
          <>
            {currentProjects.map((project, index) => (
              <ProjectCard
                key={index}
                projectImg={project.image}
                name={project.name}
                description={project.description}
                technologies={project.technologies.join(" / ")}
                gitRepo={project.gitRepo}
                liveDemo={project.liveDemo}
              />
            ))}
          </>
        ) : (
          <div className="h-64 items-center justify-center">
            <p className="text-start text-lg text-primary-300">
              No projects found. Try a different search term.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {currentProjects.length > 0 && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}

export default Projects;
