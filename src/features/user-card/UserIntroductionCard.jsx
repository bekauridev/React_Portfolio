import { twMerge } from "tailwind-merge";
// Components
import UserTechStackItem from "./UserTechStackItem";

// ui
import InfoItem from "../../ui/InfoItem";
import Button from "../../ui/Button";

// React Icons
import { FaBirthdayCake, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { LuBookHeart } from "react-icons/lu";
import { RiGlobeFill } from "react-icons/ri";
import { TbTimezone } from "react-icons/tb";
import { FiGithub } from "react-icons/fi";

// Story Play Controls
import useStory from "../story/hooks/useStory";
import { techStack } from "./api";
import { useState } from "react";

function UserIntroductionCard() {
  const [showAllTech, setShowAllTech] = useState(false);

  const visibleTechStack = showAllTech ? techStack : techStack.slice(0, 6);
  const { handleStoryOpen, isStoryOpened } = useStory();

  return (
    <div
      className="relative block max-w-lg p-6 mx-2 border shadow-lg justify-self-center rounded-xl border-slate-700/30 bg-primary-900/10"
      style={{ backdropFilter: "blur(1px)" }}
    >
      {/* HEADER SECTION */}
      <div className="flex items-center gap-4 mb-4">
        {/* Profile Image Wrapper */}
        <div className="relative group/avatar shrink-0">
          <div
            onClick={handleStoryOpen}
            className={twMerge(
              "relative w-20 h-20 cursor-pointer rounded-full bg-gray-700 outline outline-[2px] outline-offset-2 overflow-hidden",
              isStoryOpened
                ? "text-gray-600 outline-gray-600"
                : "text-green-600 outline-green-600"
            )}
          >
            {/* Profile Image */}
            <img
              src="https://res.cloudinary.com/duybptmkx/image/upload/w_400,h_400,c_fill,g_face,q_auto,f_webp/v1762891365/Resume-image_cphpgc.jpg"
              alt="BekauriDev Portfolio Avatar image"
              loading="eager"
              className="object-cover w-full h-full"
            />

            {/* Overlay effect for image */}
            <div className="absolute inset-0 transition-opacity duration-300 bg-primary-600/20 hover:opacity-40"></div>
          </div>

          {/* Status Dot (Bottom Left) */}
          <div className="group/status absolute -bottom-1 -left-1 z-30 flex h-6 cursor-default items-center rounded-full bg-gray-900/95 px-1.5 shadow-lg ring-1 ring-white/10 backdrop-blur-md transition-all delay-75 duration-300 ease-out hover:pr-3 hover:ring-green-500/50 hover:delay-0">
            {/* Dot Icon */}
            <div className="relative flex items-center justify-center w-3 h-3 shrink-0">
              {/* <span className="absolute inline-flex w-full h-full bg-green-400 rounded-full animate-ping opacity-65"></span> */}
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
            </div>

            {/* Text */}
            <span className="max-w-0 overflow-hidden whitespace-nowrap text-[0px] font-medium text-green-400 opacity-0 transition-all duration-300 ease-out group-hover/status:ml-2 group-hover/status:max-w-[120px] group-hover/status:text-xs group-hover/status:opacity-100">
              Available To Work
            </span>
          </div>
        </div>

        {/* Name & Title */}
        <div className="flex flex-col justify-center">
          <div className="mt-1">
            <h2 className="text-2xl font-semibold leading-tight text-text">Giorgi</h2>
            <p className="text-md mt-0.5 font-semibold text-gray-300">
              I&#39;m a <span className="text-text">Web Developer</span>
            </p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="flex flex-wrap gap-2 mb-6">
        <InfoItem Icon={FaMapLocationDot} text="Georgia/Tbilisi" />
        <InfoItem Icon={TbTimezone} text="UTC+4" />
        <InfoItem Icon={FaBirthdayCake} text="10-31-2005" />
        <InfoItem Icon={RiGlobeFill} text="English & Georgian" />
        <InfoItem Icon={LuBookHeart} text="Love Psychology" />
      </div>

      {/* Tech Stack */}
      <div className="mb-4">
        <p className="mb-2 font-semibold text-gray-300 text-md">Tech stack:</p>
        <div className="flex flex-wrap gap-2">
          {visibleTechStack.map((tech, index) => (
            <UserTechStackItem key={index} IconPath={tech.icon} Technology={tech.name} />
          ))}
        </div>

        {techStack.length > 6 && (
          <div className="mt-2 flex justify-start pl-0.5">
            <button
              onClick={() => setShowAllTech(!showAllTech)}
              className="inline-flex items-center gap-1 text-sm font-medium transition-colors text-text hover:text-primary-300"
            >
              {showAllTech ? (
                <>
                  Show less <FaChevronUp className="text-xs" />
                </>
              ) : (
                <>
                  Show more <FaChevronDown className="text-xs" />
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex flex-row gap-2 mt-8">
        <Button
          type="primary"
          className="text-md"
          to={`https://drive.google.com/file/d/1XiN0YlClQBnoOUAYAqnmDEFQmEqW5cns/view?usp=sharing`}
        >
          Resume
        </Button>
        <Button type="secondary" to={"https://github.com/bekauridev"} className="text-md">
          <FiGithub strokeWidth={2.5} />
          Github
        </Button>
      </div>
    </div>
  );
}

export default UserIntroductionCard;
