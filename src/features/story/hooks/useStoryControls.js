import { useState, useEffect, useRef, useCallback } from "react";
import { animate, useMotionValue } from "framer-motion";

import { useKeyListener } from "../../../hooks/useKeyListener";

export function useStoryControls(isStoryOpen, onStoryClose) {
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [timeToHide, setTimeToHide] = useState(false);

  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const storyRef = useRef(null);
  const y = useMotionValue(0);

  const handleClose = useCallback(async () => {
    await animate("#storyContainer", {
      scale: 0.8,
      opacity: 0,
      transition: { duration: 0.3 },
    });

    onStoryClose();
    setIsPaused(false);
    setProgress(0);
  }, [onStoryClose]);

  useKeyListener(() => {
    if (isStoryOpen) handleClose();
  }, "Escape");

  const handlePause = () => setIsPaused(true);
  const handleResume = () => setIsPaused(false);

  const handleTouchStart = useCallback(() => {
    intervalRef.current = setTimeout(() => {
      setTimeToHide(true);
      setIsPaused(true);
    }, 500);
  }, []);

  const handleTouchEnd = useCallback(() => {
    clearTimeout(intervalRef.current);
    setTimeToHide(false);
    setIsPaused(false);
  }, []);

  useEffect(() => {
    if (!isStoryOpen) {
      setProgress(0);
      return;
    }
    if (isPaused) return;

    let interval;
    const storyEndTime = 100;

    interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= storyEndTime) {
          clearInterval(interval);
          timeoutRef.current = setTimeout(handleClose, 0);
          return storyEndTime;
        }
        return prev + 1;
      });
    }, 50);

    return () => {
      clearInterval(interval);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isStoryOpen, isPaused, handleClose]);

  const handleClickOutside = useCallback(
    (e) => {
      if (storyRef.current && !storyRef.current.contains(e.target)) {
        handleClose();
      }
    },
    [handleClose]
  );

  return {
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
  };
}
