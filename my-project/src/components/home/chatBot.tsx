import { useForm } from "react-hook-form";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
export default function ChatBotPage() {
  const {
    //função que permite adicionar validação aos inputs
    register,
    //funcao executada ao submeter o formulario
    handleSubmit,
  } = useForm();
  return (
    <div className="flex flex-col w-[1200px] h-[500px] p-[10px] items-center justify-end bg-white dark:bg-(--bg-dark) rounded-[40px] drop-shadow-2xl p-[20px]">
      <form
        className="flex flex-row w-full h-[auto] mt-[10px]   justify-start gap-[20px]"
        onSubmit={handleSubmit((data) => {})}
      >
        <input
          className="h-full bg-gray-600 rounded-full w-full text-(--primary-color) px-[15px]"
          type="text"
          {...register("Request", {
            required: true,
          })}
        ></input>
        <button className="bg-(--primary-color) w-[50px] h-auto rounded-full p-[10px] cursor-pointer">
          <PaperAirplaneIcon className="text-(--bg-dark) dark:text-white"></PaperAirplaneIcon>
        </button>
      </form>
    </div>
  );
}
