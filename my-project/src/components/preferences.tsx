import {
  MoonIcon,
  LanguageIcon,
  PaintBrushIcon,
} from "@heroicons/react/16/solid";

function Preferences() {
  return (
    <ul>
      <li>
        <div className="flex flex-row items-center min-w-[1000px] h-auto px-[30px] py-[10px] shadow-md justify-between">
          <div className="flex flex-row items-center w-fit h-auto gap-x-[10px] whitespace-nowrap">
            <MoonIcon className="w-[30px] text-sky-500" />
            <h3 className="text-xl text-sky-500 font-bold">
              Ativar modo noturno
            </h3>
          </div>
          <div className="flex flex-row h-[20px] w-[50px] bg-gray-200 rounded-full items-center justify-start">
            <button className="h-[20px] w-[20px] rounded-full bg-sky-500 z-1000"></button>
          </div>
        </div>
      </li>
      <li>
        <div className="flex flex-row items-center min-w-[1000px] h-auto px-[30px] py-[10px] shadow-md justify-between">
          <div className="flex flex-row items-center w-fit h-auto gap-x-[10px] whitespace-nowrap">
            <LanguageIcon className="w-[30px] text-sky-500" />
            <h3 className="text-xl text-sky-500 font-bold">Idioma</h3>
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
        <div className="flex flex-row items-center min-w-[1000px] h-auto px-[30px] py-[10px] shadow-md justify-between">
          <div className="flex flex-row items-center w-fit h-auto gap-x-[10px] whitespace-nowrap">
            <PaintBrushIcon className="w-[30px] text-sky-500" />
            <h3 className="text-xl text-sky-500 font-bold">Tema</h3>
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
