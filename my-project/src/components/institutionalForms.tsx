import { useForm } from "react-hook-form";
import {
  CreateAccount,
  type address,
  type login,
  type person,
} from "../createAccount";
type seiLa = {
  changePage: React.Dispatch<React.SetStateAction<number>>;
  pers: person | undefined;
  ad: address | undefined;
};
export default function InstitutionalForm({ changePage, pers, ad }: seiLa) {
  const {
    //função que permite adicionar validação aos inputs
    register,
    //funcao executada ao submeter o formulario
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      //Atribui valores padrões
      Email: "",
      ConfirmEmail: "",
      Senha: "",
      ConfirmSenha: "",
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
          if (
            data.Email != data.ConfirmEmail ||
            data.Senha != data.ConfirmSenha
          ) {
            console.log("oi");
          } else {
            const log: login = {
              email: data.Email,
              senha: data.Senha,
            };
            if (pers && ad) {
              await CreateAccount({ pers, ad, log });
            }
          }
        }
      })}
    >
      <div className="grid grid-cols-2 gap-[20px]">
        <li className="flex flex-col items-start gap-[5px]">
          {/*Campo de email*/}
          <label className={label}>Email institucional (xxxxx@unesp.br)</label>
          <input
            type="text"
            {...register("Email", {
              required: true,
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@(unesp\.br)$/,
                message: "Email inválido",
              },
            })}
            className={field}
          ></input>
          {/*Exibe mensagem de erro, caso nao seja nulo*/}
          <span className={span}>{errors.Email?.message}</span>
        </li>
        <li className="flex flex-col items-start gap-[5px]">
          {/*Campo de email*/}
          <label className={label}>Confirmar Email</label>

          <input
            type="text"
            {...register("ConfirmEmail", {
              required: true,
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@(unesp\.br)$/,
                message: "Email inválido",
              },
            })}
            className={field}
          ></input>
          {/*Exibe mensagem de erro, caso nao seja nulo*/}
          <span className={span}>{errors.Email?.message}</span>
        </li>
        <li className="flex flex-col items-start gap-[5px]">
          {/*Campo de email*/}
          <label className={label}>Senha</label>
          {/*
                  - required: true, torna o campo obrigatorio
                  - pattern: valida o email digitado, neste caso, 
                  pode incluir letras, simbolos e numero
                  e deve incluir @xxxxx.com ao final
                  - message: mensagem de erro*/}
          <input
            type="password"
            {...register("Senha", {
              required: true,
              minLength: 8,
              maxLength: 50,
            })}
            className={field}
          ></input>
          {/*Exibe mensagem de erro, caso nao seja nulo*/}
          <span className={span}>{errors.Senha?.message}</span>
        </li>
        <li className="flex flex-col items-start gap-[5px]">
          {/*Campo de email*/}
          <label className={label}>Confirmar Senha</label>
          {/*
                  - required: true, torna o campo obrigatorio
                  - pattern: valida o email digitado, neste caso, 
                  pode incluir letras, simbolos e numero
                  e deve incluir @xxxxx.com ao final
                  - message: mensagem de erro*/}
          <input
            type="password"
            {...register("ConfirmSenha", {
              required: true,
              minLength: 8,
              maxLength: 50,
            })}
            className={field}
          ></input>
          {/*Exibe mensagem de erro, caso nao seja nulo*/}
          <span className={span}>{errors.Senha?.message}</span>
        </li>
      </div>
      <div className="flex flex-row justify-center gap-[20px]">
        <button
          onClick={() => {
            changePage(2);
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
