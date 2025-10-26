import { useForm } from "react-hook-form";
import { type address } from "../createAccount";
type seiLa = {
  changePage: React.Dispatch<React.SetStateAction<number>>;
  setAddress: React.Dispatch<React.SetStateAction<address | undefined>>;
};
export default function AddressForm({ changePage, setAddress }: seiLa) {
  const {
    //função que permite adicionar validação aos inputs
    register,
    //funcao executada ao submeter o formulario
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      //Atribui valores padrões
      CEP: "",
      Logradouro: "",
      Cidade: "",
      Numero: "",
    },
  });
  const span = "text-bold text-red-600 font-md";
  const label =
    "text-(--primary-color) font-bold whitespace-nowrap text-xs lg:text-base big:text-lg";
  const field =
    "block py-[10px] px-[20px] font-bold text-(--primary-color) whitespace-nowrap rounded-full bg-(--forms-bg-light) dark:bg-(--forms-bg-dark) lg:text-sm xl:text-sm 2xl:text-xl big:text-3xl big:min-w-300px min-w-[300px] sm:min-w-[220px] md:min-w-[300px] lg:min-w-[220px] xl:min-w-[250px] 2xl:min-w-[300px]";
  return (
    <form
      className="py-[20px] "
      onSubmit={handleSubmit(async (data) => {
        {
          /*Se os campos não forem rejeitados, dados preenchidos nos campos são salvos na memória*/
          changePage(3);
          setAddress(data);
        }
      })}
    >
      <div className="grid grid-cols-2 gap-[20px]">
        <li className="flex flex-col items-start gap-[5px]">
          <label className={label}>CEP (ex: 18085842)</label>
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
      <div className="flex flex-row justify-center gap-[20px]">
        <button
          onClick={() => {
            changePage(1);
          }}
          className="mt-[20px] bg-(--primary-color) text-white dark:text-(--bg-dark) big:w-[200px] big:h-[50px] big:text-xl w-[150px] h-[40px] whitespace-nowrap font-bold rounded-xl items-center cursor-pointer transition duration-300 hover:scale-105"
        >
          Anterior
        </button>
        <button
          type="submit"
          className="mt-[20px] bg-(--primary-color) text-white dark:text-(--bg-dark) big:w-[200px] big:h-[50px] big:text-xl w-[150px] h-[40px] whitespace-nowrap font-bold rounded-xl items-center cursor-pointer transition duration-300 hover:scale-105"
        >
          Próximo
        </button>
      </div>
    </form>
  );
}
