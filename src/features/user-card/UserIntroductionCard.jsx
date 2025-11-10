import { twMerge } from "tailwind-merge";
// Components
import UserTechStackItem from "./UserTechStackItem";
import Story from "../story";

// ui
import InfoItem from "../../ui/InfoItem";
import Button from "../../ui/Button";

// Images
import avatarImage from "../../assets/images/avatar-images/avatar.webp";

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
  // Story Play state
  const { handleStoryOpen, isStoryOpened } = useStory();

  return (
    <div
      className="relative mx-2 block max-w-lg justify-self-center rounded-xl border border-slate-700/30 bg-primary-900/10 p-6 shadow-lg"
      style={{ backdropFilter: "blur(1px)" }}
    >
      <div className="mb-3 flex gap-2 sm:mb-4">
        {/* Profile Image */}
        <div
          onClick={handleStoryOpen}
          className={twMerge(
            "relative m-1  cursor-pointer rounded-2xl bg-gray-700 outline outline-[2px]  outline-offset-2 overflow-hidden",
            isStoryOpened ? "text-gray-600" : "text-green-600"
          )}
        >
          {/* Image */}
          <img
            src={avatarImage}
            alt="User Profile"
            className="h-full w-full rounded-xl object-cover"
            loading="eager"
          />

          {/* Overlay effect for image */}
          <div className="absolute inset-0 bg-primary-600/30 transition-opacity duration-300 hover:opacity-40"></div>
        </div>

        <div className="flex flex-col">
          {/* Status */}
          <div>
            <span className="inline-block rounded-full bg-green-600/25 px-3 py-1 text-xs font-semibold text-green-500">
              Available To Work
            </span>
          </div>

          {/* Name and Title */}
          <div className="">
            <h2 className="text-2xl font-semibold text-text">Giorgi</h2>
            <p className="text-md font-semibold text-gray-300">
              I&#39;m a <span className="text-text"> Web Developer </span>
            </p>
          </div>

          {/* Status Indicator */}
        </div>
      </div>

      {/* User Info */}
      <div className="mb-6 flex flex-wrap gap-2">
        <InfoItem Icon={FaMapLocationDot} text="Georgia/Tbilisi" />
        <InfoItem Icon={TbTimezone} text="UTC+4" />
        <InfoItem Icon={FaBirthdayCake} text="10-31-2005" />
        <InfoItem Icon={RiGlobeFill} text="English & Georgian" />
        <InfoItem Icon={LuBookHeart} text="Love Psychology" />
      </div>
      {/* Tech Stack */}
      <div className="mb-4">
        <p className="text-md mb-2 font-semibold text-gray-300">Tech stack:</p>
        <div className="flex flex-wrap gap-2">
          {visibleTechStack.map((tech, index) => (
            <UserTechStackItem key={index} IconPath={tech.icon} Technology={tech.name} />
          ))}
        </div>

        {techStack.length > 6 && (
          <div className="mt-2 flex justify-start pl-0.5">
            <button
              onClick={() => setShowAllTech(!showAllTech)}
              className="inline-flex items-center gap-1 text-sm font-medium text-text transition-colors"
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
      {/* Buttons*/}
      <div className="mt-8 flex flex-row gap-2">
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
