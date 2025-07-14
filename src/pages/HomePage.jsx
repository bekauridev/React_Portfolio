// Feature user-card
import UserIndroductionCard from "../features/user-card/UserIndroductionCard";

// Feature projects
import ProjectsPreview from "../features/projects/ProjectsPreview";

// Feature about-me
import AboutMe from "../features/about-me/AboutMe";

function HomePage() {
  return (
    <>
      <div className="md:sticky md:top-2 md:z-10">
        <UserIndroductionCard />
        <ProjectsPreview />
      </div>
      <AboutMe />
    </>
  );
}

export default HomePage;
