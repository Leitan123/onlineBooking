import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useContext } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { UserContext } from "../UserContext"; // Adjust path based on location
import { initializeApp } from "firebase/app";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsBU1SaLF6jgdcObnz8xST6W_vXjbKTCc",
  authDomain: "mernapp-22281.firebaseapp.com",
  projectId: "mernapp-22281",
  storageBucket: "mernapp-22281.firebasestorage.app",
  messagingSenderId: "543758201576",
  appId: "1:543758201576:web:06acbfedd393ade01c8f5d",
  measurementId: "G-HK713ZS26Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function RegisterPage() {
  const { setUser } = useContext(UserContext); // Access UserContext
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await axios.post("http://localhost:4000/register", {
        name,
        email,
        password,
      });
      alert("Registration successful!");
      navigate("/login");
    } catch (e) {
      alert("Registration failed!");
    }
  }

  return (
    <div
      className="flex h-screen bg-cover bg-center items-center justify-center"
      style={{ backgroundImage: "url('/images/login_bg.jpg')" }} // Replace with your image path
    >
      <div className="flex rounded-lg shadow-lg overflow-hidden w-4/5 max-w-4xl">
        {/* Left Section */}
        <div className="w-1/2 p-10 flex flex-col justify-center text-[#1a2c39] bg-white bg-opacity-50">
          <h2 className="text-3xl font-semibold">Create an Account</h2>
          <p className="mt-4 text-[#1a2c39]">
            Sign up to enjoy our services and get started.
          </p>
        </div>

        {/* Right Section (Registration Form) */}
        <div className="w-1/2 p-10 bg-white">
          <h3 className="text-2xl font-semibold text-gray-700">Register</h3>
          <p className="text-gray-500 mb-4">Enter your details below</p>
          <form className="space-y-4" onSubmit={registerUser}>
            <input
              type="text"
              placeholder="Username"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3"
              />
              <button
                type="button"
                className="absolute right-2 top-3 bg-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-[#edbf6d] text-[#00032e] hover:bg-[#d9a856] py-3 rounded-lg font-semibold transition"
            >
              Register
            </button>
          </form>
          <p className="text-gray-500 text-sm mt-4 text-center">
            Already have an account?{" "}
            <Link className="text-blue-500 underline" to={"/login"}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
