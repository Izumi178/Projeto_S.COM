import { MoonIcon, BoldIcon } from "@heroicons/react/16/solid";

function Preferences() {
  function setMode() {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }
  function resizeFont() {
    if (document.documentElement.classList.contains("big")) {
      document.documentElement.classList.remove("big");
    } else {
      document.documentElement.classList.add("big");
    }
  }
  return (
    <ul>
      <li>
        <div className="flex flex-row items-center min-w-[300px] sm:min-w-[600px] md:min-w-[720px] lg:min-w-[1000px] xl:min-w-[1200px] 2xl:min-w-[1424px] h-auto px-[30px] py-[10px] shadow-md justify-between">
          <div className="flex flex-row items-center w-fit h-auto gap-x-[5px] sm:gap-x-[10px] whitespace-nowrap">
            <MoonIcon className="w-[20px] sm:w-[30px] text-(--primary-color)" />
            <h3 className="text-sm sm:text-xl text-(--primary-color) font-bold">
              Ativar modo noturno
            </h3>
          </div>
          <div className="flex flex-row h-[15px] w-[40px] sm:h-[20px] sm:w-[50px] bg-(--forms-bg-light) dark:bg-(--forms-bg-dark) rounded-full items-center justify-start dark:justify-end ">
            <button
              className="h-[15px] w-[15px] sm:h-[20px] sm:w-[20px] rounded-full bg-(--primary-color) z-1000"
              onClick={setMode}
            ></button>
          </div>
        </div>
      </li>
      <li>
        <div className="flex flex-row items-center min-w-[300px] sm:min-w-[600px] md:min-w-[720px] lg:min-w-[1000px] xl:min-w-[1200px] 2xl:min-w-[1424px] h-auto px-[30px] py-[10px] shadow-md justify-between">
          <div className="flex flex-row items-center w-fit h-auto gap-x-[5px] sm:gap-x-[10px] whitespace-nowrap">
            <BoldIcon className="w-[20px] sm:w-[30px] text-(--primary-color)" />
            <h3 className="text-sm sm:text-xl text-(--primary-color) font-bold">
              Aumentar tamanho da fonte
            </h3>
          </div>
          <div className="flex flex-row h-[15px] w-[40px] sm:h-[20px] sm:w-[50px] bg-(--forms-bg-light) dark:bg-(--forms-bg-dark) rounded-full items-center justify-start big:justify-end">
            <button
              className="h-[15px] w-[15px] sm:h-[20px] sm:w-[20px] rounded-full bg-(--primary-color) z-1000"
              onClick={resizeFont}
            ></button>
          </div>
        </div>
      </li>
    </ul>
  );
}

export default Preferences;
