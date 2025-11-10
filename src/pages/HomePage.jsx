// Feature user-card
import UserIntroductionCard from "../features/user-card/UserIntroductionCard";

// Feature projects
import ProjectsPreview from "../features/projects/ProjectsPreview";

// Feature about-me
import AboutMe from "../features/about-me/AboutMe";

function HomePage() {
  return (
    <>
      <div className="md:sticky md:top-2 md:z-10">
        <UserIntroductionCard />
        <ProjectsPreview />
      </div>
      <AboutMe />
    </>
  );
}

export default HomePage;
