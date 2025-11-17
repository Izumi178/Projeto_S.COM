import { XMarkIcon } from "@heroicons/react/16/solid";
import * as ss from "simple-statistics";
import { analise, feel, type medidas } from "../../../ai/gemini";
import { useEffect, useState } from "react";
import { GetCRData } from "../../../server/getCr";
import {
  BarPlot,
  ChartContainer,
  ChartsAxisHighlight,
  ChartsTooltip,
  ChartsXAxis,
  ChartsYAxis,
  LineHighlightPlot,
  LinePlot,
} from "@mui/x-charts";
import { useForm } from "react-hook-form";
import type { popUp } from "../warning";

type closeWindow = {
  //Atributo para setar notificação
  setPopUp: React.Dispatch<React.SetStateAction<popUp | undefined>> | undefined;
  //Atributo para fechar interface
  close: React.Dispatch<React.SetStateAction<boolean>>;
};
const span = "text-bold text-red-600 font-md";
const title = "text-(--primary-color) font-bold whitespace-nowrap text-[25px]";
const subtitle =
  "text-(--primary-color) font-bold whitespace-nowrap text-[18px]";
const label = "text-(--primary-color) font-bold whitespace-nowrap text-[15px]";
const field =
  "block py-[10px] px-[20px] w-[100px] text-(--primary-color) rounded-full bg-(--forms-bg-light) dark:bg-(--forms-bg-dark) font-bold";

// estrutura dos dados dos gráficos
type data = {
  // vetor de dados
  rawData: number[];
  // atributo para setar os dados do histograma
  setHistData: React.Dispatch<React.SetStateAction<histData[]>>;
  // atributo para setar os dados do gráfico de linhas
  setLineData: React.Dispatch<React.SetStateAction<lineData[]>>;
  // atributo para setar medidas de centralidade
  setMedidas: React.Dispatch<React.SetStateAction<medidas | undefined>>;
};

//estrutura dos dados do histograma
type histData = {
  // intervalo dos dados
  interval: string;
  // quantidade de dados dentro do intervalo
  qntt: number;
};

//
type lineData = {
  value: number;
  qntt: number;
};

function setDatas({ rawData, setHistData, setLineData, setMedidas }: data) {
  const hist = Array.from({ length: 10 }, (_, i) => ({
    interval: `${i}-${i + 1}`,
    qntt: 0,
  }));

  const line = Array.from({ length: 10 }, () => ({
    value: 0,
    qntt: 0,
  }));

  rawData.forEach((value) => {
    const idx = Math.max(0, Math.min(9, Math.ceil(value)));
    hist[idx].qntt++;
    line[idx].value += value;
    line[idx].qntt++;
  });

  const finalLine = line.map((l) => ({
    value: l.qntt > 0 ? l.value / l.qntt : 0,
    qntt: l.qntt,
  }));

  setHistData(hist);
  setLineData(finalLine);
  setMedidas({
    media: ss.average(rawData),
    mediana: ss.median(rawData),
    moda: ss.mode(rawData),
    desvio_padrao: ss.standardDeviation(rawData),
    variancia: ss.variance(rawData),
    coef_variacao: ss.coefficientOfVariation(rawData),
    assimetria: ss.sampleSkewness(rawData),
    curtose: ss.sampleKurtosis(rawData),
  });
}

