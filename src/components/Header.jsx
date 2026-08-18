import { NavLink, Link, useNavigate } from "react-router-dom";
import { FiPlus, FiLogOut } from "react-icons/fi";
import toast from "react-hot-toast";

const navItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Analytics", path: "/analitics" },
  { name: "Links", path: "/links" },
];

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("auth");
    toast.success("Berhasil logout");
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex items-center justify-between h-16 px-8 border-b border-gray-200">
      {/* Left: Logo + Nav */}
      <div className="flex items-center gap-10">
        <h1 className="text-2xl font-black tracking-tighter">ShortLink</h1>

        <nav className="flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-medium pb-1 border-b-2 transition-colors ${
                  isActive
                    ? "text-blue-600 border-blue-600"
                    : "text-gray-400 border-transparent hover:text-gray-600"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-5">
        <Link
          to={"/create-link"}
          className="flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
        >
          <FiPlus className="w-4 h-4" />
          Create New Link
        </Link>

        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
          <img
            src="/#"
            alt="User avatar"
            className="w-full h-full object-cover"
          />
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <FiLogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
