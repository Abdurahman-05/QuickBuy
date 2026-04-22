import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Global utility component that scrolls the window to top (0,0) 
 * whenever the route path changes. Standard UX for modern SPAs.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // We use 'instant' behavior for high-quality, professional page resets
    // smoothly handling the transition visually via CSS animations instead.
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}
