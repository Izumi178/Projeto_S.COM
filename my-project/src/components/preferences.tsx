import {
  MoonIcon,
  LanguageIcon,
  PaintBrushIcon,
} from "@heroicons/react/16/solid";

function Preferences() {
  function setMode() {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }
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
          <div className="flex flex-row h-[20px] w-[50px] bg-(--forms-bg-light) dark:bg-(--forms-bg-dark) rounded-full items-center justify-start dark:justify-end ">
            <button
              id="mode"
              className="h-[20px] w-[20px] rounded-full bg-(--primary-color) z-1000"
              onClick={setMode}
            ></button>
          </div>
        </div>
      </li>
      <li>
        <div className="flex flex-row items-center h-auto px-[30px] py-[10px] shadow-md justify-between">
          <div className="flex flex-row items-center w-fit h-auto gap-x-[10px] whitespace-nowrap">
            <LanguageIcon className="w-[30px] text-(--primary-color)" />
            <h3 className="text-xl text-(--primary-color) font-bold">Idioma</h3>
          </div>
          <div className="px-[8px] py-[2px] bg-(--forms-bg-light) dark:bg-(--forms-bg-dark) font-lg text-(--primary-color) font-bold w-fit rounded-md justify-center items-center">
            <select>
              <option>Português</option>
              <option>Inglês</option>
            </select>
          </div>
        </div>
      </li>
    </ul>
  );
}

export default Preferences;
