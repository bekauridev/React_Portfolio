// Animations
import { motion } from "framer-motion";

// Components
import UserStoryHeader from "./components/StoryHeader";
import UserStoryFooter from "./components/StoryFooter";
import UserStoryProgressBar from "./components/StoryProgressBar";

// Story Controls
import { useStoryControls } from "./hooks/useStoryControls";

function Story({ isStoryOpen, onStoryClose, content }) {
  const {
    progress,
    isPaused,
    isHeartClicked,
    timeToHide,
    y,
    storyRef,
    handlePause,
    handleResume,
    handleTouchStart,
    handleTouchEnd,
    handleClickOutside,
    handleClose,
    setIsHeartClicked,
  } = useStoryControls(isStoryOpen, onStoryClose);

  if (!isStoryOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-black bg-opacity-90"
      onClick={handleClickOutside}
    >
      {/* Main Story Animation */}
      <motion.div
        ref={storyRef}
        id="storyContainer"
        className="relative flex h-screen w-screen max-w-[400px] cursor-default flex-col overflow-hidden rounded-lg bg-gray-900 md:h-[90vh] md:w-[50vw]"
        drag="y"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        style={{ y }}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.3 }}
        onDragEnd={() => {
          if (y.get() >= 40) {
            handleClose();
          }
        }}
      >
        {/* Progress Bar */}
        <UserStoryProgressBar progress={progress} timeToHide={timeToHide} />

        {/* Header */}
        <UserStoryHeader
          timeToHide={timeToHide}
          isPaused={isPaused}
          handleResume={handleResume}
          handlePause={handlePause}
          handleClose={handleClose}
        />

        {/* Story Content */}
        <motion.div
          className="flex flex-grow items-center justify-center"
          onMouseDown={handlePause}
          onMouseUp={handleResume}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="pointer-events-none h-full">
            <img
              src={content}
              alt="Story Content"
              className="h-full w-full object-contain"
            />
          </div>
        </motion.div>

        {/* Footer */}
        <UserStoryFooter
          timeToHide={timeToHide}
          isHeartClicked={isHeartClicked}
          setIsHeartClicked={setIsHeartClicked}
        />
      </motion.div>
    </div>
  );
}

export default Story;
