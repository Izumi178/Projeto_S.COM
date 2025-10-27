import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";

export type popUp = {
  title: string | undefined;
  content: string | undefined;
  show: boolean | undefined;
  works: boolean | undefined;
  set: React.Dispatch<React.SetStateAction<popUp | undefined>> | undefined;
  goToLogin?: boolean;
};

export default function PopUp({
  title,
  content,
  show,
  works,
  set,
  goToLogin,
}: popUp) {
  const navigate = useNavigate();
  return (
    <div className="fixed flex flex-col justify-center z-1000 w-[500px] h-[300px] rounded-[50px] items-center bg-gray-700 shadow-box-xl shadow-box-black gap-[10px] translate-y-[50%]">
      <h3 className="text-(--primary-color) text-[42px] font-bold">{title}</h3>
      {works ? (
        <CheckCircleIcon className="w-[70px] text-green-400"></CheckCircleIcon>
      ) : (
        <XCircleIcon className="w-[70px] text-red-500"></XCircleIcon>
      )}
      <p className="text-(--primary-color) text-[20px]">{content}</p>
      <button
        className="bg-(--primary-color) text-white dark:text-(--bg-dark) big:w-[200px] big:h-[50px] big:text-xl w-[150px] h-[40px] whitespace-nowrap font-bold rounded-xl items-center cursor-pointer transition duration-300 hover:scale-105"
        onClick={() => {
          if (set) {
            if (goToLogin) {
              const data: popUp = {
                title: undefined,
                content: undefined,
                show: false,
                works: undefined,
                set: set,
              };
              set(data);
              navigate("/login", { replace: true });
            } else {
              const data: popUp = {
                title: undefined,
                content: undefined,
                show: false,
                works: undefined,
                set: set,
              };
              set(data);
            }
          }
        }}
      >
        Fechar
      </button>
    </div>
  );
}
