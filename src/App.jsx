import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            {/* <Route path="projects" element={<Projects />} /> */}
            {/* <Route path="blog" element={<Blog />} /> */}
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
