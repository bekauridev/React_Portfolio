import { useGesture } from "@use-gesture/react";
import { useRef, useState } from "react";
import UserIndroductionCard from "../features/user-card/UserIndroductionCard";

import ProjectsPreview from "../features/projects/ProjectsPreview";

import AboutMe from "../features/about-me/AboutMe";
function HomePage() {
  return (
    <>
      <div className="md:sticky md:top-0 md:z-10">
        <UserIndroductionCard />
        <ProjectsPreview />
      </div>
      <AboutMe />
    </>
  );
}

export default HomePage;

{
  /*  
  
  const [crop, setCrop] = useState({ x: 20, y: 0 });
  const cardRef = useRef(null);
  useGesture(
    {
      onDrag: ({ offset: [x, y] }) => {
        setCrop({ x, y });
      },
    },
    {
      // options
      target: cardRef,
    }
  );
  
  
  <div className="flex h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-gray-700 to-gray-500">
<div className="flex h-[200vh] w-full flex-col items-center justify-start space-y-5 overflow-y-auto p-10">
  <h1 className="text-4xl font-bold text-gray-400">Rubber Band Scroll Effect</h1>
  <p className="text-center text-lg text-gray-400">
    Scroll down to see the rubber band effect!
  </p>
  <div
    ref={cardRef}
    className="relative max-w-2xl space-y-4"
    style={{
      transform: `translate3d(${crop.x}px, ${crop.y}px, 0)`,
      transition: "transform 0.1s ease-in-out",
    }}
  >
 

    <div className="rounded-lg bg-gray-800/40 p-5 text-gray-200 shadow-md">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae orci nec
      libero convallis semper.
    </div>
  </div>
</div>
</div> */
}
