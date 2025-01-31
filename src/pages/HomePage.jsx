import { useEffect } from "react";
import UserIndroductionCard from "../features/user-card/UserIndroductionCard";

import ProjectsPreview from "../features/projects/ProjectsPreview";

import AboutMe from "../features/about-me/AboutMe";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
function HomePage() {
  const isStoryOpen = useSelector((state) => state.user.isStoryOpen);

  useEffect(() => {
    if (isStoryOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = ""; // Restore scrolling
    }
  }, [isStoryOpen]);

  return (
    <>
      <div className={twMerge("md:sticky md:top-0 md:z-10")}>
        <UserIndroductionCard />
        <ProjectsPreview />
      </div>
      <AboutMe />
    </>
  );
}

export default HomePage;
