import { twMerge } from "tailwind-merge";

// Icons
import { IoClose, IoPause, IoPlay, IoStar } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";

function StoryHeader({ timeToHide, isPaused, handleResume, handlePause, handleClose }) {
  return (
    <div
      className={twMerge(
        "absolute left-0 top-6 flex w-full items-center justify-between px-4 py-2 opacity-100 transition-opacity duration-300 ease",
        timeToHide && "opacity-0"
      )}
    >
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 overflow-hidden rounded-full">
          <img
            src="https://res.cloudinary.com/duybptmkx/image/upload/c_fill,ar_3:4/v1762891365/Resume-image_cphpgc.jpg"
            alt="User Avatar"
          />
        </div>
        <span className="font-semibold text-gray-200">BekauriDev</span>
      </div>

      <div className="flex items-center gap-2">
        <div className="inline-flex items-center justify-center gap-[2.5px] rounded-[4px] bg-green-600 p-1 text-red-50">
          <IoStar size={15} />
          <IoIosArrowDown size={14} />
        </div>

        {isPaused ? (
          <IoPlay
            className="hidden cursor-pointer text-lg text-white md:block"
            onClick={handleResume}
          />
        ) : (
          <IoPause
            className="hidden cursor-pointer text-lg text-white md:block"
            onClick={handlePause}
          />
        )}
        <IoClose className="cursor-pointer text-xl text-white" onClick={handleClose} />
      </div>
    </div>
  );
}

export default StoryHeader;
