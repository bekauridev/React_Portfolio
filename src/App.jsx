import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import useTopLoadingBar from "./hooks/useTopLoadingBar";

const AppLayout = lazy(() => import("./layouts/AppLayout"));
const HomePage = lazy(() => import("./pages/HomePage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Projects = lazy(() => import("./pages/ProjectsPage"));
const ProjectDetails = lazy(() => import("./pages/ProjectsDetailsPage"));

function App() {
  return (
    <Router>
      <LoaderWrapper />
    </Router>
  );
}

function LoaderWrapper() {
  const location = useLocation();
  const { ref, start, complete } = useTopLoadingBar();

  useEffect(() => {
    let timeout;

    const handleStart = () => {
      start();
      timeout = setTimeout(complete, 700);
    };

    const handleComplete = () => {
      clearTimeout(timeout);
      complete();
    };

    handleStart();

    // This will complete when the component unmounts (new route loaded)
    return handleComplete;
  }, [location.pathname]);

  return (
    <>
      <LoadingBar
        color="rgba(var(--primary-400))"
        height={1.5}
        shadow={true}
        ref={ref}
        transitionTime={200}
        waitingTime={400} // Add waitingTime to prevent quick flashes
      />

      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:slug" element={<ProjectDetails />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
