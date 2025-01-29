import { FaUserGraduate } from "react-icons/fa";
import TimeLine from "./TimeLine";
import DivideLine from "../../ui/DivideLine";

function AboutMe() {
  return (
    //
    <div className="mx-2 mb-4 mt-6 max-w-md rounded-xl border border-border-primary shadow-lg">
      <div className="p-6">
        <div className="mb-1 flex items-center gap-2">
          <FaUserGraduate size={25} className="text-text" />
          <h1 className="text-3xl font-bold text-gray-200">About Me</h1>
        </div>
        <DivideLine type="forIcon" />
        <p className="text-md mt-2 text-gray-200">
          I&#39;m a front-end developer with 2 years of learning experience. I focus on
          building responsive, user-friendly interfaces. Programming and problem-solving
          are my passions, And I&#39;m always eager to learn and improve.
        </p>
      </div>
      <DivideLine type="secondary" className="w-full border-primary-600" />
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
