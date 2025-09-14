import { useState } from "react";
import NavBar from "./components/navBar";
import ImageSlider from "./components/slider";
import MyData from "./components/myData";
import Settings from "./components/settings";
import Messages from "./components/message";

function App() {
  const [activePage, changePage] = useState("Meus Dados");
  return (
    <div className="flex flex-col w-full min-h-screen pb-[100px] items-center bg-white dark:bg-(--bg-dark)">
      <div className="w-full h-[200px] md:h-[400px]">
        <ImageSlider />
      </div>
      <div className="w-full flex justify-center mt-[-2rem]">
        <NavBar changePage={changePage} activePage={activePage} />
      </div>
      <div className="h-[50px]" />
      {activePage === "Meus Dados" && <MyData></MyData>}
      {activePage === "Configurações" && <Settings></Settings>}
      {activePage === "Mensagens" && <Messages></Messages>}
    </div>
  );
}

export default App;
