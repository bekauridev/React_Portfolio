import { useEffect, useState } from "react";

const STORY_OPENED_PREFIX = "StoryOpened:";

function getStoryOpenedKey(storyKey) {
  return storyKey ? `${STORY_OPENED_PREFIX}${storyKey}` : null;
}

export default function useStory(storyKey) {
  const [isStoryOpen, setStoryOpen] = useState(false);

  // User avatar border state
  const [isStoryOpened, setIsStoryOpened] = useState(false);

  useEffect(() => {
    const storageKey = getStoryOpenedKey(storyKey);
    setIsStoryOpened(storageKey ? localStorage.getItem(storageKey) === "true" : false);
  }, [storyKey]);

  const handleStoryOpen = () => {
    setStoryOpen(true);
    const storageKey = getStoryOpenedKey(storyKey);
    if (storageKey) {
      setIsStoryOpened(true);
      localStorage.setItem(storageKey, "true");
    }
    window.location.hash = "#story"; // Set hash in URL
  };

  const handleStoryClose = () => {
    setStoryOpen(false);
    window.location.hash = ""; // Remove hash from URL
  };

  useEffect(() => {
    // Function to check the hash and update state
    const checkHash = () => {
      if (window.location.hash === "#story") {
        setStoryOpen(true);
        const storageKey = getStoryOpenedKey(storyKey);
        if (storageKey) {
          setIsStoryOpened(true);
          localStorage.setItem(storageKey, "true");
        }
        // Remove scrollbar when story is open
        document.body.style.overflow = "hidden";
      } else {
        setStoryOpen(false);
        document.body.style.overflow = "";
      }
    };

    // Check hash on initial render
    checkHash();

    // Add event listener for hash changes
    window.addEventListener("hashchange", checkHash);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("hashchange", checkHash);
    };
  }, [storyKey]);

  return { isStoryOpen, handleStoryOpen, handleStoryClose, isStoryOpened };
}
