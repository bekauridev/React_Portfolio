import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./authContext";

function RequireAdmin({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-primary-900 px-4 text-gray-300">
        <div className="rounded-3xl border border-slate-700/40 bg-primary-900/60 px-6 py-5 shadow-xl">
          Restoring admin session...
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default RequireAdmin;
