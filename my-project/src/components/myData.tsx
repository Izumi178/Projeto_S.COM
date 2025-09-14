import {
  ChevronDownIcon,
  ChevronUpIcon,
  TableCellsIcon,
  AcademicCapIcon,
} from "@heroicons/react/16/solid";
import RegisterData from "./registerData";
import InstitutionalData from "./insitutionalData";
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
  ];
  const iconProps = "w-[40px] text-(--primary-color)";
  return (
    <ul className="flex flex-col w-full items-center gap-[30px]">
      {dataCard.map((data) => (
        <li>
          <div className="flex flex-col items-center min-w-[300px] sm:min-w-[600px] md:min-w-[720px] lg:min-w-[1000px] xl:min-w-[1200px] 2xl:min-w-[1424px] h-auto shadow-md justify-between transition: duration-400 hover:scale-105">
            <div
              className={`px-[20px] py-[10px] flex flex-row w-full justify-between items-center z-1000 shadow-md ${
                data.expanded ? "rounded-t-xl " : "rounded-xl"
              }`}
            >
              <div className="flex flex-row gap-[5px] justify-center items-center">
                <data.icon className={iconProps}></data.icon>
                <h2 className="text-(--primary-color) text-2xl sm:text-3xl font-bold">
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
            <div className={data.expanded ? "flex items-center" : "hidden"}>
              {data.title === "Dados Cadastrais" ? (
                <RegisterData />
              ) : (
                <InstitutionalData />
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default MyData;
