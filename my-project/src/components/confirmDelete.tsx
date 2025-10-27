import { deleteUser } from "../adminActions";
import { type Pessoas } from "../getRegisterData";

type popUp = {
  user: Pessoas;
  close: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ConfirmDelete({ user, close }: popUp) {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="fixed flex flex-col justify-center z-1000 w-[500px] h-[300px] rounded-[50px] items-center bg-gray-700 shadow-box-xl shadow-box-black gap-[10px] ">
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
            } else {
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
    </div>
  );
}
