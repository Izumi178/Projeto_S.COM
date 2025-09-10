import {
  BuildingLibraryIcon,
  BriefcaseIcon,
  BookOpenIcon,
} from "@heroicons/react/16/solid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

function InstitutionalData() {
  interface dataLabel {
    label: string;
    data: string;
  }
  const generalData: dataLabel[] = [
    { label: "Ra:", data: "231270852" },
    { label: "Curso Matriculado:", data: "Engenharia de Controle e Automação" },
    { label: "Email institucional:", data: "gabriel.izumi@unesp.br" },
    { label: "Semestre matriculado:", data: "5" },
  ];

  const history: dataLabel[] = [
    { label: "Matérias Concluídas:", data: "20" },
    { label: "Matérias Reprovadas:", data: "0" },
    { label: "Coeficiente de rendimento:", data: "5,0" },
    { label: "Coeficiente de rendimento da turma:", data: "6,0" },
  ];

  const hours: dataLabel[] = [
    { label: "Carga horária concluída:", data: "1500" },
    { label: "Horas de extensão", data: "120" },
    { label: "Horas complementares", data: "60" },
    { label: "Horas de estágio:", data: "0" },
  ];

  interface tableRows {
    materia: string;
    professor: string;
    carga: number;
    frequencia: number;
    mediaProva: number;
    mediaTrabalho: number;
  }

  const Materias: tableRows[] = [
    {
      materia: "S.COM",
      professor: "Leopoldo André Dutra Lusquino Filho",
      carga: 60,
      frequencia: 100,
      mediaProva: 6.75,
      mediaTrabalho: 8.0,
    },
  ];

  return (
    <ul>
      <li>
        <div className="flex flex-col min-width-[1000px] h-auto pb-[20px] shadow-md">
          <div className="flex flex-row items-center min-w-[1000px] h-auto px-[30px] py-[20px] justify-start gap-x-[10px]">
            <BuildingLibraryIcon className="w-[30px] text-sky-500" />
            <h3 className="text-2xl text-sky-500 font-bold">
              Informações Gerais
            </h3>
          </div>
          <ul className="flex flex-row items-center min-w-[1000px] h-auto px-[40px] py-[10px] justify-start gap-[40px]">
            {generalData.map((item) => (
              <li className="flex flex-col items-start gap-[5px]">
                <label className="text-sky-500 font-bold">{item.label}</label>
                <p className="block py-[10px] px-[20px] bg-gray-200 min-w-[250px] rounded-full text-sky-500 font-bold">
                  {item.data}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </li>
      <li>
        <div className="flex flex-col min-width-[1000px] h-auto pb-[20px] shadow-md">
          <div className="flex flex-row items-center min-w-[1000px] h-auto px-[30px] py-[20px] justify-start gap-x-[10px]">
            <BriefcaseIcon className="w-[30px] text-sky-500" />
            <h3 className="text-2xl text-sky-500 font-bold">
              Histórico Escolar
            </h3>
          </div>
          <ul className="flex flex-row items-center min-w-[1000px] h-auto px-[40px] py-[10px] justify-start gap-[40px]">
            {history.map((item) => (
              <li className="flex flex-col items-start gap-[5px]">
                <label className="text-sky-500 font-bold">{item.label}</label>
                <p className="block py-[10px] px-[20px] bg-gray-200 min-w-[250px] rounded-full text-sky-500 font-bold">
                  {item.data}
                </p>
              </li>
            ))}
          </ul>
          <ul className="flex flex-row items-center min-w-[1000px] h-auto px-[40px] py-[10px] justify-start gap-[40px]">
            {hours.map((item) => (
              <li className="flex flex-col items-start gap-[5px]">
                <label className="text-sky-500 font-bold">{item.label}</label>
                <p className="block py-[10px] px-[20px] bg-gray-200 min-w-[250px] rounded-full text-sky-500 font-bold">
                  {item.data}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </li>
      <li>
        <div className="flex flex-col min-width-[1000px] h-auto pb-[20px] px-[10px]">
          <div className="flex flex-row items-center min-w-[1000px] h-auto px-[30px] py-[20px] justify-start gap-x-[10px]">
            <BookOpenIcon className="w-[30px] text-sky-500" />
            <h3 className="text-2xl text-sky-500 font-bold">
              Dados do semestre
            </h3>
          </div>
          <TableContainer>
            <Table className="min-w-[700px] rounded-xl bg-gray-200 ">
              <TableHead>
                <TableRow>
                  <TableCell>Matéria</TableCell>
                  <TableCell>Professor</TableCell>
                  <TableCell>Carga Horária</TableCell>
                  <TableCell>Frequência</TableCell>
                  <TableCell>Média de Prova</TableCell>
                  <TableCell>Média de Trabalho</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Materias.map((item) => (
                  <TableRow>
                    <TableCell>{item.materia}</TableCell>
                    <TableCell>{item.professor}</TableCell>
                    <TableCell>{item.carga}</TableCell>
                    <TableCell>{item.frequencia}</TableCell>
                    <TableCell>{item.mediaProva}</TableCell>
                    <TableCell>{item.mediaTrabalho}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </li>
    </ul>
  );
}

export default InstitutionalData;
