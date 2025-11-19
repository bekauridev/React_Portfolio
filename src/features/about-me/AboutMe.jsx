import { FaUserGraduate } from "react-icons/fa";
import TimeLine from "./TimeLine";
import DivideLine from "../../ui/DivideLine";

function AboutMe() {
  return (
    //
    <div
      className="mx-2 mb-4 max-w-lg rounded-xl border border-slate-700/30 bg-primary-900/10 shadow-lg"
      style={{ backdropFilter: "blur(1px)" }}
    >
      <div className="p-6">
        <div className="mb-1 flex items-center gap-2">
          <FaUserGraduate size={25} className="text-text" />
          <h1 className="text-3xl font-bold text-gray-200">About Me</h1>
        </div>
        <DivideLine type="forIcon" />
        <p className="text-md mt-2 text-gray-200">
          Hi, I&#39;m a web developer from Tbilisi. I started coding in 2023. I mainly
          work with React, Node.js, Express, and Tailwind, and I enjoy turning ideas into
          real, functional projects that are easy to use. I&#39;m always learning,
          improving, and looking for new opportunities to grow as a developer. Right now,
          for example, I&#39;m exploring the PHP Laravel framework and building projects
          with it.
        </p>
      </div>
      <DivideLine type="secondary" className="w-full border-slate-700/30" />
      <div className="p-6">
        {/* Education */}
        <h2 className="text-2xl font-bold text-gray-200">Education </h2>
        <DivideLine type="forIcon" />

        {/* TimeLine  */}
        <div className="pb-0 pt-4">
          <TimeLine />
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
