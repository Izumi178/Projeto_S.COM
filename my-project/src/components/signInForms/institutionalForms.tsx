import { useForm } from "react-hook-form";
import {
  CreateAccount,
  type address,
  type login,
  type person,
} from "../../createAccount";
import type { popUp } from "../warning";
type seiLa = {
  changePage: React.Dispatch<React.SetStateAction<number>>;
  pers: person | undefined;
  ad: address | undefined;
  setPopUp: React.Dispatch<React.SetStateAction<popUp | undefined>> | undefined;
};
export default function InstitutionalForm({
  changePage,
  pers,
  ad,
  setPopUp,
}: seiLa) {
  const {
    register,

    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
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
          if (
            data.Email != data.ConfirmEmail ||
            data.Senha != data.ConfirmSenha
          ) {
            if (setPopUp) {
              const data: popUp = {
                title: "Falha",
                content: "Sua conta UNESP não foi criada, tente novamente",
                show: true,
                works: false,
                set: setPopUp,
              };
              setPopUp(data);
            }
          } else {
            const log: login = {
              email: data.Email,
              senha: data.Senha,
            };
            if (pers && ad) {
              if (await CreateAccount({ pers, ad, log })) {
                if (setPopUp) {
                  const data: popUp = {
                    title: "Sucesso",
                    content: "Sua conta UNESP foi criada com sucesso",
                    show: true,
                    works: true,
                    set: setPopUp,
                    goToLogin: true,
                  };
                  setPopUp(data);
                }
              } else {
                if (setPopUp) {
                  const data: popUp = {
                    title: "Falha",
                    content: "Sua conta UNESP não foi criada, tente novamente",
                    show: true,
                    works: false,
                    set: setPopUp,
                  };
                  setPopUp(data);
                }
              }
            }
          }
        }
      })}
    >
      <div className="grid grid-cols-2 gap-[20px]">
        <li className="flex flex-col items-start gap-[5px]">
          <label className={label}>Email institucional (xxxxx@unesp.br)</label>
          <input
            type="text"
            {...register("Email", {
              required: { value: true, message: "Crie um email institucional" },
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
          <label className={label}>Confirmar Email</label>
          <input
            type="text"
            {...register("ConfirmEmail", {
              required: { value: true, message: "Confirme seu email" },
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
        <li className="flex flex-col items-start gap-[5px]">
          <label className={label}>Confirmar Senha</label>

          <input
            type="password"
            {...register("ConfirmSenha", {
              required: { value: true, message: "Confirme sua senha" },
            })}
            className={field}
          ></input>

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
