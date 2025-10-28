import { deleteUser } from "../../adminActions";
import { type Pessoas } from "../../getRegisterData";
import type { popUp } from "../warning";

type idk = {
  user: Pessoas;
  close: React.Dispatch<React.SetStateAction<boolean>>;
  setPopUp: React.Dispatch<React.SetStateAction<popUp | undefined>> | undefined;
};

export default function ConfirmDelete({ user, close, setPopUp }: idk) {
  return (
    <div className="fixed flex flex-col justify-center z-1000 w-[500px] h-[300px] rounded-[50px] items-center bg-gray-700 shadow-box-xl shadow-box-black gap-[10px] translate-y-[50%]">
      <h3 className="text-(--primary-color) text-[42px] font-bold">
        Confirmar ação
      </h3>
      <p className="text-(--primary-color) text-[20px]">
        {"Clique em confirmar ação para exluir o usuario " + user.name}
      </p>
      <button
        className="bg-green-400 text-white dark:text-(--bg-dark) big:w-[200px] big:h-[50px] big:text-xl w-[150px] h-[40px] whitespace-nowrap font-bold rounded-xl items-center cursor-pointer transition duration-300 hover:scale-105"
        onClick={async () => {
          if (await deleteUser(user)) {
            close(true);
            if (setPopUp) {
              const warn: popUp = {
                title: "Sucesso",
                content: "Usuario deletado com sucesso",
                show: true,
                works: true,
                set: setPopUp,
              };
              setPopUp(warn);
            }
          } else {
            close(true);
            if (setPopUp) {
              const warn: popUp = {
                title: "Erro",
                content: "Houve algo de errado",
                show: true,
                works: false,
                set: setPopUp,
              };
              setPopUp(warn);
            }
          }
        }}
      >
        Confirmar
      </button>
      <button
        className="bg-red-500 text-white dark:text-(--bg-dark) big:w-[200px] big:h-[50px] big:text-xl w-[150px] h-[40px] whitespace-nowrap font-bold rounded-xl items-center cursor-pointer transition duration-300 hover:scale-105"
        onClick={() => {
          close(true);
        }}
      >
        Fechar
      </button>
    </div>
  );
}
