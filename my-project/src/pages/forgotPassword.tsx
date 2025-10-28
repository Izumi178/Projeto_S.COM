import { Link } from "react-router-dom";
export default function ForgotPassword() {
  return (
    <div className="flex flex-col w-full min-h-screen pb-[100px] items-center pt-[200px] bg-white dark:bg-(--bg-dark)">
      <div className="flex flex-col w-[500px] h-auto items-center justify-center bg-white dark:bg-(--bg-dark) rounded-[40px] drop-shadow-2xl p-[20px]">
        <h2 className="text-(--primary-color) font-bold text-[40px]">
          Esqueci minha senha
        </h2>
        <p>
          Pagina em desenvolvimento, consulte o desenvolvedor para alterar a
          senha
        </p>
        <Link
          className="mt-[20px] underline text-(--primary-color)"
          to="/login"
        >
          Retornar ao Login
        </Link>
      </div>
    </div>
  );
}
