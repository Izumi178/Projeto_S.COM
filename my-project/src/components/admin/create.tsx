import { type Aluno } from "../../getInstitutionalData";
import type { popUp } from "../warning";
import { useForm } from "react-hook-form";
import { type Endereco, type Pessoas } from "../../getRegisterData";
import { createAccount, editUser } from "../../adminActions";
import type { address, person } from "../../createAccount";

type userData = {
  close: React.Dispatch<React.SetStateAction<boolean>>;
  setPopUp: React.Dispatch<React.SetStateAction<popUp | undefined>> | undefined;
};

export default function CreateUser({ close, setPopUp }: userData) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Nome: "",
      Email: "",
      CPF: "",
      Nascimento: "",
      CidadeNatal: "",
      Telefone: "",
      Civil: "",
      Sexo: "",
      CEP: "",
      Logradouro: "",
      Cidade: "",
      Numero: "",
      EmailUNESP: "",
      Senha: "",
    },
  });
  const span = "text-bold text-red-600 font-md";
  const label =
    "text-(--primary-color) font-bold whitespace-nowrap text-xs lg:text-base big:text-lg";
  const field =
    "block py-[10px] px-[20px] font-bold text-(--primary-color) whitespace-nowrap rounded-full bg-(--forms-bg-light) dark:bg-(--forms-bg-dark) lg:text-sm xl:text-sm 2xl:text-xl big:text-3xl big:min-w-300px min-w-[300px] sm:min-w-[220px] md:min-w-[300px] lg:min-w-[220px] xl:min-w-[250px] 2xl:min-w-[300px]";
  return (
    <form
      className="absolute flex flex-col w-fit p-[40px] justify-center z-1000 rounded-[50px] items-center bg-gray-700 gap-[10px] translate-y-[50%]"
      onSubmit={handleSubmit(async (data) => {
        {
          const newPerson: person = {
            Nome: data.Nome,
            Email: data.Email,
            CPF: data.CPF,
            Telefone: data.Telefone,
            Sexo: data.Sexo,
            Nascimento: data.Nascimento,
            Civil: data.Civil,
            Cidade: data.CidadeNatal,
          };
          const newAddress: address = {
            CEP: data.CEP,
            Logradouro: data.Logradouro.toString(),
            Cidade: data.Cidade,
            Numero: Number(data.Numero),
          };
          const newInstitutional: Aluno = {
            RA: 0,
            pessoa_id: "",
            email: data.EmailUNESP,
            curso: "",
            semestre: 0,
            horas_curso: 0,
            horas_extensao: 0,
            horas_complementar: 0,
            horas_estagio: 0,
          };
          if (newPerson) {
            if (
              await createAccount({
                pers: newPerson,
                ad: newAddress,
                log: { email: data.EmailUNESP, senha: data.Senha },
                std: newInstitutional,
              })
            ) {
              if (setPopUp) {
                const warn: popUp = {
                  title: "Sucesso",
                  content: "Usuario criado com sucesso",
                  show: true,
                  works: true,
                  set: setPopUp,
                };
                setPopUp(warn);
              }
              close(true);
            } else {
              if (setPopUp) {
                const warn: popUp = {
                  title: "Erro",
                  content: "Houve algo de errado",
                  show: true,
                  works: false,
                  set: setPopUp,
                };
                setPopUp(warn);
              }
              close(true);
            }
          }
        }
      })}
    >
      <h2 className="text-(--primary-color) font-bold text-[40px]">
        Matricule-se
      </h2>
      <div className="grid grid-cols-2 gap-[20px]">
        <li className="flex flex-col items-start gap-[5px]">
          <label className={label}>Nome completo</label>
          <input
            type="text"
            {...register("Nome", {
              required: {
                value: true,
                message: "Digite seu nome completo",
              },
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
              required: { value: true, message: "Digite seu email" },
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
              required: { value: true, message: "Digite seu CPF" },
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
              required: { value: true, message: "Digite seu telefone" },
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
            {...register("CidadeNatal", {
              required: { value: true, message: "Digite sua cidae natal" },
              pattern: {
                value: /^[a-zA-ZÀ-ÿ\s]{2,50}$/,
                message: "Cidade inválida",
              },
            })}
            className={field}
          ></input>

          <span className={span}>{errors.CidadeNatal?.message}</span>
        </li>
        <li className="flex flex-col items-start gap-[5px]">
          <label className={label}>Data de nascimento</label>
          <input
            type="date"
            {...register("Nascimento", {
              required: {
                value: true,
                message: "Selecione uma data de nascimento",
              },
            })}
            className={field}
          ></input>

          <span className={span}>{errors.Nascimento?.message}</span>
        </li>
        <li className="flex flex-col items-start gap-[5px]">
          <label className={label}>Sexo</label>
          <select
            {...register("Sexo", {
              required: { value: true, message: "Selecione seu sexo" },
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
              required: {
                value: true,
                message: "Selecione seu estado civil",
              },
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
      <div className="grid grid-cols-2 gap-[20px]">
        <li className="flex flex-col items-start gap-[5px]">
          <label className={label}>CEP (ex: 18085842)</label>
          <input
            {...register("CEP", {
              required: { value: true, message: "Digite seu CEP" },
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
          <label className={label}>Cidade de residência</label>
          <input
            {...register("Cidade", {
              required: {
                value: true,
                message: "Digite sua cidade de residência",
              },
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
            type="text"
            {...register("Logradouro", {
              required: {
                value: true,
                message: "Digite sua rua, avenida, etc.",
              },
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
              required: {
                value: true,
                message: "Digite o número da sua residência",
              },
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
      <div className="grid grid-cols-2 gap-[20px]">
        <li className="flex flex-col items-start gap-[5px]">
          <label className={label}>Email institucional (xxxxx@unesp.br)</label>
          <input
            type="text"
            {...register("EmailUNESP", {
              required: {
                value: true,
                message: "Crie um email institucional",
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@(unesp\.br)$/,
                message: "Email inválido",
              },
            })}
            className={field}
          ></input>
          <span className={span}>{errors.Email?.message}</span>
        </li>
        <li className="flex flex-col items-start gap-[5px]">
          <label className={label}>Senha</label>

          <input
            type="password"
            {...register("Senha", {
              required: { value: true, message: "Crie uma senha" },
              minLength: {
                value: 8,
                message: "Sua senha deve conter no mínimo 8 caracteres",
              },
            })}
            className={field}
          ></input>
          <span className={span}>{errors.Senha?.message}</span>
        </li>
      </div>
      <div className="flex flex-row justify-center gap-[20px]">
        <button
          onClick={() => {
            close(true);
          }}
          className="mt-[20px] bg-red-500 text-white dark:text-(--bg-dark) big:w-[200px] big:h-[50px] big:text-xl w-[150px] h-[40px] whitespace-nowrap font-bold rounded-xl items-center cursor-pointer transition duration-300 hover:scale-105"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="mt-[20px] bg-green-400 text-white dark:text-(--bg-dark) big:w-[200px] big:h-[50px] big:text-xl w-[150px] h-[40px] whitespace-nowrap font-bold rounded-xl items-center cursor-pointer transition duration-300 hover:scale-105"
        >
          Criar usuario
        </button>
      </div>
    </form>
  );
}
