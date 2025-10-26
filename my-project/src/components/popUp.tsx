import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/16/solid";

type popUp = {
  title: string;
  content: string;
  works: boolean;
  set: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PopUp({ title, content, works, set }: popUp) {
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
          set(false);
        }}
      >
        Fechar
      </button>
    </div>
  );
}
