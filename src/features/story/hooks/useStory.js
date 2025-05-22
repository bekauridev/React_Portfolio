import { useEffect, useState } from "react";

export default function useStory() {
  const [isStoryOpen, setStoryOpen] = useState(false);

  // User avatar border state
  const [isStoryOpened, setIsStoryOpened] = useState(() => {
    const storedValue = localStorage.getItem("StoryOpened");
    // Converts to boolean
    return storedValue === "true";
  });

  const handleStoryOpen = () => {
    setStoryOpen(true);
    setIsStoryOpened(true);
    localStorage.setItem("StoryOpened", true);
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
  }, []);

  return { isStoryOpen, handleStoryOpen, handleStoryClose, isStoryOpened };
}
