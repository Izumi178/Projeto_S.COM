import { EnvelopeIcon, EnvelopeOpenIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

function Messages() {
  interface cards {
    autor: string;
    assunto: string;
    corpo: string;
    expanded: boolean;
    cardControl(): void;
  }
  const [messageExpanded, messageControl] = useState(false);
  const dataCard: cards[] = [
    {
      autor: "Leopoldo André Dutra Lusquino Filho",
      assunto: "Novo comunicado",
      corpo:
        "	Pessoal, sobre o relatório dos trabalhos individuais, eles não tem um formato definido, mas o utilizem como um complemento da apresentação, discutindo quais frameworks, APIs e bibliotecas utilzaram no desenvolvimento do seu projeto, discutindo falhas que não conseguiram superar e apontando elementos técnicos do seu trabalho que não são explorados em outras partes.",
      expanded: messageExpanded,
      cardControl() {
        messageControl(!messageExpanded);
      },
    },
  ];
  const iconProps = "w-[30px] sm:w-[40px] text-(--primary-color)";
  return (
    <ul className="flex flex-col items-center gap-[30px] rounded-full  transition: duration-400 hover:scale-105">
      {dataCard.map((data) => (
        <div className="flex flex-col items-center min-w-[300px] sm:min-w-[600px] md:max-w-[720px] h-auto shadow-md justify-between">
          <div
            className={
              "px-[10px] sm:px-[20px] py-[10px] flex flex-row w-full justify-between items-center z-1000 shadow-md gap-[10px]"
            }
          >
            <div className="flex flex-col gap-[5px] justify-center items-start sm:ml-[20px]">
              <h2 className="text-(--primary-color) text-xl big:text-2xl font-bold whitespace-nowrap">
                {"De: " + data.autor}
              </h2>
              <h3 className="text-(--primary-color) text-lg big:text-xl font-bold whitespace-nowrap">
                {"Sobre: " + data.assunto}
              </h3>
            </div>
            <button className="flex cursor-pointer" onClick={data.cardControl}>
              {data.expanded ? (
                <EnvelopeOpenIcon className={iconProps}></EnvelopeOpenIcon>
              ) : (
                <EnvelopeIcon className={iconProps}></EnvelopeIcon>
              )}
            </button>
          </div>
          <div className={data.expanded ? "flex items-center" : "hidden"}>
            <p className="text-(--primary-color) font-bold text-start text-lg big:text-xl px-[60px] py-[40px]">
              {data.corpo}
            </p>
          </div>
        </div>
      ))}
    </ul>
  );
}
export default Messages;
