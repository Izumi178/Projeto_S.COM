import {
  BuildingLibraryIcon,
  BriefcaseIcon,
  BookOpenIcon,
} from "@heroicons/react/16/solid";
import { GetInstitutionalData, type Aluno } from "../../getInstitutionalData";
import { useState, useEffect } from "react";

type user = {
  email: string;
};

function InstitutionalData({ email }: user) {
  const [institutionalData, setInstitutionalData] = useState<Aluno>();
  useEffect(() => {
    const loadData = async () => {
      const data = await GetInstitutionalData(email);
      if (data) {
        setInstitutionalData(data[0]);
      }
    };
    loadData();
  }, []);
  interface dataLabel {
    label: string;
    data: any;
  }
  const generalData: dataLabel[] = [
    { label: "Ra:", data: institutionalData?.RA },
    { label: "Curso Matriculado:", data: institutionalData?.curso },
    { label: "Email institucional:", data: institutionalData?.email },
    { label: "Semestre matriculado:", data: institutionalData?.semestre },
    { label: "Carga horária concluída:", data: institutionalData?.horas_curso },
    { label: "Horas de extensão", data: institutionalData?.horas_extensao },
    {
      label: "Horas complementares",
      data: institutionalData?.horas_complementar,
    },
    { label: "Horas de estágio:", data: institutionalData?.horas_estagio },
  ];

  const history: dataLabel[] = [
    { label: "Matérias Concluídas:", data: "20" },
    { label: "Matérias Reprovadas:", data: "0" },
    { label: "Coeficiente de rendimento:", data: "5,0" },
    { label: "Coeficiente de rendimento da turma:", data: "6,0" },
  ];

  interface trs {
    materia: string;
    professor: string;
    carga: number;
    frequencia: number;
    mediaProva: number;
    mediaTrabalho: number;
  }

  const Materias: trs[] = [
    {
      materia: "S.COM",
      professor: "Leopoldo André Dutra Lusquino Filho",
      carga: 60,
      frequencia: 100,
      mediaProva: 6.75,
      mediaTrabalho: 8.0,
    },
  ];
  const row =
    "bg-(--forms-bg-light) dark:bg-(--forms-bg-dark) text-(--primary-color) text-xs big:text-lg";
  const cell = "py-[10px] px-[5px]";
  const card =
    "flex flex-col min-w-[300px] sm:max-w-[600px] md:max-w-[760px] lg:max-w-[1000px] xl:max-w-[1200px] 2xl:max-w-[1500px] h-auto px-[30px] py-[10px] shadow-md gap-y-[10px]";
  const titleArea =
    "flex flex-row items-center w-fit h-auto gap-x-[10px] whitespace-nowrap justify-start";
  const grid =
    "flex grid cols-1 sm:grid-cols-2 lg:grid-cols-4 big:grid-cols-1 big:md:grid-cols-2 items-center h-auto gap-y-[20px] sm:px-[10px] lg:px-[20px] py-[10px] justify-start sm:gap-x-[30px] md:gap-x-[40px]";
  const label =
    "text-(--primary-color) font-bold whitespace-nowrap text-xs lg:text-base big:text-lg";
  const field =
    "block py-[10px] px-[20px] font-bold text-(--primary-color) whitespace-nowrap rounded-full bg-(--forms-bg-light) dark:bg-(--forms-bg-dark) lg:text-sm xl:text-sm 2xl:text-xl big:text-3xl big:min-w-300px min-w-[300px] sm:min-w-[220px] md:min-w-[300px] lg:min-w-[220px] xl:min-w-[250px] 2xl:min-w-[300px]";
  return (
    <ul>
      <li>
        <div className={card}>
          <div className={titleArea}>
            <BuildingLibraryIcon className="w-[30px] text-(--primary-color)" />
            <h3 className="text-2xl text-(--primary-color) font-bold">
              Informações Gerais
            </h3>
          </div>
          <div className={grid}>
            {generalData.map((item) => (
              <li className="flex flex-col items-start gap-[5px]">
                <label className={label}>{item.label}</label>
                <p className={field}>{item.data}</p>
              </li>
            ))}
          </div>
        </div>
      </li>
      <li>
        <div className={card}>
          <div className={titleArea}>
            <BriefcaseIcon className="w-[30px] text-(--primary-color)" />
            <h3 className="big:text-3xl text-2xl text-(--primary-color) font-bold">
              Histórico Escolar
            </h3>
          </div>
          <div className={grid}>
            {history.map((item) => (
              <li className="flex flex-col items-start gap-[5px]">
                <label className={label}>{item.label}</label>
                <p className={field}>{item.data}</p>
              </li>
            ))}
          </div>
        </div>
      </li>
      <li>
        <div className={card}>
          <div className={titleArea}>
            <BookOpenIcon className="w-[30px] text-(--primary-color)" />
            <h3 className="big:text-3xl text-2xl text-(--primary-color) font-bold">
              Dados do semestre
            </h3>
          </div>
          <table className="min-w-[400px] overflow-x-auto sm:max-w-[600px] md:max-w-[760px] lg:max-w-[1000px] xl:max-w-[1200px] 2xl:max-w-[1500px] rounded-full bg-(--forms-bg-light) dark:bg-(--forms-bg-dark)">
            <tr className={row}>
              <th className={cell}>Matéria</th>
              <th className={cell}>Professor</th>
              <th className={cell}>Carga Horária</th>
              <th className={cell}>Frequência</th>
              <th className={cell}>Média de Prova</th>
              <th className={cell}>Média de Trabalho</th>
            </tr>
            {Materias.map((item) => (
              <tr className={row}>
                <th className={cell}>{item.materia}</th>
                <th className={cell}>{item.professor}</th>
                <th className={cell}>{item.carga}</th>
                <th className={cell}>{item.frequencia}</th>
                <th className={cell}>{item.mediaProva}</th>
                <th className={cell}>{item.mediaTrabalho}</th>
              </tr>
            ))}
          </table>
        </div>
      </li>
    </ul>
  );
}

export default InstitutionalData;
