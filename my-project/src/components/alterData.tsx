import { PhoneIcon, HomeIcon } from "@heroicons/react/16/solid";
import { useForm } from "react-hook-form";

function AlterData() {
  const span = "text-bold text-red-600 font-md";
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Email: "",
      Telefone: "",
      CEP: "",
      Numero: "",
      Cidade: "",
    },
  });

  const card =
    "flex flex-col min-w-[300px] sm:max-w-[600px] md:max-w-[760px] lg:max-w-[1000px] xl:max-w-[1200px] 2xl:max-w-[1500px] h-auto px-[30px] py-[10px] shadow-md gap-y-[10px]";
  const titleArea =
    "flex flex-row items-center w-fit h-auto gap-x-[10px] whitespace-nowrap justify-start";
  const grid =
    "flex grid cols-1 sm:grid-cols-2 lg:grid-cols-4 items-start h-auto gap-y-[20px] sm:px-[10px] lg:px-[20px] py-[10px] justify-start sm:gap-x-[30px] md:gap-x-[40px]";
  const label =
    "text-(--primary-color) font-bold whitespace-nowrap text-xs lg:text-base";
  const field =
    "block py-[10px] px-[20px] font-bold text-(--primary-color) whitespace-nowrap rounded-full bg-(--forms-bg-light) dark:bg-(--forms-bg-dark) lg:text-sm xl:text-sm 2xl:text-xl min-w-[300px] sm:min-w-[220px] md:min-w-[300px] lg:min-w-[220px] xl:min-w-[250px] 2xl:min-w-[300px]";
  return (
    <ul>
      <li>
        <div className={card}>
          <div className={titleArea}>
            <div className="flex flex-row items-center w-fit h-auto gap-x-[10px] whitespace-nowrap">
              <PhoneIcon className="w-[30px] text-(--primary-color)" />
              <h3 className="text-2xl text-(--primary-color) font-bold">
                Alterar Contato
              </h3>
            </div>
          </div>
          <div className={grid}>
            <li className="flex flex-col items-start gap-[5px]">
              <label className={label}>Email (ex: xxxxxx@gmail.com)</label>
              <input
                type="email"
                {...register("Email", {
                  required: true,
                  pattern:
                    /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook.com|yahoo.com){11,50}$/i,
                })}
                className={field}
              ></input>
              <span className={span}>
                {errors.Email
                  ? errors.Email?.message
                  : ((!watch("Email").includes("@gmail.com") &&
                      !watch("Email").includes("@outlook.com") &&
                      !watch("Email").includes("@yahoo.com")) ||
                      watch("Email").length < 15 ||
                      /^\d+$/.test(watch("Email").split("@")[0])) &&
                    "Email inválido"}
              </span>
            </li>
            <li className="flex flex-col items-start gap-[5px]">
              <label className={label}>Telefone (ex: 19974227325)</label>
              <input
                {...register("Telefone", {
                  required: true,
                  pattern: /^[0-9]{10,11}$/,
                })}
                className={field}
              ></input>
              <span className={span}>
                {(watch("Telefone").length < 10 ||
                  watch("Telefone").length > 11 ||
                  !/^\d+$/.test(watch("Telefone"))) &&
                  "Telefone inválido"}
              </span>
            </li>
          </div>
        </div>
      </li>
      <li>
        <div className={card}>
          <div className={titleArea}>
            <div className="flex flex-row items-center w-fit h-auto gap-x-[10px] whitespace-nowrap">
              <HomeIcon className="w-[30px] text-(--primary-color)" />
              <h3 className="text-2xl text-(--primary-color) font-bold">
                Alterar Endereço
              </h3>
            </div>
          </div>
          <div className={grid}>
            <li className="flex flex-col items-start gap-[5px]">
              <label className={label}>CEP (ex: 18085842)</label>
              <input
                {...register("CEP", {
                  required: true,
                  pattern: /^[0-9]{8}$/,
                })}
                className={field}
              ></input>
              <span className={span}>
                {(watch("CEP").length != 8 || !/^\d+$/.test(watch("CEP"))) &&
                  "CEP inválido"}
              </span>
            </li>
            <li className="flex flex-col items-start gap-[5px]">
              <label className={label}>Cidade (ex: Sorocaba)</label>
              <input
                {...register("Cidade", {
                  required: true,
                  pattern: /^[a-zA-Z]{5,20}$/i,
                })}
                className={field}
              ></input>
              <span className={span}>
                {errors.Cidade
                  ? errors.Cidade?.message
                  : (watch("Cidade").length < 5 ||
                      watch("Cidade").length > 20) &&
                    "Cidade inválido"}
              </span>
            </li>
            <li className="flex flex-col items-start gap-[5px]">
              <label className={label}>Logradouro (ex: Rua XXXX)</label>
              <input className={field}></input>
            </li>
            <li className="flex flex-col items-start gap-[5px]">
              <label className={label}>Número</label>
              <input
                {...register("Numero", {
                  required: true,
                  pattern: /^[0-9]{1,4}$/,
                })}
                className={field}
              ></input>
              <span className={span}>
                {errors.Numero
                  ? errors.Numero?.message
                  : (watch("Numero").length < 1 ||
                      watch("Numero").length > 4 ||
                      !/^\d+$/.test(watch("Numero"))) &&
                    "Numero inválido"}
              </span>
            </li>
          </div>
          <button className="bg-(--primary-color) text-white dark:text-(--bg-dark) w-[150px] h-[40px] whitespace-nowrap font-bold rounded-xl items-center cursor-pointer transition duration-300 hover:scale-105">
            Salvar mudanças
          </button>
        </div>
      </li>
    </ul>
  );
}

export default AlterData;
