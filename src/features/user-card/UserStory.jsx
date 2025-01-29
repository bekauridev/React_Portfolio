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
import storyImg from "../../assets/images/story-img/story.png";
import avatarImage from "../../assets/images/avatar-images/Webp.net-resize11image.jpg";

function UserStory({ storyOpen, setStoryOpen }) {
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [timeToHide, setTimeToHide] = useState(false);

  const intervalRef = useRef(null);
  const y = useMotionValue(0); // Create motion value for y-axis

  const handleClose = useCallback(
    async function handleClose() {
      // Animate the closing of the story
      await animate("#storyContainer", {
        scale: 0.8,
        opacity: 0,
        transition: { duration: 0.3 },
      });

      // After animation finishes, close the story
      setStoryOpen(false);
    },
    [setStoryOpen]
  );

  // Close the Story if the escape key is pressed
  useKeyListener(() => {
    if (storyOpen) handleClose();
  }, "Escape");

  // pause/resume functions for header and footer
  const handlePause = () => setIsPaused(true);
  const handleResume = () => setIsPaused(false);

  // When user press to story
  const handleTouchStart = () => {
    const startTime = Date.now();
    // Touch time order to hide header/footer
    const hideTime = 500; //(500ms) hald second

    intervalRef.current = setInterval(() => {
      // Elapsed time in milliseconds
      const elapsed = Date.now() - startTime;

      // After half second
      if (elapsed >= hideTime) {
        setTimeToHide(true); // Hide header/footer
        setIsPaused(true); // Pause the story
        clearInterval(intervalRef.current); // Stop further interval updates
      }
    }, 10); // Check elapsed time every 10ms
  };

  // When user unpress to story
  const handleTouchEnd = () => {
    clearInterval(intervalRef.current); // Stop the interval
    intervalRef.current = null;

    setTimeToHide(false); // Make header/footer visible again
    setIsPaused(false); // Resume the story
  };

  // Handle story duration and progress
  useEffect(() => {
    let interval;
    const storyEndTime = 100;

    // Reset progress when the story is closed
    if (!storyOpen) {
      setProgress(0); // Reset progress if the story is closed
    }

    // Update progress if the story is open and not paused
    if (storyOpen && !isPaused) {
      interval = setInterval(() => {
        setProgress((prev) => {
          // When story reachs end time
          if (prev >= storyEndTime) {
            // Stop progress
            clearInterval(interval);
            // Close the story
            setTimeout(() => {
              // Use setTimeout because ensure that React has completed the current render phase withouth this there will be error
              handleClose();
            }, 0);
            return storyEndTime;
          }
          // If not Increment progress
          return prev + 1;
        });
      }, 50);
    } else {
      // Stop progress if paused or story is closed
      clearInterval(interval);
    }

    // Cleanup
    return () => clearInterval(interval);
  }, [storyOpen, isPaused, handleClose]);

  // When user clicks outside of story content
  const handleClickOutside = (e) => {
    if (e.target.classList.contains("story-backdrop")) {
      handleClose();
    }
  };

  return (
    <>
      {storyOpen && (
        <div
          className="story-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
          onClick={handleClickOutside}
        >
          <motion.div
            id="storyContainer"
            className="relative flex h-screen w-screen max-w-[400px] flex-col overflow-hidden rounded-lg bg-gray-900 md:h-[90vh] md:w-[50vw]"
            drag="y" // Drag direction
            // Animation
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            // Drag options
            dragListener={true}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.3 }}
            onDragEnd={() => {
              if (y.get() <= 50) {
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
              <div className="h-full w-full">
                <img
                  src={storyImg}
                  alt="Story Content"
                  className="h-full w-full object-contain"
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