export default function Graphs({ close, setPopUp }: closeWindow) {
  const {
    //função que permite adicionar validação aos inputs
    register,
    //funcao executada ao submeter o formulario
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      //Atribui valores padrões
      Max: 10,
      Min: 1,
    },
  });
  const [lineData, setLineData] = useState<lineData[]>([]);
  // Varíavel de dados do histograma
  const [qntt, setQntt] = useState<histData[]>([]);
  // Varíavel de medidas de centralidades, dispersão, etc.
  const [statistics, setStattistics] = useState<medidas>();
  // Varíavel de analise de desempenho
  const [analysis, setAnalysis] = useState<string>();
  // Varíavel de analise de sentimentos
  const [feelings, setFeelings] = useState<string>();
  const central = statistics
    ? [
        { nome: "Média", data: statistics.media.toFixed(2) }, // Arredonda calculo para duas casas decimais
        { nome: "Mediana", data: statistics.mediana.toFixed(2) },
        { nome: "Moda", data: statistics.moda.toFixed(2) },
      ]
    : []; // Apresenta dados apenas se statistics for definido
  const disp = statistics
    ? [
        { nome: "Desvio padrão", data: statistics?.desvio_padrao.toFixed(2) },
        { nome: "Variância", data: statistics?.variancia.toFixed(2) },
        { nome: "Coef. de var.", data: statistics?.coef_variacao.toFixed(2) },
      ]
    : [];
  const others = statistics
    ? [
        { nome: "Assimetria", data: statistics?.assimetria.toFixed(2) },
        { nome: "Curtose", data: statistics?.curtose.toFixed(2) },
      ]
    : [];
  useEffect(() => {
    // Seleciona dados a partir de um intervalo padrão
    const loadData = async () => {
      const data = await GetCRData({ max: 10, min: 1 });
      if (data) {
        setDatas({
          rawData: data,
          setHistData: setQntt,
          setLineData: setLineData,
          setMedidas: setStattistics,
        });
        const response = await analise({
          interval: { min: 1, max: 10 },
          medidas: statistics,
        });
        if (response) {
          setAnalysis(response);
          const feeling = await feel({ message: response });
          if (feeling) {
            setFeelings(feeling);
          }
        }
      }
    };
    // Executa loadData ao carregar a página
    loadData();
  }, []);
  return (
    <div className="fixed flex flex-col overflow-scroll justify-start z-1000 w-[1200px] h-[800px] rounded-[50px] bg-(--bg-dark) gap-[10px] drop-shadow-2xl translate-y-[2%] p-[20px] pb-[50px]">
      <button
        className="w-fit h-fit self-end cursor-pointer"
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
          <ChartContainer
            series={[
              {
                type: "bar",
                data: qntt.map((i) => i.qntt),
              },
              { type: "line", data: lineData.map((i) => i.qntt) },
            ]}
            xAxis={[
              {
                scaleType: "band",
                data: qntt.map((i) => i.interval),
              },
            ]}
          >
            <ChartsAxisHighlight x="line" />
            <BarPlot />
            <LinePlot />

            <LineHighlightPlot />
            <ChartsYAxis label="Quantidade" tickLabelStyle={{ fontSize: 10 }} />
            <ChartsXAxis label="Notas" tickLabelStyle={{ fontSize: 10 }} />
            <ChartsTooltip />
          </ChartContainer>
        </div>
        <div className="flex flex-col items-center gap-[10px] mr-[10px]">
          <h4 className={title}>Selecione o intervalo do semestre</h4>
          <form
            onSubmit={handleSubmit(async (data) => {
              //Gera um aviso caso o intervalo entre semestres seja inválido
              if (data.Min > data.Max) {
                if (setPopUp) {
                  const warn: popUp = {
                    title: "Erro",
                    content: "Selecione um intervalo válido",
                    show: true,
                    works: false,
                    set: setPopUp,
                  };
                  setPopUp(warn);
                }
              } else {
                //Seleciona os crs dentro do intervalo selecionado
                const result = await GetCRData({
                  max: data.Max,
                  min: data.Min,
                });
                if (result) {
                  // Rearranja os dados dos gráficos e dados estatísticos
                  setDatas({
                    rawData: result,
                    setHistData: setQntt,
                    setLineData: setLineData,
                    setMedidas: setStattistics,
                  });
                  // Gera analise de desempenho
                  const response = await analise({
                    interval: { min: data.Min, max: data.Max },
                    medidas: statistics,
                  });
                  if (response) {
                    // Atribui a resposta à variavel de analise de desempenho
                    setAnalysis(response);
                    // Gera a analise de sentimentos
                    const feeling = await feel({ message: response });
                    if (feeling) {
                      // Atribui a resposta à variável de analise de sentimentos
                      setFeelings(feeling);
                    }
                  }
                }
              }
            })}
            className="flex flex-col gap-[20px] items-center"
          >
            <div className="flex flex-row items-center gap-[10px]">
              <input
                type="number"
                {...register("Min", {
                  required: {
                    value: true,
                    message: "Digite o primeiro semestre",
                  },
                  min: {
                    value: 1,
                    message: "Semestre inválido",
                  },
                  max: {
                    value: 10,
                    message: "Semestre inválido",
                  },
                })}
                className={field}
              ></input>
              <div className="bg-(--primary-color) w-[5px] h-[2px]"></div>
              <input
                type="number"
                {...register("Max", {
                  required: {
                    value: true,
                    message: "Digite o primeiro semestre",
                  },
                  min: {
                    value: 1,
                    message: "Semestre inválido",
                  },
                  max: {
                    value: 10,
                    message: "Semestre inválido",
                  },
                })}
                className={field}
              ></input>
              <span className={span}>{errors.Min?.message}</span>
            </div>
            <button
              className="bg-(--primary-color) text-white dark:text-(--bg-dark) big:w-[200px] big:h-[50px] big:text-xl w-[150px] h-[40px] whitespace-nowrap font-bold rounded-xl items-center cursor-pointer transition duration-300 hover:scale-105"
              type="submit"
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
      <div className="flex flex-row gap-[20px] justify-center">
        <div className="flex flex-col w-[500px] gap-[10px]">
          <h4 className={title}>Analise de desempenho</h4>
          <p className="whitespace-normal text-start text-[20px] text-(--primary-color) mb-[50px] px-[30px] py-[10px] rounded-[40px] drop-shadow-2xl bg-(--forms-bg-light) dark:bg-(--forms-bg-dark)">
            {analysis}
          </p>
        </div>
        <div className="flex flex-col w-[500px] gap-[10px]">
          <h4 className={title}>Analise de sentimentos</h4>
          <p className="whitespace-normal text-start text-[20px] text-(--primary-color) mb-[50px] px-[30px] py-[10px] rounded-[40px] drop-shadow-2xl bg-(--forms-bg-light) dark:bg-(--forms-bg-dark)">
            {feelings}
          </p>
        </div>
      </div>
    </div>
  );
}
