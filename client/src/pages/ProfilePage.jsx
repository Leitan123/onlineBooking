import { useContext, useState } from "react";
import { UserContext } from "../UserContext.jsx";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage.jsx";
import AccountNav from "../AccountNav.jsx";

export default function ProfilePage() {
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage = "profile" } = useParams();
  const [redirect, setRedirect] = useState(null);

  async function logout() {
    try {
      await axios.post("/logout");
      setRedirect("/");
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  if (!ready) {
    return "loading...";
  }
  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="mb-8">
      <AccountNav />
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto bg-white/20 p-6 rounded-xl shadow-lg backdrop-blur-md">
          {/* Avatar and Name */}
          <div className="mb-4 flex justify-center items-center">
            <div className="w-24 h-24 bg-[#edbf6d] text-[#00032e] flex items-center justify-center text-3xl font-semibold rounded-full">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-white">{user.name}</h2>
          <p className="text-sm text-white/80">{user.email}</p>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="mt-4 bg-[#edbf6d] text-[#00032e] px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:bg-[#d9a856] shadow-md"
          >
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
}
