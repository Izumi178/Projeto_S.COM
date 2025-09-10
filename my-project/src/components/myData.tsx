import {
  ChevronDownIcon,
  ChevronUpIcon,
  TableCellsIcon,
  AcademicCapIcon,
  ChartBarIcon,
} from "@heroicons/react/16/solid";
import { useState } from "react";

function MyData() {
  interface cards {
    title: string;
    expanded: boolean;
    icon: React.ForwardRefExoticComponent<
      Omit<React.SVGProps<SVGSVGElement>, "ref">
    >;
    cardControl(): void;
  }
  const [cadastroExpanded, cadastroControl] = useState(false);
  const [institucionalExpanded, institucionalControl] = useState(false);
  const [notasExpanded, notasControl] = useState(false);
  const dataCard: cards[] = [
    {
      title: "Dados Cadastrais",
      expanded: cadastroExpanded,
      icon: TableCellsIcon,
      cardControl() {
        cadastroControl(!cadastroExpanded);
      },
    },
    {
      title: "Dados Institucionais",
      expanded: institucionalExpanded,
      icon: AcademicCapIcon,
      cardControl() {
        institucionalControl(!institucionalExpanded);
      },
    },
    {
      title: "Notas e frequências",
      expanded: notasExpanded,
      icon: ChartBarIcon,
      cardControl() {
        notasControl(!notasExpanded);
      },
    },
  ];
  const iconProps = "w-14 stroke-cyan-500";
  const cardProps =
    "flex flex-col w-full justify-start items-center shadow-md shadow-grey-500 rounded-xl";
  return (
    <ul className="flex flex-col w-full items-center gap-[30px]">
      {dataCard.map((data) => (
        <li>
          <div className={cardProps}>
            <div className="px-[10px] py-[7px] flex flex-row w-auto min-w-[400px] md:min-w-[700px] justify-between items-center rounded-xl border border-sky-500">
              <div className="flex flex-row gap-[5px] justify-center items-center">
                <data.icon className={iconProps}></data.icon>
                <h2 className="text-sky-500 text-2xl font-bold">
                  {data.title}
                </h2>
              </div>
              <button
                className="flex cursor-pointer"
                onClick={data.cardControl}
              >
                {data.expanded ? (
                  <ChevronUpIcon className={iconProps}></ChevronUpIcon>
                ) : (
                  <ChevronDownIcon className={iconProps}></ChevronDownIcon>
                )}
              </button>
            </div>
          </div>
        </li>
      ))}
      ;
    </ul>
  );
}

export default MyData;
