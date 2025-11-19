import { useState, useMemo, useEffect } from "react";

// Third-party libraries
import Fuse from "fuse.js";

// Internal project files – features
import { projects } from "../features/projects/api";
import ProjectCard from "../features/projects/ProjectCard";

// UI components
import Breadcrumbs from "../ui/Breadcrumbs";
import Pagination from "../ui/pagination";
function ProjectsPage() {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  const fuse = useMemo(
    () =>
      new Fuse(projects, {
        keys: ["name", "technologies"],
        threshold: 0.3,
      }),
    []
  );

  useEffect(function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const filteredProjects = query ? fuse.search(query).map((r) => r.item) : projects;

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const start = (currentPage - 1) * projectsPerPage;
  const currentProjects = filteredProjects.slice(start, start + projectsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10">
      <div className="mb-6">
        <Breadcrumbs />
      </div>

      <div className="mb-10 flex flex-col items-center justify-between gap-4 md:flex-row">
        <h1 className="text-4xl font-semibold tracking-tight text-gray-100">
          My Projects
        </h1>
        <input
          type="search"
          placeholder="Search projects..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full max-w-xs rounded-lg border border-gray-700 bg-gray-800/60 px-4 py-2 text-gray-100 placeholder-gray-400 shadow-sm transition focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
          aria-label="Search projects"
        />
      </div>

      <div className="grid min-h-[55vh] grid-cols-1 items-start gap-8 md:grid-cols-2 lg:grid-cols-3">
        {currentProjects.length > 0 ? (
          currentProjects.map((project) => (
            <ProjectCard key={project.name} {...project} />
          ))
        ) : (
          <div className="col-span-full flex h-64 items-center justify-center rounded-lg bg-gray-800/40 text-gray-400">
            No projects found. Try a different search term.
          </div>
        )}
      </div>

      {filteredProjects.length > projectsPerPage && (
        <div className="mt-10 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </section>
  );
}

export default ProjectsPage;
