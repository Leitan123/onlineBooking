import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post("/login", { email, password });
      setUser(data);
      alert("Login successful");
      setRedirect(true);
    } catch (e) {
      alert("Login failed");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div
      className="flex h-screen bg-cover bg-center items-center justify-center"
      style={{ backgroundImage: "url('/images/login_bg.jpg')" }} // Replace with your image path
    >
      <div className="flex rounded-lg shadow-lg overflow-hidden w-4/5 max-w-4xl">
        {/* Left Section */}
        <div className="w-1/2 p-10 flex flex-col justify-center text-[#1a2c39]  bg-white bg-opacity-50">
          <h2 className="text-3xl font-semibold">Welcome Back</h2>
          <p className="mt-4 text-[#1a2c39]">
            Log in to access your account and continue your journey.
          </p>
        </div>

        {/* Right Section (Login Form) */}
        <div className="w-1/2 p-10 bg-white">
          <h3 className="text-2xl font-semibold text-gray-700 ">Login</h3>
          <p className="text-gray-500 mb-4">Enter your credentials below</p>
          <form className="space-y-4" onSubmit={handleLoginSubmit}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
            />
            <button
              type="submit"
              className="w-full bg-[#edbf6d] text-[#00032e] hover:bg-[#d9a856] py-3 rounded-lg font-semibold transition"
            >
              Login
            </button>
          </form>
          <p className="text-gray-500 text-sm mt-4 text-center">
            Don't have an account?{" "}
            <Link className="text-blue-500 underline" to={"/register"}>
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
