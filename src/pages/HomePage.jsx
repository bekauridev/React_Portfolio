// Feature user-card
import UserIndroductionCard from "../features/user-card/UserIndroductionCard";

// Feature projects
import ProjectsPreview from "../features/projects/ProjectsPreview";

// Feature about-me
import AboutMe from "../features/about-me/AboutMe";

import { Outlet } from "react-router";
import { twMerge } from "tailwind-merge";

function HomePage() {
  return (
    <>
      <div className={twMerge("md:sticky md:top-0 md:z-10")}>
        <UserIndroductionCard />
        <ProjectsPreview />
      </div>
      <Outlet />
      <AboutMe />
    </>
  );
}

export default HomePage;
