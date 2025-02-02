import ProjectCard from "./ProjectCard";
import { useState } from "react";
import Fuse from "fuse.js";
import { projects } from "./api";

import Breadcrumbs from "../../ui/Breadcrumbs";

const fuse = new Fuse(projects, {
  keys: ["name", "description", "technologies"],
  threshold: 0.3,
});

function Projects() {
  const [query, setQuery] = useState("");

  // Filter projects based on search query
  const filteredProjects = query
    ? fuse.search(query).map((result) => result.item)
    : projects;

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
          }}
          className="rounded-lg border border-primary-400 bg-primary-900 py-2 pl-2 text-primary-100 placeholder-primary-300 focus:border-primary-300 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 items-center justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {filteredProjects.length > 0 ? (
          <>
            {filteredProjects.map((project, index) => (
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

      {filteredProjects.length > 0 && <div className="mt-8">{/* Pagination */}</div>}
    </div>
  );
}

export default Projects;
