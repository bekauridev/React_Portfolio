import { Navigate, Route, Routes } from "react-router-dom";
import AuthProvider from "../auth/AuthProvider";
import RequireAdmin from "../auth/RequireAdmin";
import AdminLayout from "./AdminLayout";
import AdminLogin from "./AdminLogin";
import ProjectsList from "./projects/ProjectsList";
import ProjectForm from "./projects/ProjectForm";
import BlogsList from "./blogs/BlogsList";
import BlogForm from "./blogs/BlogForm";
import GoodiesList from "./goodies/GoodiesList";
import GoodieForm from "./goodies/GoodieForm";
import TechStackList from "./tech-stack/TechStackList";
import TechStackForm from "./tech-stack/TechStackForm";
import StoriesList from "./stories/StoriesList";
import StoryForm from "./stories/StoryForm";
import WorkStatus from "./work-status/WorkStatus";
import Settings from "./settings/Settings";


function AdminApp() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        <Route
          element={
            <RequireAdmin>
              <AdminLayout />
            </RequireAdmin>
          }
        >
          <Route index element={<Navigate to="projects" replace />} />
          <Route path="projects" element={<ProjectsList />} />
          <Route path="projects/new" element={<ProjectForm />} />
          <Route path="projects/:id/edit" element={<ProjectForm />} />
          <Route path="blogs" element={<BlogsList />} />
          <Route path="blogs/new" element={<BlogForm />} />
          <Route path="blogs/:id/edit" element={<BlogForm />} />
          <Route path="goodies" element={<GoodiesList />} />
          <Route path="goodies/new" element={<GoodieForm />} />
          <Route path="goodies/:id/edit" element={<GoodieForm />} />
          <Route path="tech-stack" element={<TechStackList />} />
          <Route path="tech-stack/new" element={<TechStackForm />} />
          <Route path="tech-stack/:id/edit" element={<TechStackForm />} />
          <Route path="stories" element={<StoriesList />} />
          <Route path="stories/new" element={<StoryForm />} />
          <Route path="stories/:id/edit" element={<StoryForm />} />
          <Route path="work-status" element={<WorkStatus />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default AdminApp;
