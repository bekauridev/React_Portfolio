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
import { useQuery } from "@tanstack/react-query";

// Story Play Controls
import useStory from "../story/hooks/useStory";
import { useState } from "react";
import { workStatusApi } from "../../api/workStatusApi";
import { storiesApi } from "../../api/storiesApi";
import { techStackApi } from "../../api/techStackApi";

const fallbackWorkStatus = {
  isOpenToWork: false,
  label: "Available To Work",
};

function UserIntroductionCard() {
  const [showAllTech, setShowAllTech] = useState(false);

  const { data: apiTechStack = [] } = useQuery({
    queryKey: ["tech-stack"],
    queryFn: () => techStackApi.list(),
    select: (response) => {
      const items = Array.isArray(response?.data) ? response.data : [];
      return items.map((item) => ({
        id: item._id ?? item.id ?? item.name,
        icon: item.iconUrl,
        name: item.name,
      }));
    },
    staleTime: 1000 * 60 * 5,
  });
  const visibleTechStack = showAllTech ? apiTechStack : apiTechStack.slice(0, 6);
  const { data: stories = [] } = useQuery({
    queryKey: ["stories"],
    queryFn: () => storiesApi.list("?sort=-createdAt&limit=1"),
    select: (response) => (Array.isArray(response?.data) ? response.data : []),
    staleTime: 1000 * 60 * 5,
  });
  const currentStory = stories[0];
  const currentStoryKey = currentStory?._id ?? currentStory?.id ?? currentStory?.image;
  const { handleStoryOpen, isStoryOpened } = useStory(currentStoryKey);
  const { data: workStatus = fallbackWorkStatus } = useQuery({
    queryKey: ["work-status"],
    queryFn: () => workStatusApi.list(),
    select: (response) => {
      if (Array.isArray(response?.data)) return response.data[0] || fallbackWorkStatus;
      return response?.data || fallbackWorkStatus;
    },
    staleTime: 1000 * 60 * 5,
  });
  const isOpenToWork = Boolean(workStatus.isOpenToWork);
  const statusLabel = workStatus.label || fallbackWorkStatus.label;

  return (
    <div
      className="relative mx-2 block max-w-lg justify-self-center rounded-xl border border-slate-700/30 bg-primary-900/10 p-6 shadow-lg"
      style={{ backdropFilter: "blur(1px)" }}
    >
      {/* HEADER SECTION */}
      <div className="mb-4 flex items-center gap-4">
        {/* Profile Image Wrapper */}
        <div className="group/avatar relative shrink-0">
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
              className="h-full w-full object-cover"
            />

            {/* Overlay effect for image */}
            <div className="absolute inset-0 bg-primary-600/20 transition-opacity duration-300 hover:opacity-40"></div>
          </div>

          {/* Status Dot (Bottom Left) */}
          <div
            className={`group/status absolute -bottom-1 -left-1 z-30 flex h-6 cursor-default items-center rounded-full bg-gray-900/95 px-1.5 shadow-lg ring-1 ring-white/10 backdrop-blur-md transition-all delay-75 duration-300 ease-out hover:pr-3 hover:delay-0 ${
              isOpenToWork ? "hover:ring-green-500/50" : "hover:ring-gray-400/50"
            }`}
          >
            {/* Dot Icon */}
            <div className="relative flex h-3 w-3 shrink-0 items-center justify-center">
              {/* <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-65"></span> */}
              <span
                className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
                  isOpenToWork ? "bg-green-500" : "bg-gray-500"
                }`}
              ></span>
            </div>

            {/* Text */}
            <span
              className={`max-w-0 overflow-hidden whitespace-nowrap text-[0px] font-medium opacity-0 transition-all duration-300 ease-out group-hover/status:ml-2 group-hover/status:max-w-[160px] group-hover/status:text-xs group-hover/status:opacity-100 ${
                isOpenToWork ? "text-green-400" : "text-gray-300"
              }`}
            >
              {statusLabel}
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
      <div className="mb-6 flex flex-wrap gap-2">
        <InfoItem Icon={FaMapLocationDot} text="Georgia/Tbilisi" />
        <InfoItem Icon={TbTimezone} text="UTC+4" />
        <InfoItem Icon={FaBirthdayCake} text="10-31-2005" />
        <InfoItem Icon={RiGlobeFill} text="English & Georgian" />
        <InfoItem Icon={LuBookHeart} text="Love Psychology" />
      </div>

      {apiTechStack.length > 0 && (
        <div className="mb-4">
          <p className="text-md mb-2 font-semibold text-gray-300">Tech stack:</p>
          <div className="flex flex-wrap gap-2">
            {visibleTechStack.map((tech) => (
              <UserTechStackItem
                key={tech.id ?? tech.name}
                IconPath={tech.icon}
                Technology={tech.name}
              />
            ))}
          </div>

          {apiTechStack.length > 6 && (
            <div className="mt-2 flex justify-start pl-0.5">
              <button
                onClick={() => setShowAllTech(!showAllTech)}
                className="inline-flex items-center gap-1 text-sm font-medium text-text transition-colors hover:text-primary-300"
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
      )}

      {/* Buttons */}
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
