import {
  MoonIcon,
  BoldIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/16/solid";
import { logOut } from "../../../server/authLogin";
import { useNavigate } from "react-router-dom";

function Preferences() {
  const navigate = useNavigate();
  //Funcao que altera o tema do site
  function setMode() {
    /*Se a aplicação já contém a classe dark, ou seja, se o tema escuro já foi aplicado
    Então a classe é removida, desativando o tema escuro*/
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.removeItem("dark");
    }
    //Senão a classe dark é adicionada, ativando o tema escuro
    else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("dark", "true");
    }
  }
  /*Se a aplicação já contém a classe big, ou seja, 
  se o tema que utiliza fontes maiores já foi aplicado
  Então a classe é removida, tornando a fonte no tamanho padrão*/
  function resizeFont() {
    if (document.documentElement.classList.contains("big")) {
      document.documentElement.classList.remove("big");
      localStorage.removeItem("big");
    }
    //Senão a classe big é adicionada, aumentando o tamanho da fonte
    else {
      document.documentElement.classList.add("big");
      localStorage.setItem("big", "true");
    }
  }
  return (
    <ul>
      <li>
        <div
          className="flex flex-row items-center 
        min-w-[300px] sm:min-w-[600px] md:min-w-[720px] lg:min-w-[1000px] xl:min-w-[1200px] 2xl:min-w-[1424px] 
        h-auto px-[30px] py-[10px] shadow-md justify-between"
        >
          <div className="flex flex-row items-center w-fit h-auto gap-x-[5px] sm:gap-x-[10px] whitespace-nowrap">
            <MoonIcon className="w-[20px] sm:w-[30px] text-(--primary-color)" />
            <h3 className="text-sm sm:text-xl big:text-sm big:sm:text-2xl text-(--primary-color) font-bold">
              Ativar modo noturno
            </h3>
          </div>
          {/*o fundo do input possui uma cor, no entanto, quando o modo escuro está ativado, a cor do fundo muda*/}
          <div
            className="flex flex-row h-[15px] w-[40px] sm:h-[20px] sm:w-[50px] 
          bg-(--forms-bg-light) dark:bg-(--forms-bg-dark) rounded-full items-center justify-start dark:justify-end "
          >
            {/*Ao clicar no botão, a função setMode é executada*/}
            <button
              className="h-[15px] w-[15px] sm:h-[20px] sm:w-[20px] rounded-full bg-(--primary-color) z-1000"
              onClick={setMode}
            ></button>
          </div>
        </div>
      </li>
      <li>
        <div
          className="flex flex-row items-center 
        min-w-[300px] sm:min-w-[600px] md:min-w-[720px] lg:min-w-[1000px] xl:min-w-[1200px] 2xl:min-w-[1424px]
         h-auto px-[30px] py-[10px] shadow-md justify-between"
        >
          <div className="flex flex-row items-center w-fit h-auto gap-x-[5px] sm:gap-x-[10px] whitespace-nowrap">
            <BoldIcon className="w-[20px] sm:w-[30px] text-(--primary-color)" />
            {/*quando o modo de fonte aumentada nao esta ativada, a fonte possui um tamanho,
            quando ativa, ela aumenta*/}
            <h3 className="text-sm sm:text-xl big:text-sm big:sm:text-2xl text-(--primary-color) font-bold">
              Aumentar tamanho da fonte
            </h3>
          </div>
          {/*Quando o dark mode nao esta ativado, o fundo possui uma cor,
          quando ativa, a cor muda*/}
          <div
            className="flex flex-row h-[15px] w-[40px] sm:h-[20px] sm:w-[50px] 
          bg-(--forms-bg-light) dark:bg-(--forms-bg-dark) rounded-full items-center justify-start 
          big:justify-end"
          >
            {/*Ao clicar no botão, a função resizeFont é executada*/}
            <button
              className="h-[15px] w-[15px] sm:h-[20px] sm:w-[20px] rounded-full bg-(--primary-color) z-1000"
              onClick={resizeFont}
            ></button>
          </div>
        </div>
      </li>
      <li>
        <div
          className="flex flex-row items-center 
        min-w-[300px] sm:min-w-[600px] md:min-w-[720px] lg:min-w-[1000px] xl:min-w-[1200px] 2xl:min-w-[1424px]
         h-auto px-[30px] py-[10px] shadow-md justify-between"
        >
          <div className="flex flex-row items-center w-fit h-auto gap-x-[5px] sm:gap-x-[10px] whitespace-nowrap">
            <ArrowRightStartOnRectangleIcon className="w-[20px] sm:w-[30px] text-(--primary-color)" />
            <h3 className="text-sm sm:text-xl big:text-sm big:sm:text-2xl text-(--primary-color) font-bold">
              Logoff
            </h3>
          </div>
          <button
            className="px-[10px] py-[5px] h-fit w-fit rounded-[5px] z-1000 bg-(--forms-bg-light) dark:bg-(--forms-bg-dark) cursor-pointer text-(--primary-color)"
            onClick={async () => {
              if (await logOut()) {
                navigate("/login", { replace: true });
              } else {
              }
            }}
          >
            Sair
          </button>
        </div>
      </li>
    </ul>
  );
}

export default Preferences;
