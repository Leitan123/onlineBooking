import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header() {
  const { user } = useContext(UserContext);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="py-5 px-8 flex justify-between items-center bg-[#1a2c39] shadow-lg text-white">
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center gap-2 text-[#edbf6d] font-bold text-2xl"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
          />
        </svg>
        <span>Booker</span>
      </Link>

      {/* Navigation Links */}
      <nav className="flex gap-8 text-lg">
        {[
          "Home",
          "About Us",
          "Properties",
          "Agencies",
          "Pages",
          "Blog",
          "Contact Us",
        ].map((item, index) => (
          <Link
            key={index}
            to={`/${item.toLowerCase().replace(/\s+/g, "")}`}
            className={`hover:text-[#edbf6d] transition duration-300 ${
              isActive(`/${item.toLowerCase().replace(/\s+/g, "")}`)
                ? "text-[#edbf6d]"
                : ""
            }`}
          >
            {item}
          </Link>
        ))}
      </nav>

      {/* User Account Section */}
      <Link
        to={user ? "/account" : "/login"}
        className="flex items-center gap-2 bg-[#edbf6d] text-[#00032e] font-medium px-5 py-3 rounded-lg hover:bg-[#d9a856] transition duration-300"
      >
        {user ? user.name : "Login"}
      </Link>
    </header>
  );
}
