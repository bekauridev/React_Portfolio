import { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";

// Third-party libraries
import Fuse from "fuse.js";

// Internal project files – features
import ProjectCard from "../features/projects/ProjectCard";
import useProjectsQuery from "../features/projects/useProjectsQuery";
import { selectProjects } from "../features/projects/projectsSlice";

// UI components
import Breadcrumbs from "../ui/Breadcrumbs";
import Pagination from "../ui/pagination";
import SearchBar from "../ui/SearchBar";
function ProjectsPage() {
  const projectsFromStore = useSelector(selectProjects);
  const { data: projects = [], isPending, isError, error } = useProjectsQuery();
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  const projectList = projectsFromStore.length ? projectsFromStore : projects;

  const fuse = useMemo(
    () =>
      new Fuse(projectList, {
        keys: ["name", "technologies"],
        threshold: 0.3,
      }),
    [projectList]
  );

  useEffect(function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const filteredProjects = query ? fuse.search(query).map((r) => r.item) : projectList;

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const start = (currentPage - 1) * projectsPerPage;
  const currentProjects = filteredProjects.slice(start, start + projectsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="w-full max-w-6xl px-4 py-10 mx-auto">
      <div className="mb-6">
        <Breadcrumbs />
      </div>

      <div className="flex flex-col items-center justify-between gap-4 mb-10 md:flex-row">
        <h1 className="text-4xl font-semibold tracking-tight text-gray-100">
          My Projects
        </h1>
        <div className="w-full max-w-md">
          <SearchBar
            value={query}
            onChange={(value) => {
              setQuery(value);
              setCurrentPage(1);
            }}
            placeholder="Search projects..."
          />
        </div>
      </div>

      <div className="grid min-h-[55vh] grid-cols-1 items-start gap-8 md:grid-cols-2 lg:grid-cols-3">
        {isPending ? (
          Array.from({ length: projectsPerPage }).map((_, idx) => (
            <div
              key={idx}
              className="border h-80 animate-pulse rounded-xl border-slate-700/30 bg-gray-800/40"
            />
          ))
        ) : isError && !projectList.length ? (
          <div className="flex items-center justify-center h-64 text-gray-400 rounded-lg col-span-full bg-gray-800/40">
            {error?.message || "Failed to load projects. Please try again."}
          </div>
        ) : currentProjects.length > 0 ? (
          currentProjects.map((project) => (
            <ProjectCard key={project.slug} {...project} />
          ))
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-400 rounded-lg col-span-full bg-gray-800/40">
            No projects found. Try a different search term.
          </div>
        )}
      </div>

      {filteredProjects.length > projectsPerPage && (
        <div className="flex justify-center mt-10">
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
