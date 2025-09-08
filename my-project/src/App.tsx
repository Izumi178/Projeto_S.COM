import { useState } from "react";
import NavBar from "./components/navBar";
import ImageSlider from "./components/slider";

function App() {
  const [activePage, changePage] = useState("Meus dados");
  return (
    <div className="flex flex-col w-full h-full items-center">
      <div className="w-full h-100">
        <ImageSlider />
      </div>
      <div className="w-full flex justify-center mt-[-2rem]">
        <NavBar changePage={changePage} />
      </div>
      <h1>{activePage}</h1>
    </div>
  );
}

export default App;
