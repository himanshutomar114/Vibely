import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, HomeIcon, UsersIcon } from "lucide-react";

const Sidebar = () => {
  // Get authenticated user info
  const { authUser } = useAuthUser();

  // Get the current route path to highlight active nav item
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="w-72 bg-base-100 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0 shadow-lg rounded-r-3xl overflow-hidden">
      {/* LOGO SECTION */}
      <div className="p-6 border-b border-base-300">
        <Link to="/" className="flex items-center gap-3">
          <img src="/vibelylogo.png" alt="Vibely logo" className="w-10 h-10 object-cover" />
          <span className="text-3xl font-extrabold font-mono bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text tracking-wide">
            Vibely
          </span>
        </Link>
      </div>

      {/* NAVIGATION MENU */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <Link
          to="/"
          className={`flex items-center gap-4 px-4 py-3 rounded-xl text-base transition-all font-medium
            ${currentPath === "/" ? "bg-primary text-primary-content shadow-md" : "hover:bg-base-200 text-base-content"}
          `}
        >
          <HomeIcon className="size-5" />
          <span>Home</span>
        </Link>

        <Link
          to="/friends"
          className={`flex items-center gap-4 px-4 py-3 rounded-xl text-base transition-all font-medium
            ${currentPath === "/friends" ? "bg-primary text-primary-content shadow-md" : "hover:bg-base-200 text-base-content"}
          `}
        >
          <UsersIcon className="size-5" />
          <span>Friends</span>
        </Link>

        <Link
          to="/notifications"
          className={`flex items-center gap-4 px-4 py-3 rounded-xl text-base transition-all font-medium
            ${currentPath === "/notifications" ? "bg-primary text-primary-content shadow-md" : "hover:bg-base-200 text-base-content"}
          `}
        >
          <BellIcon className="size-5" />
          <span>Notifications</span>
        </Link>
      </nav>

      {/* USER PROFILE SECTION */}
      <div className="p-5 border-t border-base-300 bg-base-100">
        <div className="flex items-center gap-4">
          {/* Profile Picture */}
          <div className="avatar">
            <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={authUser?.profilePic} alt="User Avatar" />
            </div>
          </div>

          {/* User Name & Status */}
          <div className="flex-1">
            <p className="font-semibold text-sm">{authUser?.fullName}</p>
            <p className="text-xs text-success flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-success inline-block animate-pulse" />
              Online
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
