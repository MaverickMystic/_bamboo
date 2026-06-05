import { NavLink, Outlet, useNavigate } from "react-router";
import {
  PenSquare,
  Newspaper,
  Tags,
  LogOut,
  Leaf,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { api } from "../utils/api";
const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
    isActive
      ? "bg-emerald-600 text-white shadow-sm"
      : "text-stone-600 hover:bg-emerald-50 hover:text-emerald-800",
  ].join(" ");

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await api.post("/logout");
    } catch (error) {
      console.error(error);
    } finally {
      logout();
      navigate("/login", { replace: true });
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-emerald-50/40 to-stone-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-emerald-100 bg-white shadow-sm">
        <div className="border-b border-emerald-50 px-4 py-5">
          <div className="flex items-center gap-2 font-semibold text-stone-900">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white">
              <Leaf className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <div className="text-sm">Bamboo Admin</div>
              <div className="text-xs font-normal text-stone-500">
                Japanese Language School
              </div>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          <NavLink to="/admin" className={navLinkClass}>
            <PenSquare size={18} />
            Post editor
          </NavLink>

          <NavLink to="/admin/blog_management" className={navLinkClass}>
            <Newspaper size={18} />
            Blog posts
          </NavLink>

          <NavLink to="/admin/category" className={navLinkClass}>
            <Tags size={18} />
            Categories
          </NavLink>
        </nav>

        <div className="space-y-2 border-t border-emerald-50 p-3">
          <a
            href="/blog"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-stone-600 hover:bg-emerald-50 hover:text-emerald-800"
          >
            <ExternalLink size={16} />
            View public blog
          </a>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-stone-600 hover:bg-red-50 hover:text-red-700"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="pl-64">
        <header className="sticky top-0 z-30 border-b border-emerald-100 bg-white/80 px-8 py-4 backdrop-blur">
          <h1 className="text-lg font-semibold text-stone-900">
            Administration
          </h1>
          <p className="text-sm text-stone-500">
            Manage lessons, posts, and site content.
          </p>
        </header>

        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
