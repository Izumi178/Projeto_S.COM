import { useState } from "react";
import NavBar from "./components/navBar";
import ImageSlider from "./components/slider";
import MyData from "./components/myData";
import Settings from "./components/settings";

function App() {
  const [activePage, changePage] = useState("Meus Dados");
  return (
    <div className="flex flex-col w-full h-full items-center">
      <div className="w-full h-[200px] md:h-[400px]">
        <ImageSlider />
      </div>
      <div className="w-full flex justify-center mt-[-2rem]">
        <NavBar changePage={changePage} activePage={activePage} />
      </div>
      <div className="h-[50px]" />
      {activePage === "Meus Dados" && <MyData></MyData>}
      {activePage === "Configurações" && <Settings></Settings>}
    </div>
  );
}

export default App;
