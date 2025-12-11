import { Suspense, lazy, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import useTopLoadingBar from "./hooks/useTopLoadingBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const AppLayout = lazy(() => import("./layouts/AppLayout"));
const HomePage = lazy(() => import("./pages/HomePage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Projects = lazy(() => import("./pages/ProjectsPage"));
const ProjectDetails = lazy(() => import("./pages/ProjectsDetailsPage"));
const GoodiesPage = lazy(() => import("./pages/GoodiesPage"));
const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <LoaderWrapper />
        <ReactQueryDevtools initialIsFetching={false} />
      </QueryClientProvider>
    </Router>
  );
}

function LoaderWrapper() {
  const location = useLocation();
  const { ref, start, complete } = useTopLoadingBar();
  const navigate = useNavigate();
  const hasStartedRef = useRef(false);
  const navigationTimeout = useRef(null);
  const NAV_DELAY = 450; // milliseconds to show the bar before routing

  useEffect(() => {
    const triggerStart = () => {
      if (hasStartedRef.current) return;
      hasStartedRef.current = true;
      start();
    };

    const handleAnchorClick = (event) => {
      const anchor = event.target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      const target = anchor.getAttribute("target");
      const rel = anchor.getAttribute("rel") || "";
      const isModified =
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0;

      if (isModified || target === "_blank" || rel.includes("external") || !href) return;
      if (href.startsWith("http") && !href.startsWith(window.location.origin)) return;

      const url = new URL(href, window.location.origin);
      const path = `${url.pathname}${url.search}${url.hash}`;

      event.preventDefault();
      triggerStart();
      clearTimeout(navigationTimeout.current);
      navigationTimeout.current = setTimeout(() => {
        navigate(path);
      }, NAV_DELAY);
    };

    const handlePopState = () => triggerStart();

    window.addEventListener("click", handleAnchorClick, true);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("click", handleAnchorClick, true);
      window.removeEventListener("popstate", handlePopState);
      clearTimeout(navigationTimeout.current);
    };
  }, [navigate, start]);

  useEffect(() => {
    const finish = () => {
      hasStartedRef.current = false;
      complete();
    };

    finish();

    return () => {
      clearTimeout(navigationTimeout.current);
    };
  }, [complete, location.pathname]);

  return (
    <>
      <LoadingBar
        color="rgba(var(--primary-400))"
        height={1.5}
        shadow={true}
        ref={ref}
        transitionTime={200}
        waitingTime={500} // Add waitingTime to prevent quick flashes
      />

      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:slug" element={<ProjectDetails />} />
            <Route path="goodies" element={<GoodiesPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
