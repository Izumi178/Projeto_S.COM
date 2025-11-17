import { useForm } from "react-hook-form";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import { test } from "../../../ai/gemini";
import { useState } from "react";

//Interface das mensagens
interface message {
  writen: boolean; //Verifica se a mensagem foi escrita pelo usuário
  message: string; //Conteúdo da mensagem
}

export default function ChatBotPage() {
  //Vetor que contém as mensagens
  const [chat, setChat] = useState<message[]>([]);
  const {
    //função que permite adicionar validação aos inputs
    register,
    //funcao executada ao submeter o formulario
    handleSubmit,
  } = useForm();
  return (
    <div className="flex flex-col w-[1200px] h-[500px] p-[10px] justify-end bg-white dark:bg-(--bg-dark) rounded-[40px] drop-shadow-2xl p-[20px]">
      <div className="overflow-auto gap-[10px]">
        {/*Gera as mensagens a partir do vetor*/}
        {chat.map((message) => (
          <div
            className={`flex max-w-[500px] text-[20px] h-auto dark:bg-gray-900 p-[10px] rounded-[10px] ${
              message.writen === true ? "ml-[620px]" : ""
            }`}
          >
            <p className="whitespace-normal text-start text-(--primary-color)">
              {message.message}
            </p>
          </div>
        ))}
      </div>
      <form
        className="flex flex-row w-full h-[auto] mt-[10px]   justify-start gap-[20px]"
        onSubmit={handleSubmit(async (data) => {
          //Adiciona a mensagem escrita pelo usuário ao vetor
          const newQuestion = {
            writen: true,
            message: data.Request.toString(),
          };
          setChat((prev) => [...prev, newQuestion]);
          //Gera resposta da IA e a adiciona ao vetor
          const response = await test({ message: data.Request });
          if (response) {
            const newResponse = { writen: false, message: response.toString() };
            setChat((prev) => [...prev, newResponse]);
          }
        })}
      >
        <input
          className="h-full bg-gray-600 rounded-full w-full text-(--primary-color) px-[15px]"
          type="text"
          {...register("Request", {
            required: true,
          })}
        ></input>
        <button
          type="submit"
          onClick={() => {
            handleSubmit;
          }}
          className="bg-(--primary-color) w-[50px] h-auto rounded-full p-[10px] cursor-pointer"
        >
          <PaperAirplaneIcon className="text-(--bg-dark) dark:text-white"></PaperAirplaneIcon>
        </button>
      </form>
    </div>
  );
}
