import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserContextProvider } from "./UserContext.jsx"; // ✅ Ensure it's a named import
// ✅ Ensure correct import

const clientId =
  "327279191024-0cfvqg6aretuvh226psv0v44i6jh5h7u.apps.googleusercontent.com"; // 🔹 Replace with your actual Google Client ID

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <UserContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserContextProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
