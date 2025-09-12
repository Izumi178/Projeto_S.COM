import lightLogo from "../assets/unesp_light.png";
import darkLogo from "../assets/unesp_dark.png";
import { useState } from "react";
import { UserIcon } from "@heroicons/react/16/solid";
import { EnvelopeIcon } from "@heroicons/react/16/solid";
import { Cog6ToothIcon } from "@heroicons/react/16/solid";

type NavBarProps = {
  changePage: React.Dispatch<React.SetStateAction<string>>;
  activePage: string;
};
const selectedButton =
  "px-[7px] sm:px-[20px] md:px-[15px] py-[20px] flex flex-shrink-0 flex-row whitespace-nowrap sm:text-lg md:text-xl w-fit underline items-center text-white dark:text-black rounded-full font-bold cursor-pointer gap-[7px]";
const unselectedButton =
  "px-[7px] sm:px-[20px] md:px-[15px] py-[20px] flex flex-shrink-0 flex-row whitespace-nowrap sm:text-lg md:text-xl w-fit items-center text-white dark:text-black rounded-full font-bold cursor-pointer gap-[7px] transition duration-200 ease-in-out hover:underline";

const items = ["Meus Dados", "Mensagens", "Configurações"];
const iconCustomiztion = "text-(--bg-color) w-[15px] sm:w-[20px]";
function NavBar({ changePage, activePage }: NavBarProps) {
  return (
    <div className="p-[15px] sm:p-[30px] md:px-[35px] flex flex-row h-[100px] w-full md:max-w-[900px] md:rounded-full bg-(--primary-color) shadow-xl justify-between items-center gap-[2px] md:gap-x-[40px] transition: duration-400 hover:scale-y-110 md:hover:scale-110 hover:-translate-y-[10px]">
      <img
        src={darkLogo}
        className="h-[80px] sm:h-[100px] md:h-[130px] hidden dark:block"
      ></img>
      <img
        src={lightLogo}
        className="h-[80px] sm:h-[100px] md:h-[130px] dark:hidden"
      ></img>
      <div className="flex flex-row w-fit h-100% justify-start items-center text-(--bg-color)  md:gap-[4px]">
        {items.map((item) => (
          <button
            type="button"
            className={item === activePage ? selectedButton : unselectedButton}
            onClick={() => {
              changePage(item);
            }}
          >
            {item === "Meus Dados" ? (
              <UserIcon className={iconCustomiztion} />
            ) : item === "Mensagens" ? (
              <EnvelopeIcon className={iconCustomiztion} />
            ) : (
              <Cog6ToothIcon className={iconCustomiztion} />
            )}
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default NavBar;
