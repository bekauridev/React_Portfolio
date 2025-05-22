import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Function to scroll to the top of the page (used in App.jsx)
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll to the top
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
