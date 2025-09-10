import {
  MoonIcon,
  LanguageIcon,
  PaintBrushIcon,
} from "@heroicons/react/16/solid";

function Preferences() {
  const colorSelector = document.getElementById("color");
  colorSelector?.addEventListener("input", (event) => {
    const target = event.target as HTMLInputElement;
    document.documentElement.style.setProperty("--primary-color", target.value);
  });
  return (
    <ul>
      <li>
        <div className="flex flex-row items-center min-w-[476px] md:min-w-[700px] lg:min-w-[1000px] xl:min-w-[1200px] 2x:min-w-[1500px] h-auto px-[30px] py-[10px] shadow-md justify-between">
          <div className="flex flex-row items-center w-fit h-auto gap-x-[10px] whitespace-nowrap">
            <MoonIcon className="w-[30px] text-(--primary-color)" />
            <h3 className="text-xl text-(--primary-color) font-bold">
              Ativar modo noturno
            </h3>
          </div>
          <div className="flex flex-row h-[20px] w-[50px] bg-gray-200 rounded-full items-center justify-start">
            <button className="h-[20px] w-[20px] rounded-full bg-(--primary-color) z-1000"></button>
          </div>
        </div>
      </li>
      <li>
        <div className="flex flex-row items-center h-auto px-[30px] py-[10px] shadow-md justify-between">
          <div className="flex flex-row items-center w-fit h-auto gap-x-[10px] whitespace-nowrap">
            <LanguageIcon className="w-[30px] text-(--primary-color)" />
            <h3 className="text-xl text-(--primary-color) font-bold">Idioma</h3>
          </div>
          <div className="px-[6px] py-[2px] bg-gray-200 font-lg  font-bold w-fit rounded-md justify-center items-center">
            <select>
              <option>Português</option>
              <option>Inglês</option>
            </select>
          </div>
        </div>
      </li>
      <li>
        <div className="flex flex-row items-center min-w-[400px] md:min-w-[700px] h-auto px-[30px] py-[10px] shadow-md justify-between">
          <div className="flex flex-row items-center w-fit h-auto gap-x-[10px] whitespace-nowrap">
            <PaintBrushIcon className="w-[30px] text-(--primary-color)" />
            <h3 className="text-xl text-(--primary-color) font-bold">Tema</h3>
          </div>
          <div className="px-[6px] py-[2px] bg-gray-200 font-lg  font-bold w-fit rounded-md justify-center items-center">
            <input type="color"></input>
          </div>
        </div>
      </li>
    </ul>
  );
}

export default Preferences;
