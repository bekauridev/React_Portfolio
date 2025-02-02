import { twMerge } from "tailwind-merge";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

function StoryFooter({ isHeartClicked, setIsHeartClicked, timeToHide }) {
  return (
    <div
      className={twMerge(
        "absolute bottom-4 left-0 flex w-full items-center gap-2 px-4",
        timeToHide && "opacity-0"
      )}
    >
      <input
        type="text"
        disabled
        placeholder="Send Message"
        className="flex-grow rounded-full bg-gray-800 px-4 py-2 text-sm text-white placeholder-gray-400"
      />
      <div className="cursor-pointer" onClick={() => setIsHeartClicked(!isHeartClicked)}>
        {isHeartClicked ? (
          <IoHeart className="text-2xl text-red-500" />
        ) : (
          <IoHeartOutline className="text-2xl text-gray-300" />
        )}
      </div>
    </div>
  );
}

export default StoryFooter;
