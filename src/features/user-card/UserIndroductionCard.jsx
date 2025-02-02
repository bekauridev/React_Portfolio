import { twMerge } from "tailwind-merge";
// Components
import UserTechStackItem from "./UserTechStackItem";
import Story from "../story";

// ui
import InfoItem from "../../ui/InfoItem";
import Button from "../../ui/Button";

// Images
import avatarImage from "../../assets/images/avatar-images/avatar.webp";
import storyImage from "../../assets/images/story-img/story.webp";

// React Icons
import { FaBirthdayCake } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { LuBookHeart } from "react-icons/lu";
import { RiGlobeFill } from "react-icons/ri";
import { TbTimezone } from "react-icons/tb";
import { FiGithub } from "react-icons/fi";

// SVG Icons
import reactIcon from "../../assets/icons/react.svg";
import javaScriptIcon from "../../assets/icons/javascript.svg";
import nodeJsIcon from "../../assets/icons/nodejs.svg";
import pythonIcon from "../../assets/icons/python.svg";
import mngodbIcon from "../../assets/icons/mongodb.svg";

import htmlIcon from "../../assets/icons/html.svg";
import cssIcon from "../../assets/icons/css.svg";
import tailwindcssIcon from "../../assets/icons/tailwindcss.svg";

// Story Play Controls
import useStory from "../story/hooks/useStory";

function UserIndroductionCard() {
  // Story Play state
  const { isStoryOpen, handleStoryOpen, handleStoryClose, isStoryOpened } = useStory();

  return (
    <div className="relative mx-2 mt-6 block max-w-md rounded-xl border border-border-primary p-6 shadow-lg">
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
              I&#39;m a <span className="text-text"> Front-end Developer </span>
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
          <UserTechStackItem IconPath={javaScriptIcon} Technology="JavaScript" />
          <UserTechStackItem IconPath={pythonIcon} Technology="Python" />
          <UserTechStackItem IconPath={nodeJsIcon} Technology="Node | Express" />
          <UserTechStackItem IconPath={reactIcon} Technology="React" />
          <UserTechStackItem IconPath={mngodbIcon} Technology="MongoDB" />
          <UserTechStackItem IconPath={htmlIcon} Technology="Html" />
          <UserTechStackItem IconPath={cssIcon} Technology="Css" />
          <UserTechStackItem IconPath={tailwindcssIcon} Technology="Tailwind" />
        </div>
      </div>

      {/* Buttons*/}
      <div className="mt-8 flex flex-col gap-2 sm:flex-row">
        <Button
          type="primary"
          className="text-md"
          to={`https://drive.google.com/file/d/1XiN0YlClQBnoOUAYAqnmDEFQmEqW5cns/view?usp=sharing`}
        >
          Download CV
        </Button>
        <Button type="secondary" to={"https://github.com/bekauridev"} className="text-md">
          <FiGithub strokeWidth={2.5} />
          Github
        </Button>
      </div>

      {/* Story */}
      <Story
        isStoryOpen={isStoryOpen}
        onStoryClose={handleStoryClose}
        content={storyImage}
      />
    </div>
  );
}

export default UserIndroductionCard;
