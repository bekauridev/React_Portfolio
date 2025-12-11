import { MdOutlineWork } from "react-icons/md";
// UI
import DivideLine from "../../ui/DivideLine";
import InfiniteCarousel from "../../ui/InfiniteCarousel";
import Button from "../../ui/Button";
import thumbnailFallback from "../../assets/images/project-images/placeholder.png";
// React Icons
import { FaArrowRightLong } from "react-icons/fa6";
import { RxLink2, RxLinkBreak2 } from "react-icons/rx";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import useProjectsQuery from "./useProjectsQuery";
import { selectProjects } from "./projectsSlice";

function ProjectsPreview() {
  const navigate = useNavigate();
  const projectsFromStore = useSelector(selectProjects);
  const { isPending, isError, error, data: projects = [] } = useProjectsQuery();

  const projectList = projectsFromStore.length ? projectsFromStore : projects;
  const hasProjects = projectList.length > 0;
  const showCarousel = isPending || hasProjects;

  const carouselImages = isPending
    ? Array(3).fill(thumbnailFallback)
    : projectList.map((project) => project.thumbnail);

  const handleClick = () => {
    navigate("/projects");
  };

  return (
    <div
      className="relative max-w-lg px-4 py-6 mx-2 my-6 border shadow-lg cursor-pointer group rounded-xl border-slate-700/30 bg-primary-900/10 sm:px-6"
      onClick={handleClick}
    >
      <div className="relative flex items-center gap-2 mb-1">
        <MdOutlineWork className="text-text" size={25} />
        <h1 className="text-xl font-bold text-gray-200 sm:text-2xl">Projects</h1>

        <RxLink2
          size={24}
          className="absolute transition-all duration-300 -rotate-90 -right-3 bottom-5 text-primary-300 group-hover:opacity-0"
        />
        <RxLinkBreak2
          size={24}
          className="absolute transition-all duration-300 -rotate-90 opacity-0 -right-3 bottom-5 text-primary-300 group-hover:opacity-100"
        />
      </div>

      <DivideLine type="forIcon" />

      <p className="mt-2 text-sm text-gray-300 sm:text-base">
        Take a look at some of the projects I&#39;ve developed
      </p>

      {/* Projects carousel */}
      <div className="mt-4">
        {showCarousel && (
          <InfiniteCarousel speed={0.7} direction={"left"} images={carouselImages} />
        )}
        {isError && !hasProjects && (
          <p className="mt-3 text-sm text-amber-200/80">
            {error?.message || "Unable to load projects right now."}
          </p>
        )}
      </div>

      {/* Hover button */}
      <div className="text-md group:opacity-0 group:translate-y-0 absolute -bottom-2 left-1/2 z-10 w-full -translate-x-1/2 bg-primary-900/50 py-1.5 opacity-0 backdrop-blur-sm transition-all duration-300 ease-in-out group-hover:-translate-y-8 group-hover:opacity-100">
        <Button
          type="plain"
          className="z-10 m-auto gap-1 opacity-0 transition-[gap] duration-150 ease-in hover:gap-2 hover:text-primary-300 group-hover:opacity-100 group-hover:transition-[opacity] group-hover:duration-700"
          hover={false}
        >
          View All <FaArrowRightLong />
        </Button>
      </div>
    </div>
  );
}

export default ProjectsPreview;
