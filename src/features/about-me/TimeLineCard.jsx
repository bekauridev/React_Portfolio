import { twMerge } from "tailwind-merge";
import DivideLine from "../../ui/DivideLine";
import { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

function TimeLineCard({
  date,
  title,
  description,
  learningPlace,
  learningPlaceLink,
  className,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className={twMerge("mb-6 ms-4", className)}>
      <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full bg-slate-700"></div>

      {/* Header Area (click to toggle) */}
      <div className="cursor-pointer select-none" onClick={() => setIsOpen(!isOpen)}>
        <time className="mb-1 text-sm font-normal leading-none text-gray-300/55">
          {date}
        </time>

        <h3 className="mt-1 flex items-center gap-1 text-lg font-semibold text-gray-300">
          {title}
          <span className="text-xs opacity-70">
            {isOpen ? <HiChevronUp size={20} /> : <HiChevronDown size={20} />}
          </span>
        </h3>
      </div>

      {/* Collapsible Content */}
      {isOpen && (
        <div className="animate-fadeIn mb-4 mt-3 text-base font-normal text-gray-300/80">
          <p className="pb-1">
            {description.split("<br />").map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </p>

          <DivideLine type="secondary" />

          <p className="pt-1 text-sm font-semibold text-text/85">
            {learningPlace.split("<br />").map((line, index) => (
              <span key={index}>
                {learningPlaceLink ? (
                  <a
                    href={learningPlaceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-300 underline decoration-primary-300/40 hover:text-primary-200"
                  >
                    {line}
                  </a>
                ) : (
                  line
                )}
                <br />
              </span>
            ))}
          </p>
        </div>
      )}
    </li>
  );
}

export default TimeLineCard;
//! 3
