import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ProjectGallery from "../features/projects/ProjectGallery";
import ProjectHero from "../features/projects/ProjectHero";
import ProjectSidebar from "../features/projects/ProjectSidebar";
import { projects } from "../features/projects/api";
import Breadcrumbs from "../ui/Breadcrumbs";
import Button from "../ui/Button";

function ProjectDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const found = projects.find((p) => String(p.slug) === String(slug));
    setProject(found);
  }, [slug]);

  useEffect(function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!project) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-400">
        No project found :/
      </div>
    );
  }

  const {
    name,
    slogan,
    description,
    coverImage,
    gallery = [],
    technologies,
    gitRepo,
    liveDemo,
    database,
  } = project;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="mx-auto min-h-[80vh] max-w-6xl px-4 py-10"
    >
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <Breadcrumbs />
        <Button
          type="none"
          callBack={() => navigate(-1)}
          className="text-[14px] font-semibold tracking-wide text-gray-50 transition-colors duration-200 hover:text-primary-300"
        >
          ← Go Back
        </Button>
      </div>

      <ProjectHero name={name} slogan={slogan} image={coverImage} />
      <ProjectGallery name={name} gallery={gallery} />

      <div className="grid gap-10 md:grid-cols-3">
        <div className="md:col-span-2">
          <h2 className="mb-3 text-2xl font-semibold text-gray-100">About the Project</h2>
          <p className="leading-relaxed text-gray-300">{description}</p>
        </div>
        <ProjectSidebar
          technologies={technologies}
          gitRepo={gitRepo}
          liveDemo={liveDemo}
          database={database}
        />
      </div>
    </motion.div>
  );
}

export default ProjectDetails;
