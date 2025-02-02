import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

function StoryProgressBar({ progress, timeToHide }) {
  return (
    <div
      className={twMerge(
        "absolute left-0 top-4 w-full px-4 opacity-100 transition-opacity duration-300 ease",
        timeToHide && "opacity-0"
      )}
    >
      <div className="h-[2px] w-full bg-gray-700">
        <motion.div
          className="h-full rounded-sm bg-white"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
        ></motion.div>
      </div>
    </div>
  );
}

export default StoryProgressBar;
