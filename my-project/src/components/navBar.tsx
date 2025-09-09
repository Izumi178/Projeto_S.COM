import lightLogo from "../assets/unesp_light.png";
import { useState } from "react";
import { UserIcon } from "@heroicons/react/16/solid";
import { EnvelopeIcon } from "@heroicons/react/16/solid";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/16/solid";

type NavBarProps = {
  changePage: React.Dispatch<React.SetStateAction<string>>;
  activePage: string;
};

const selectedButton =
  "px-[30px] py-[20px] flex flex-shrink-0 flex-row whitespace-bowrap text-lg md:text-xl w-fit items-center text-white rounded-full font-bold cursor-pointer gap-[7px] bg-sky-400";
const unselectedButton =
  "px-[30px] py-[20px] flex flex-shrink-0 flex-row whitespace-bowrap text-lg md:text-xl w-fit items-center text-white rounded-full font-bold cursor-pointer gap-[7px] transition duration-200 ease-in-out hover:bg-sky-400";

const items = ["Meus Dados", "Mensagens", "Configurações"];
const iconCustomiztion = "text-white w-[20px]";
function NavBar({ changePage, activePage }: NavBarProps) {
  const logo = lightLogo;
  return (
    <div className="p-[30px] md:px-[40px] flex flex-row h-[100px] w-full md:w-fit md:rounded-full bg-sky-500 shadow-xl justify-between items-center gap-x-[40px] transition: duration-400 hover:scale-y-110 md:hover:scale-110 hover:-translate-y-[10px]">
      <img src={logo} className="h-[130px] max-h-[130px]"></img>
      <div className="flex flex-row w-fit h-100% justify-start items-center  gap-[4px]">
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
              <AdjustmentsHorizontalIcon className={iconCustomiztion} />
            )}
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default NavBar;
