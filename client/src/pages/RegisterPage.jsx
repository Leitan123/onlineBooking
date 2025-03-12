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
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32">
        <h1 className="text-4xl text-center">Register</h1>
        <form className="max-w-md mx-auto mt-4" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
            <button
              type="button"
              className="absolute right-2 top-3 bg-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁"}
            </button>
          </div>
          <button className="primary">Register</button>
        </form>

        <div className="text-center py-2 text-gray-500">
          Already have an account?{" "}
          <Link className="underline text-black" to={"/login"}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
