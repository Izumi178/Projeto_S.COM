import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import SignIn from "./pages/signIn";
import AdminPage from "./pages/admin";
import ForgotPassword from "./pages/forgotPassword";

function App() {
  //Verifica se os modo dark e o modo de fonte aumentada estavam configurados
  if (localStorage.getItem("dark") !== null) {
    document.documentElement.classList.add("dark");
  }
  if (localStorage.getItem("big") !== null) {
    document.documentElement.classList.add("big");
  }
  return (
    //Rotas das páginas
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
    </Routes>
  );
}

export default App;
