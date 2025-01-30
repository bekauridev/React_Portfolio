import { useState } from "react";
import { twMerge } from "tailwind-merge";
// Components
import UserTechStackItem from "./UserTechStackItem";
import UserInfoItem from "./UserInfoItem";
import UserStory from "./UserStory";

// Images
import avatarImage from "../../assets/images/avatar-images/avatar.webp";

// React Icons
import { FaBirthdayCake } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { LuBookHeart } from "react-icons/lu";
import { RiGlobeFill } from "react-icons/ri";
import { TbTimezone } from "react-icons/tb";

// SVG Icons
import reactIcon from "../../assets/icons/react.svg";
import javaScriptIcon from "../../assets/icons/javascript.svg";
import nodeJsIcon from "../../assets/icons/nodejs.svg";
import pythonIcon from "../../assets/icons/python.svg";
import mngodbIcon from "../../assets/icons/mongodb.svg";

import htmlIcon from "../../assets/icons/html.svg";
import cssIcon from "../../assets/icons/css.svg";
import tailwindcssIcon from "../../assets/icons/tailwindcss.svg";

import Button from "../../ui/Button";

import { FiGithub } from "react-icons/fi";

function UserIndroductionCard() {
  // Story state
  const [storyOpen, setStoryOpen] = useState(false);
  // User avatar border state
  const [isStoryOpened, setIsStoryOpened] = useState(() => {
    const storedValue = localStorage.getItem("StoryOpened");
    return storedValue === "true";
  });

  const handleStoryClick = () => {
    setIsStoryOpened(true);
    setStoryOpen((storyOpen) => !storyOpen);
    localStorage.setItem("StoryOpened", true);
  };

  return (
    <div className="relative mx-2 mt-6 block max-w-md rounded-xl border border-border-primary p-5 shadow-lg">
      <div className="mb-3 flex gap-2 sm:mb-4">
        {/* Profile Image */}
        <div
          onClick={handleStoryClick}
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

          {/* Overlay effect */}
          <div className="absolute inset-0 bg-primary-600/30 transition-opacity duration-300 hover:opacity-40"></div>
        </div>

        {/* Story */}
        <UserStory
          storyOpen={storyOpen}
          setStoryOpen={setStoryOpen}
          onStoryOpen={storyOpen}
        />

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
        <UserInfoItem Icon={FaMapLocationDot} text="Georgia/Tbilisi" />
        <UserInfoItem Icon={TbTimezone} text="UTC+4" />
        <UserInfoItem Icon={FaBirthdayCake} text="10-31-2005" />
        <UserInfoItem Icon={RiGlobeFill} text="English & Georgian" />
        <UserInfoItem Icon={LuBookHeart} text="Love Psychology" />
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

      {/* CV */}
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
    </div>
  );
}

export default UserIndroductionCard;
// https://framer.com/m/framer/Particles.js
