import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  MdArticle,
  MdAutoStories,
  MdCardGiftcard,
  MdEventAvailable,
  MdHome,
  MdLogout,
  MdMemory,
  MdOutlineWork,
  MdSettings,
} from "react-icons/md";
import { useAuth } from "../auth/authContext";
import { cn } from "../utils/helpers";

const navItems = [
  { to: "/admin/projects", label: "Projects", icon: MdOutlineWork },
  { to: "/admin/blogs", label: "Blogs", icon: MdArticle },
  { to: "/admin/goodies", label: "Goodies", icon: MdCardGiftcard },
  { to: "/admin/tech-stack", label: "Tech Stack", icon: MdMemory },
  { to: "/admin/stories", label: "Stories", icon: MdAutoStories },
  { to: "/admin/work-status", label: "Work Status", icon: MdEventAvailable },
  { to: "/admin/settings", label: "Settings", icon: MdSettings },
];

function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-primary-900 text-gray-100">
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(71,85,105,0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(71,85,105,0.22) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 0% 0%, #000 35%, transparent 90%)",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 0% 0%, #000 35%, transparent 90%)",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-4 px-4 py-4 md:flex-row md:py-6">
        <aside className="md:sticky md:top-6 md:h-[calc(100dvh-3rem)] md:w-64 md:shrink-0">
          <div className="flex h-full flex-col rounded-3xl border border-slate-700/40 bg-primary-900/70 p-4 shadow-xl backdrop-blur-md">
            <div className="mb-5 rounded-2xl border border-slate-700/40 bg-primary-800/40 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-200/80">
                Admin
              </p>
              <p className="mt-1 text-xl font-bold text-gray-50">BekauriDev</p>
              <p className="mt-2 truncate text-xs text-gray-400">{user?.email}</p>
            </div>

            <nav className="grid gap-2 md:flex-1 md:auto-rows-max">
              <NavLink
                to="/"
                className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-gray-300 transition hover:bg-primary-800/50 hover:text-primary-100"
              >
                <MdHome size={18} /> Public site
              </NavLink>
              {navItems.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition",
                      isActive
                        ? "bg-primary-400/20 text-primary-50 ring-1 ring-primary-400/30"
                        : "text-gray-300 hover:bg-primary-800/50 hover:text-primary-100"
                    )
                  }
                >
                  <Icon size={18} /> {label}
                </NavLink>
              ))}
            </nav>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-4 flex items-center gap-3 rounded-xl border border-slate-700/50 px-3 py-2 text-sm font-semibold text-gray-300 transition hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-200"
            >
              <MdLogout size={18} /> Logout
            </button>
          </div>
        </aside>

        <main className="min-w-0 flex-1 pb-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
