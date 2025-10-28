import { PhoneIcon, HomeIcon } from "@heroicons/react/16/solid";
import { useForm } from "react-hook-form";
import {
  UpdateAlteredData,
  type AlteredData,
} from "../../../server/updateAlteredData";
import { type popUp } from "../warning";

type warning = {
  set: React.Dispatch<React.SetStateAction<popUp | undefined>> | undefined;
  id: string;
};

function AlterData({ set, id }: warning) {
  //Declaração do useForm
  const {
    //função que permite adicionar validação aos inputs
    register,
    //funcao executada ao submeter o formulario
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      //Atribui valores padrões
      Email: "",
      Telefone: "",
      Logradouro: "",
      CEP: "",
      Numero: "",
      Cidade: "",
    },
  });

  const span = "text-bold text-red-600 font-md";

  const card =
    "flex flex-col min-w-[300px] sm:max-w-[600px] md:max-w-[760px] lg:max-w-[1000px] xl:max-w-[1200px] 2xl:max-w-[1500px] h-auto px-[30px] py-[10px] gap-y-[10px]";
  const titleArea =
    "flex flex-row items-center w-fit h-auto gap-x-[10px] whitespace-nowrap justify-start";
  const grid =
    "flex grid cols-1 sm:grid-cols-2 lg:grid-cols-4 big:grid-cols-1 big:md:grid-cols-2 items-center h-auto gap-y-[20px] sm:px-[10px] lg:px-[20px] py-[10px] justify-start sm:gap-x-[30px] md:gap-x-[40px]";
  const label =
    "text-(--primary-color) font-bold whitespace-nowrap text-xs lg:text-base big:text-lg";
  const field =
    "block py-[10px] px-[20px] font-bold text-(--primary-color) whitespace-nowrap rounded-full bg-(--forms-bg-light) dark:bg-(--forms-bg-dark) lg:text-sm xl:text-sm 2xl:text-xl big:text-3xl big:min-w-300px min-w-[300px] sm:min-w-[220px] md:min-w-[300px] lg:min-w-[220px] xl:min-w-[250px] 2xl:min-w-[300px]";
  return (
    <>
      <form
        className="py-[20px]"
        onSubmit={handleSubmit(async (data) => {
          {
            /*Se os campos não forem rejeitados, dados preenchidos nos campos são salvos na memória*/
          }
          if (
            data.Email &&
            data.Telefone &&
            data.Logradouro &&
            data.Numero &&
            data.Cidade &&
            data.CEP
          ) {
            let newData: AlteredData = {
              id: id,
              email: data.Email,
              telefone: Number(data.Telefone),
              logradouro: data.Logradouro.toString(),
              numero: Number(data.Numero),
              cidade: data.Cidade,
              cep: data.CEP,
            };
            if (await UpdateAlteredData(newData)) {
              if (set) {
                const data: popUp = {
                  title: "Sucesso",
                  content: "Mudanças salvas com sucesso",
                  show: true,
                  works: true,
                  set: set,
                };
                set(data);
              }
            } else {
              if (set) {
                const data: popUp = {
                  title: "Falha",
                  content: "Mudanças não salvas",
                  show: true,
                  works: false,
                  set: set,
                };
                set(data);
              }
            }
          }
        })}
      >
        {/*Lista que contém os inputs*/}
        <ul>
          <li>
            <div className={card}>
              <div className={titleArea}>
                <div className="flex flex-row items-center w-fit h-auto gap-x-[10px] whitespace-nowrap">
                  <PhoneIcon className="w-[30px] text-(--primary-color)" />
                  <h3 className="big:text-3xl text-2xl text-(--primary-color) font-bold">
                    Alterar Contato
                  </h3>
                </div>
              </div>
              <div className={grid}>
                <li className="flex flex-col items-start gap-[5px]">
                  {/*Campo de email*/}
                  <label className={label}>Email (ex: xxxxxx@gmail.com)</label>
                  {/*
                  - required: true, torna o campo obrigatorio
                  - pattern: valida o email digitado, neste caso, 
                  pode incluir letras, simbolos e numero
                  e deve incluir @xxxxx.com ao final
                  - message: mensagem de erro*/}
                  <input
                    type="email"
                    {...register("Email", {
                      required: true,
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|yahoo\.com)$/,
                        message: "Email inválido",
                      },
                    })}
                    className={field}
                  ></input>
                  {/*Exibe mensagem de erro, caso nao seja nulo*/}
                  <span className={span}>{errors.Email?.message}</span>
                </li>
                <li className="flex flex-col items-start gap-[5px]">
                  <label className={label}>Telefone (ex: 19974227325)</label>
                  {/*Campo de telefone
                - pattern: apenas numeros, 
                podendo ter entre 10 e 11 digitos, incluindo ddd*/}
                  <input
                    {...register("Telefone", {
                      required: true,
                      pattern: {
                        value: /^[0-9]{10,11}$/,
                        message: "Telefone inválido",
                      },
                    })}
                    className={field}
                  ></input>
                  <span className={span}>{errors.Telefone?.message}</span>
                </li>
              </div>
            </div>
          </li>
          <li>
            <div className={card}>
              <div className={titleArea}>
                <div className="flex flex-row items-center w-fit h-auto gap-x-[10px] whitespace-nowrap">
                  <HomeIcon className="w-[30px] text-(--primary-color)" />
                  <h3 className="big:text-3xl text-2xl text-(--primary-color) font-bold">
                    Alterar Endereço
                  </h3>
                </div>
              </div>
              <div className={grid}>
                <li className="flex flex-col items-start gap-[5px]">
                  <label className={label}>CEP (ex: 18085-842)</label>
                  <input
                    {...register("CEP", {
                      required: true,
                      pattern: {
                        value: /^[0-9-]{9}$/,
                        message: "CEP inválido",
                      },
                    })}
                    className={field}
                  ></input>
                  <span className={span}>{errors.CEP?.message}</span>
                </li>
                <li className="flex flex-col items-start gap-[5px]">
                  <label className={label}>Cidade (ex: Sorocaba)</label>
                  <input
                    {...register("Cidade", {
                      required: true,
                      pattern: {
                        value: /^[a-zA-ZÀ-ÿ\s]{2,50}$/i,
                        message: "Cidade inválida",
                      },
                    })}
                    className={field}
                  ></input>
                  <span className={span}>{errors.Cidade?.message}</span>
                </li>
                <li className="flex flex-col items-start gap-[5px]">
                  <label className={label}>Logradouro (ex: Rua XXXX)</label>
                  <input
                    {...register("Logradouro", {
                      required: true,
                      pattern: {
                        value: /^[\p{L}0-9\s.\-\/ºª,()]{3,100}$/u,
                        message: "Logradouro inválido",
                      },
                    })}
                    className={field}
                  ></input>
                  <span className={span}>{errors.Logradouro?.message}</span>
                </li>
                <li className="flex flex-col items-start gap-[5px]">
                  <label className={label}>Número</label>
                  <input
                    {...register("Numero", {
                      required: true,
                      pattern: {
                        value: /^[0-9]{1,4}$/,
                        message: "Numero inválido",
                      },
                    })}
                    className={field}
                  ></input>
                  <span className={span}>{errors.Numero?.message}</span>
                </li>
              </div>
            </div>
          </li>
        </ul>
        {/*Botao que chama a funcao atribuida ao formulario*/}
        <button
          type="submit"
          className="bg-(--primary-color) text-white dark:text-(--bg-dark) big:w-[200px] big:h-[50px] big:text-xl w-[150px] h-[40px] whitespace-nowrap font-bold rounded-xl items-center cursor-pointer transition duration-300 hover:scale-105"
        >
          Salvar mudanças
        </button>
      </form>
    </>
  );
}

export default AlterData;
