import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import SignIn from "./pages/signIn.tsx";
import Login from "./pages/login";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SignIn />
  </StrictMode>
);
