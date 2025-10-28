import { useForm } from "react-hook-form";
import { AuthLogin } from "../../server/authLogin";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PopUp, { type popUp } from "../components/warning";
export default function Login() {
  const navigate = useNavigate();
  const [warning, setPopUp] = useState<popUp>();
  useEffect(() => {
    const setWarning = () => {
      const war: popUp = {
        title: undefined,
        content: undefined,
        show: false,
        works: undefined,
        set: setPopUp,
      };
      setPopUp(war);
    };
    setWarning();
  }, []);
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
      Senha: "",
    },
  });
  const span = "text-bold text-red-600 font-md";
  const label =
    "text-(--primary-color) font-bold whitespace-nowrap text-xs lg:text-base big:text-lg";
  const field =
    "block py-[10px] px-[20px] font-bold text-(--primary-color) whitespace-nowrap rounded-full bg-(--forms-bg-light) dark:bg-(--forms-bg-dark) lg:text-sm xl:text-sm 2xl:text-xl big:text-3xl big:min-w-300px min-w-[300px] sm:min-w-[220px] md:min-w-[300px] lg:min-w-[220px] xl:min-w-[250px] 2xl:min-w-[300px]";
  return (
    <div className="flex flex-col w-full min-h-screen pb-[100px] items-center pt-[200px] bg-white dark:bg-(--bg-dark)">
      <div className="flex flex-col w-[500px] h-auto items-center justify-center bg-white dark:bg-(--bg-dark) rounded-[40px] drop-shadow-2xl p-[20px]">
        <h2 className="text-(--primary-color) font-bold text-[40px]">Login</h2>
        <form
          className="py-[20px] gap-[20px]"
          onSubmit={handleSubmit(async (data) => {
            {
              /*Se os campos não forem rejeitados, dados preenchidos nos campos são salvos na memória*/
            }
            if (data.Email && data.Senha) {
              if (await AuthLogin({ email: data.Email, senha: data.Senha })) {
                navigate("/", { replace: true });
              } else {
                if (setPopUp) {
                  const data: popUp = {
                    title: "Falha",
                    content: "Credenciais não correspondem",
                    show: true,
                    works: false,
                    set: setPopUp,
                  };
                  setPopUp(data);
                }
              }
            }
          })}
        >
          <li className="flex flex-col items-start gap-[5px]">
            {/*Campo de email*/}
            <label className={label}>Email</label>
            {/*
                  - required: true, torna o campo obrigatorio
                  - pattern: valida o email digitado, neste caso, 
                  pode incluir letras, simbolos e numero
                  e deve incluir @xxxxx.com ao final
                  - message: mensagem de erro*/}
            <input
              type="Email"
              {...register("Email", {
                required: {
                  value: true,
                  message: "Digite seu email institucional",
                },
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
                required: { value: true, message: "Digite sua senha" },
              })}
              className={field}
            ></input>
            {/*Exibe mensagem de erro, caso nao seja nulo*/}
            <span className={span}>{errors.Senha?.message}</span>
          </li>
          <button
            type="submit"
            className="my-[20px] bg-(--primary-color) text-white dark:text-(--bg-dark) big:w-[200px] big:h-[50px] big:text-xl w-[150px] h-[40px] whitespace-nowrap font-bold rounded-xl items-center cursor-pointer transition duration-300 hover:scale-105"
          >
            Entrar
          </button>
          <br></br>
          <Link
            className="mt-[20px] underline text-(--primary-color)"
            to="/signIn"
          >
            Crie sua conta UNESP
          </Link>
          <br></br>
          <Link
            className="mt-[20px] underline text-(--primary-color)"
            to="/forgotPassword"
          >
            Esqueci minha senha
          </Link>
        </form>
      </div>
      {warning?.show && (
        <PopUp
          title={warning?.title}
          content={warning?.content}
          show={warning?.show}
          works={warning?.works}
          set={warning?.set}
        ></PopUp>
      )}
    </div>
  );
}
