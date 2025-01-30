import { useState, useEffect, useRef, useCallback } from "react";
import { twMerge } from "tailwind-merge";
import { useKeyListener } from "../../hooks/useKeyListener";
// Animation related
import { animate, motion, useMotionValue } from "framer-motion";

// React Icons
import {
  IoClose,
  IoHeart,
  IoHeartOutline,
  IoPause,
  IoPlay,
  IoStar,
} from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
// Images
import storyImg from "../../assets/images/story-img/story.webp";
import avatarImage from "../../assets/images/avatar-images/avatar.webp";

function UserStory({ storyOpen, setStoryOpen }) {
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [timeToHide, setTimeToHide] = useState(false);

  // Story touch timer ref
  const intervalRef = useRef(null);
  // Story duration ref
  const timeoutRef = useRef(null);
  // Story ref (for handle click outside)
  const storyRef = useRef(null);

  // motion value for y-axis
  const y = useMotionValue(0);

  const handleClose = useCallback(async () => {
    // Animate the closing of the story
    await animate("#storyContainer", {
      scale: 0.8,
      opacity: 0,
      transition: { duration: 0.3 },
    });

    // After animation finishes, close the story
    setStoryOpen(false);
    setIsPaused(false);
    setProgress(0);
  }, [setStoryOpen, setIsPaused]);

  // Close the Story if the escape key is pressed
  useKeyListener(() => {
    if (storyOpen) handleClose();
  }, "Escape");

  // pause/resume functions for header and footer
  const handlePause = () => setIsPaused(true);
  const handleResume = () => setIsPaused(false);

  // When user press to story
  const handleTouchStart = useCallback(() => {
    // After 500ms story will
    intervalRef.current = setTimeout(() => {
      setTimeToHide(true); // hide header/footer
      setIsPaused(true); // Pause the story
    }, 500); // 500ms delay
  }, []);

  // When user unpress to story
  const handleTouchEnd = useCallback(() => {
    clearTimeout(intervalRef.current); // Stop timer
    setTimeToHide(false); // Make header/footer visible
    setIsPaused(false); // Resume the story
  }, []);

  // Handle story duration and progress tracking
  useEffect(() => {
    //If the story is closed, reset progress and exit
    if (!storyOpen) {
      setProgress(0);
      return;
    }

    // If the story is paused, exit early
    if (isPaused) return;

    // Interval reference for updating progress
    let interval;
    // Total progress duration (100%)
    const storyEndTime = 100;

    // Start progress tracking
    interval = setInterval(() => {
      setProgress((prev) => {
        // If progress reaches the end, stop and close the story
        if (prev >= storyEndTime) {
          clearInterval(interval); // Stop the interval
          timeoutRef.current = setTimeout(handleClose, 0); // Close the story with a slight delay to prevent rendering issues
          return storyEndTime; // Ensure progress doesn't exceed 100%
        }
        return prev + 1; // Otherwise, increment progress
      });
    }, 50); // Update progress every 50ms

    // Cleanup function to clear interval
    return () => {
      clearInterval(interval);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [storyOpen, isPaused, handleClose]);

  // When user clicks outside of story content
  const handleClickOutside = useCallback(
    (e) => {
      if (storyRef.current && !storyRef.current.contains(e.target)) {
        handleClose();
      }
    },
    [handleClose]
  );

  return (
    <>
      {storyOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
          onClick={handleClickOutside}
        >
          <motion.div
            ref={storyRef}
            id="storyContainer"
            className="relative flex h-screen w-screen max-w-[400px] flex-col overflow-hidden rounded-lg bg-gray-900 md:h-[90vh] md:w-[50vw]"
            drag="y" // Drag direction
            // Animation
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            style={{ y }}
            // Drag options
            dragListener={true}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.3 }}
            onDragEnd={() => {
              if (y.get() >= 40) {
                handleClose();
              }
            }}
          >
            {/* Progress Bar */}
            <div
              className={twMerge(
                "absolute left-0 top-4 w-full px-4 opacity-100 transition-opacity duration-300 ease",
                timeToHide && "opacity-0"
              )}
            >
              <div className="h-[2px] w-full bg-gray-700">
                <motion.div
                  className="h-full rounded-sm bg-white"
                  // Progress bar animation
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                ></motion.div>
              </div>
            </div>

            {/* Header */}
            <div
              className={twMerge(
                "absolute left-0 top-6 flex w-full items-center justify-between px-4 py-2 opacity-100 transition-opacity duration-300 ease",
                timeToHide && "opacity-0"
              )}
            >
              {/* Img and Name */}
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 overflow-hidden rounded-full">
                  <img
                    src={avatarImage}
                    alt="User Avatar"
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="font-semibold text-gray-200">BekauriDev</span>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-2">
                {/* Close Friend Button */}
                <div className="inline-flex items-center justify-center gap-[2.5px] rounded-[4px] bg-green-600 p-1 text-red-50">
                  <IoStar size={15} strokeWidth={20} />
                  <IoIosArrowDown size={14} />
                </div>

                {/* Play/Pause Button */}
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
                {/* Close Button */}
                <IoClose
                  className="cursor-pointer text-xl text-white"
                  onClick={handleClose}
                />
              </div>
            </div>

            {/* Story Content */}
            <motion.div
              className="flex flex-grow items-center justify-center"
              onMouseDown={handlePause}
              onMouseUp={handleResume}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div className="pointer-events-none h-full w-full">
                <img
                  src={storyImg}
                  alt="Story Content"
                  className="h-full w-full object-contain"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                />
              </div>
            </motion.div>

            {/* Footer */}
            <div
              className={twMerge(
                "absolute bottom-4 left-0 flex w-full items-center gap-2 opacity-100 transition-opacity duration-300 ease px-4",
                timeToHide && "opacity-0"
              )}
            >
              <input
                type="text"
                disabled
                placeholder="Send Message"
                className="flex-grow rounded-full bg-gray-800 px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none"
              />
              {/* Heart Button */}
              <div
                className="cursor-pointer"
                onClick={() => setIsHeartClicked(!isHeartClicked)}
              >
                {isHeartClicked ? (
                  <IoHeart className="text-2xl text-red-500" />
                ) : (
                  <IoHeartOutline className="text-2xl text-gray-300" />
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

export default UserStory;
