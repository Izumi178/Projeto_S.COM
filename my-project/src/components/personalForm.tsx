import { useForm } from "react-hook-form";
import { type person } from "../createAccount";
type seiLa = {
  changePage: React.Dispatch<React.SetStateAction<number>>;
  setPerson: React.Dispatch<React.SetStateAction<person | undefined>>;
};
export default function PersonalForm({ changePage, setPerson }: seiLa) {
  const {
    //função que permite adicionar validação aos inputs
    register,
    //funcao executada ao submeter o formulario
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      //Atribui valores padrões
      Nome: "",
      Email: "",
      CPF: "",
      Nascimento: "",
      Cidade: "",
      Telefone: "",
      Civil: "",
      Sexo: "",
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
      onSubmit={handleSubmit((data) => {
        {
          if (data) {
            changePage(2);
            setPerson(data);
          }
        }
      })}
    >
      <div className="grid grid-cols-2 gap-[20px]">
        <li className="flex flex-col items-start gap-[5px]">
          <label className={label}>Nome completo</label>
          <input
            type="text"
            {...register("Nome", {
              required: true,
              pattern: {
                value: /^[a-zA-ZÀ-ÿ\s]{10,50}$/i,
                message: "Nome inválido",
              },
            })}
            className={field}
          ></input>

          <span className={span}>{errors.Nome?.message}</span>
        </li>
        <li className="flex flex-col items-start gap-[5px]">
          <label className={label}>Email</label>

          <input
            type="text"
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

          <span className={span}>{errors.Email?.message}</span>
        </li>
        <li className="flex flex-col items-start gap-[5px]">
          <label className={label}>CPF (XXX.XXX.XXX-XX)</label>

          <input
            type="text"
            {...register("CPF", {
              required: true,
              pattern: {
                value: /^[0-9.-]{14}$/i,
                message: "CPF inválido",
              },
            })}
            className={field}
          ></input>

          <span className={span}>{errors.CPF?.message}</span>
        </li>
        <li className="flex flex-col items-start gap-[5px]">
          <label className={label}>Telefone</label>

          <input
            type="text"
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
        <li className="flex flex-col items-start gap-[5px]">
          <label className={label}>Cidade Natal</label>

          <input
            type="text"
            {...register("Cidade", {
              required: true,
            })}
            className={field}
          ></input>

          <span className={span}>{errors.Cidade?.message}</span>
        </li>
        <li className="flex flex-col items-start gap-[5px]">
          <label className={label}>Data de nascimento</label>

          <input
            type="date"
            {...register("Nascimento", {
              required: true,
            })}
            className={field}
          ></input>

          <span className={span}>{errors.Nascimento?.message}</span>
        </li>
        <li className="flex flex-col items-start gap-[5px]">
          <label className={label}>Sexo</label>
          <select
            {...register("Sexo", {
              required: true,
            })}
            className={field}
          >
            <option>Masculino</option>
            <option>Feminino</option>
            <option>Outro</option>
          </select>

          <span className={span}>{errors.Sexo?.message}</span>
        </li>
        <li className="flex flex-col items-start gap-[5px]">
          <label className={label}>Estado Civil</label>
          <select
            {...register("Civil", {
              required: true,
            })}
            className={field}
          >
            <option>Solteiro</option>
            <option>Casado</option>
            <option>Divorciado</option>
            <option>Viúvo</option>
          </select>
          <span className={span}>{errors.Civil?.message}</span>
        </li>
      </div>

      <button
        type="submit"
        className="mt-[20px] bg-(--primary-color) text-white dark:text-(--bg-dark) big:w-[200px] big:h-[50px] big:text-xl w-[150px] h-[40px] whitespace-nowrap font-bold rounded-xl items-center cursor-pointer transition duration-300 hover:scale-105"
      >
        Próximo
      </button>
    </form>
  );
}
