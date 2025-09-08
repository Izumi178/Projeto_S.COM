import {
  ChevronDownIcon,
  ChevronUpIcon,
  TableCellsIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/16/solid";
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
      icon: TableCellsIcon,
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
  const iconProps = "w-14 stroke-cyan-500";
  const cardProps =
    "flex flex-col w-full justify-between items-center shadow-md shadow-grey-500 rounded-xl";
  return (
    <ul className="flex flex-col w-300 items-center gap-10">
      {dataCard.map((data) => (
        <div className={cardProps}>
          <div className="px-10 py-7 flex flex-row w-full justify-between items-center rounded-xl border border-sky-500">
            <div className="flex flex-row gap-5 justify-center items-center">
              <data.icon className={iconProps}></data.icon>
              <h2 className="text-sky-500 text-2xl font-bold">{data.title}</h2>
            </div>
            <button className="flex cursor-pointer" onClick={data.cardControl}>
              {data.expanded ? (
                <ChevronUpIcon className={iconProps}></ChevronUpIcon>
              ) : (
                <ChevronDownIcon className={iconProps}></ChevronDownIcon>
              )}
            </button>
          </div>
        </div>
      ))}
      ;
    </ul>
  );
}

export default Settings;
