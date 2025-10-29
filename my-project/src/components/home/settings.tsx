import {
  ChevronDownIcon,
  ChevronUpIcon,
  PencilSquareIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/16/solid";
import Preferences from "./preferences";
import AlterData from "./alterData";
import { useState, type SetStateAction } from "react";
import { type popUp } from "../warning";

// Página de settings, analogo ao myData.tsx

type warning = {
  set: React.Dispatch<React.SetStateAction<popUp | undefined>> | undefined;
  id: string;
};

function Settings({ set, id }: warning) {
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
      title: "Alterar dados",
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
  const iconProps = "w-[40px] text-(--primary-color)";
  return (
    <ul className="flex flex-col items-center gap-[30px]">
      {dataCard.map((data) => (
        <div className="flex flex-col items-center min-w-[300px] sm:min-w-[600px] md:min-w-[720px] lg:min-w-[1000px] xl:min-w-[1200px] 2xl:min-w-[1424px] h-auto shadow-md justify-between transition: duration-400 hover:scale-105">
          <div
            className={`px-[20px] py-[10px] flex flex-row w-full justify-between items-center z-1000 shadow-md ${
              data.expanded ? "rounded-t-xl" : "rounded-xl"
            }`}
          >
            <div className="flex flex-row gap-[5px] justify-center items-center">
              <data.icon className={iconProps}></data.icon>
              <h2 className="text-(--primary-color) text-3xl big:text-4xl font-bold whitespace-nowrap">
                {data.title}
              </h2>
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
              <AlterData set={set} id={id}></AlterData>
            )}
          </div>
        </div>
      ))}
    </ul>
  );
}

export default Settings;
