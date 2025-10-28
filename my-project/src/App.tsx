import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import SignIn from "./pages/signIn";
import AdminPage from "./pages/admin";
import ForgotPassword from "./pages/forgotPassword";
import UpdatePassword from "./pages/newPassword";

function App() {
  if (localStorage.getItem("dark") !== null) {
    document.documentElement.classList.add("dark");
  }
  if (localStorage.getItem("big") !== null) {
    document.documentElement.classList.add("big");
  }
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/updatePassword" element={<UpdatePassword />} />
    </Routes>
  );
}

export default App;
