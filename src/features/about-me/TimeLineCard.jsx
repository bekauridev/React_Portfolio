import { twMerge } from "tailwind-merge";
import DivideLine from "../../ui/DivideLine";

function TimeLineCard({ date, title, description, learningPlace, className }) {
  return (
    <li className={twMerge("mb-10 ms-4", className)}>
      <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-gray-900 bg-gray-700"></div>
      <time className="leading-non mb-1 text-sm font-normal text-gray-300/55">
        {date}
      </time>
      <h3 className="mt-1 text-lg font-semibold text-gray-300">{title}</h3>
      <div className="mb-4 text-base font-normal text-gray-300/80">
        {/* Handle line breaks in description */}
        <p className="pb-1">
          {description.split("<br />").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </p>

        <DivideLine type="secondary" />

        {/* Handle line breaks in learningPlace */}
        <p className="pt-1 text-sm font-semibold text-text/85">
          {learningPlace.split("<br />").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </p>
      </div>
    </li>
  );
}

export default TimeLineCard;
