import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header() {
  const { user } = useContext(UserContext);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="p-4 flex justify-between items-center bg-[#00032e] shadow-lg">
      {/* Logo and Home Link */}
      <Link
        to="/"
        className="flex items-center gap-2 text-[#edbf6d] font-bold text-xl"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
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
      <nav className="flex gap-6 text-[#edbf6d] font-medium">
        <Link
          to="/"
          className={`hover:text-white transition duration-300 ${
            isActive("/") ? "text-white" : ""
          }`}
        >
          Home
        </Link>
        <Link
          to="/buy"
          className={`hover:text-white transition duration-300 ${
            isActive("/buy") ? "text-white" : ""
          }`}
        >
          Buy
        </Link>
        <Link
          to="/sell"
          className={`hover:text-white transition duration-300 ${
            isActive("/sell") ? "text-white" : ""
          }`}
        >
          Sell
        </Link>
        <Link
          to="/about"
          className={`hover:text-white transition duration-300 ${
            isActive("/about") ? "text-white" : ""
          }`}
        >
          About
        </Link>
        <Link
          to="/contacts"
          className={`hover:text-white transition duration-300 ${
            isActive("/contacts") ? "text-white" : ""
          }`}
        >
          Contacts
        </Link>
      </nav>

      {/* User Account Section */}
      <Link
        to={user ? "/account" : "/login"}
        className="flex items-center gap-2 border border-[#edbf6d] rounded-full py-2 px-4 text-[#edbf6d] hover:text-white transition duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
            clipRule="evenodd"
          />
        </svg>

        <div className="text-[#edbf6d]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {!!user && <div className="text-[#edbf6d]">{user.name}</div>}
      </Link>
    </header>
  );
}
