import lightLogo from "../assets/unesp_light.png";
import { HomeIcon } from "@heroicons/react/16/solid";
import { EnvelopeIcon } from "@heroicons/react/16/solid";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/16/solid";

type NavBarProps = {
  changePage: React.Dispatch<React.SetStateAction<string>>;
};

function menuButtons(
  func: string,
  changePage: React.Dispatch<React.SetStateAction<string>>
) {
  const iconCustomiztion = "text-white w-5 h-5";
  function icon() {
    switch (func) {
      case "Meus Dados": {
        return <HomeIcon className={iconCustomiztion}></HomeIcon>;
        break;
      }
      case "Mensagens": {
        return <EnvelopeIcon className={iconCustomiztion}></EnvelopeIcon>;
        break;
      }
      case "Configurações": {
        return (
          <AdjustmentsHorizontalIcon
            className={iconCustomiztion}
          ></AdjustmentsHorizontalIcon>
        );
        break;
      }
      default: {
        break;
      }
    }
  }
  return (
    <button
      type="button"
      className="flex flex-row text-xl items-center text-white font-bold cursor-pointer gap-1 transition ease-in-out hover:"
      onClick={() => {
        changePage(func);
      }}
    >
      {icon()}
      {func}
    </button>
  );
}

function NavBar({ changePage }: NavBarProps) {
  const logo = lightLogo;
  return (
    <div className="p-10 flex flex-row h-20 w-200 bg-sky-500 shadow-xl justify-between items-center rounded-full">
      <img src={logo} className="w-35"></img>
      <div className="mr-5 flex flex-row w-130 h-100% justify-between items-center">
        {menuButtons("Meus Dados", changePage)}
        {menuButtons("Mensagens", changePage)}
        {menuButtons("Configurações", changePage)}
      </div>
    </div>
  );
}

export default NavBar;
