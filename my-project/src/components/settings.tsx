import {
  ChevronDownIcon,
  ChevronUpIcon,
  PencilSquareIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/16/solid";
import Preferences from "./preferences";
import AlterData from "./alterData";
import { useState } from "react";

function Settings() {
  interface cards {
    title: string;
    expanded: boolean;
    icon: React.ForwardRefExoticComponent<
      Omit<React.SVGProps<SVGSVGElement>, "ref">
    >;
    cardControl(): void;
  }
  const [cadastroExpanded, cadastroControl] = useState(false);
  const [preferencesExpanded, preferencesControl] = useState(false);
  const dataCard: cards[] = [
    {
      title: "Alterar Dados Cadastrais",
      expanded: cadastroExpanded,
      icon: PencilSquareIcon,
      cardControl() {
        cadastroControl(!cadastroExpanded);
      },
    },
    {
      title: "Preferências",
      expanded: preferencesExpanded,
      icon: AdjustmentsHorizontalIcon,
      cardControl() {
        preferencesControl(!preferencesExpanded);
      },
    },
  ];
  const iconProps = "w-[40px] text-sky-500";
  return (
    <ul className="flex flex-col min-w-[700px] items-center gap-[30px]">
      {dataCard.map((data) => (
        <div className="flex flex-col w-full h-fit justify-between items-center shadow-md shadow-grey-500 rounded-xl transition: duration-400 hover:scale-110">
          <div
            className={`px-[20px] py-[10px] flex flex-row w-full justify-between items-center z-1000 shadow-md ${
              data.expanded ? "rounded-t-xl" : "rounded-xl"
            }`}
          >
            <div className="flex flex-row gap-[5px] justify-center items-center">
              <data.icon className={iconProps}></data.icon>
              <h2 className="text-sky-500 text-3xl font-bold">{data.title}</h2>
            </div>
            <button className="flex cursor-pointer" onClick={data.cardControl}>
              {data.expanded ? (
                <ChevronUpIcon className={iconProps}></ChevronUpIcon>
              ) : (
                <ChevronDownIcon className={iconProps}></ChevronDownIcon>
              )}
            </button>
          </div>
          <div className={data.expanded ? "flex items-center" : "hidden"}>
            {data.title === "Preferências" ? (
              <Preferences></Preferences>
            ) : (
              <AlterData></AlterData>
            )}
          </div>
        </div>
      ))}
    </ul>
  );
}

export default Settings;
