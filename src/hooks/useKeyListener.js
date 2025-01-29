import { useEffect } from "react";
// helper function to listen keystrokes and trigger a callback
export const useKeyListener = (callback, key) => {
  useEffect(() => {
    // Define the keydown event listener
    const handleKeyDown = (event) => {
      if (event.key === key) {
        callback(); // Trigger the callback when the specified key is pressed
      }
    };

    // Add the event listener when the component is mounted
    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [callback, key]); // Depend on callback and key
};
