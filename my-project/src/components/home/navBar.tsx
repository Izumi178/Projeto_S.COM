import lightLogo from "../../assets/unesp_light.png";
import darkLogo from "../../assets/unesp_dark.png";
import { UserIcon } from "@heroicons/react/16/solid";
import { EnvelopeIcon } from "@heroicons/react/16/solid";
import { Cog6ToothIcon } from "@heroicons/react/16/solid";

type NavBarProps = {
  changePage: React.Dispatch<React.SetStateAction<string>>;
  activePage: string;
};

const items = ["Meus Dados", "Configurações"];
const iconCustomiztion = "text-(--bg-color) w-[10px] sm:w-[20px] md:w-[30px]";
function NavBar({ changePage, activePage }: NavBarProps) {
  return (
    /*Efeitos aplicados à navBar
    - hover:scale - quando o cursor está em cima do componente ele expande;
    - hover:scale-y - quando o cursor está em cima do componente ele expande verticalmente;
    - duration-400  - determina a duracao do efeito ;
    - hover:-translate-y  - desloca o componente para cima;
    */
    <div
      className="px-[15px] sm:p-[30px] md:px-[35px] flex flex-row h-[50px] 
    md:h-[100px] w-full md:max-w-[1000px] md:rounded-full bg-(--primary-color) 
    shadow-xl justify-between items-center md:gap-x-[40px] transition: duration-400 
    hover:scale-y-110 md:hover:scale-110 hover:-translate-y-[10px]"
    >
      <img
        src={darkLogo}
        className="h-[60px] sm:h-[100px] md:h-[130px] hidden dark:block"
      ></img>
      <img
        src={lightLogo}
        className="h-[60px] sm:h-[100px] md:h-[130px] dark:hidden"
      ></img>
      <div className="flex flex-row w-fit h-100% justify-start items-center md:gap-[4px] mr-[10px] sm:mr-[40px]">
        {items.map((item) => (
          <button
            type="button"
            className={`px-[5px] sm:px-[20px] md:px-[15px] py-[20px] flex flex-shrink-0 flex-row whitespace-nowrap text-xs sm:text-lg md:text-xl lg:text-2xl big:text-lg big:sm:text-xl big:md:text-2xl big:lg:text-3xl  w-fit items-center text-white dark:text-[color:var(--bg-dark)] font-bold cursor-pointer gap-[4px] md:gap-[7px] transition duration-200 ease-in-out 
   ${item === activePage ? "underline" : "hover:underline"}`}
            onClick={() => {
              changePage(item);
            }}
          >
            {item === "Meus Dados" ? (
              <UserIcon className={iconCustomiztion} />
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
