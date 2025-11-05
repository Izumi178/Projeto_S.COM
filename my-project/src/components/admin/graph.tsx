import { BarChart } from "@mui/x-charts/BarChart";
import { useState } from "react";
export default function Graphs() {
  const [qntt, setQntt] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  return (
    <div className="fixed flex flex-col justify-start z-1000 w-[1000px] h-[800px] rounded-[50px] items-center bg-gray-700 gap-[10px] drop-shadow-2xl translate-y-[10%] p-[10px]">
      <h3 className="text-(--primary-color) text-[42px] font-bold">
        Gráfico de desempenho dos alunos
      </h3>
      <div className="flex flex-row">
        <BarChart
          className="w-full h-auto"
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
        <div className="flex flex-col">
          <button className="" onClick={() => {}}></button>
        </div>
      </div>
    </div>
  );
}
