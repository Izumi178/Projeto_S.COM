import { XMarkIcon } from "@heroicons/react/16/solid";
import { BarChart } from "@mui/x-charts/BarChart";
import { useState } from "react";
type closeWindow = {
  close: React.Dispatch<React.SetStateAction<boolean>>;
};
interface medidas {
  nome: string;
  data: number;
}
const central: medidas[] = [
  { nome: "Média", data: 0 },
  { nome: "Moda", data: 0 },
  { nome: "Média", data: 0 },
];
const disp: medidas[] = [
  { nome: "Desvio padrão", data: 0 },
  { nome: "Variância", data: 0 },
  { nome: "Coef. de var.", data: 0 },
];
const others: medidas[] = [
  { nome: "Assimetria", data: 0 },
  { nome: "Curtose", data: 0 },
];
const title = "text-(--primary-color) font-bold whitespace-nowrap text-[25px]";
const subtitle =
  "text-(--primary-color) font-bold whitespace-nowrap text-[18px]";
const label = "text-(--primary-color) font-bold whitespace-nowrap text-[15px]";
const field =
  "block py-[10px] px-[20px] w-[100px] text-(--primary-color) rounded-full bg-(--forms-bg-light) dark:bg-(--forms-bg-dark) font-bold";
export default function Graphs({ close }: closeWindow) {
  const [qntt, setQntt] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  return (
    <div className="fixed flex flex-col justify-start z-1000 w-[1000px] h-[800px] rounded-[50px] bg-(--bg-dark) gap-[10px] drop-shadow-2xl translate-y-[10%] p-[20px]">
      <button
        className="w-fit self-end"
        onClick={() => {
          close(true);
        }}
      >
        <XMarkIcon className="text-(--primary-color) w-[60px]"></XMarkIcon>
      </button>
      <h3 className="text-(--primary-color) text-[42px] font-bold -mt-[60px]">
        Gráfico de desempenho dos alunos
      </h3>
      <div className="w-full bg-(--primary-color) h-[2px]"></div>
      <div className="flex flex-row justify-center h-auto gap-[20px]">
        <div>
          <h4 className={title}>Selecione o intervalo do semestre</h4>
          <BarChart
            className="w-full h-full"
            xAxis={[
              {
                id: "barCategories",
                data: [
                  "0-1",
                  "1-2",
                  "2-3",
                  "3-4",
                  "4-5",
                  "5-6",
                  "7-8",
                  "8-9",
                  "9-10",
                ],
              },
            ]}
            series={[
              {
                data: qntt,
              },
            ]}
          ></BarChart>
        </div>

        <div className="flex flex-col items-center gap-[10px] mr-[10px]">
          <h4 className={title}>Selecione o intervalo do semestre</h4>
          <form className="flex flex-col gap-[20px] items-center">
            <div className="flex flex-row items-center gap-[10px]">
              <input type="number" min={1} max={10} className={field}></input>
              <div className="bg-(--primary-color) w-[5px] h-[2px]"></div>
              <input type="number" min={1} max={10} className={field}></input>
            </div>
            <button
              className="bg-(--primary-color) text-white dark:text-(--bg-dark) big:w-[200px] big:h-[50px] big:text-xl w-[150px] h-[40px] whitespace-nowrap font-bold rounded-xl items-center cursor-pointer transition duration-300 hover:scale-105"
              onClick={() => {}}
            >
              Setar intervalo
            </button>
          </form>
          <h4 className={title}>Estastísticas</h4>
          <h5 className={subtitle}>Centralidade</h5>
          <ul className="flex flex-row gap-[20px] justify-center">
            {central.map((item) => (
              <li className="flex flex-col gap-[5px]">
                <label className={label}>{item.nome}</label>
                <p className={field}>{item.data}</p>
              </li>
            ))}
          </ul>
          <h5 className={subtitle}>Dispersão</h5>
          <ul className="flex flex-row gap-[20px] items-center">
            {disp.map((item) => (
              <li className="flex flex-col gap-[5px] items-center">
                <label className={label}>{item.nome}</label>
                <p className={field}>{item.data}</p>
              </li>
            ))}
          </ul>
          <ul className="flex flex-row gap-[20px] items-center">
            {others.map((item) => (
              <li className="flex flex-col gap-[5px] items-center">
                <h5 className={subtitle}>{item.nome}</h5>
                <p className={field}>{item.data}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
