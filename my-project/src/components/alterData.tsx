import { PhoneIcon, HomeIcon } from "@heroicons/react/16/solid";
import { useForm } from "react-hook-form";

function AlterData() {
  interface dataLabel {
    label: string;
    data: string;
  }
  const contact: dataLabel[] = [
    { label: "Email", data: "gabriel.izumi17@gmail.com" },
    { label: "Telefone", data: "(19) 97422-7325" },
  ];
  const address: dataLabel[] = [
    { label: "CEP", data: "18085-846" },
    { label: "Cidade", data: "Sorocaba" },
    { label: "Logradouro", data: "Rua Ottília Wey Pereira" },
    { label: "Número", data: "128" },
  ];
  const span = "text-bold text-red-600 font-md";

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
            {contact.map((item) => (
              <li className="flex flex-col items-start gap-[5px]">
                <label className={label}>{item.label}</label>
                <input id={item.label} className={field}></input>
                <span>{item.label + " inválido"}</span>
              </li>
            ))}
          </div>
          <button className="bg-(--primary-color) text-white dark:text-(--bg-dark) w-[150px] h-[40px] whitespace-nowrap font-bold rounded-xl items-center cursor-pointer transition duration-300 hover:scale-105">
            Salvar mudanças
          </button>
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
            {address.map((item) => (
              <li className="flex flex-col items-start gap-[5px]">
                <label className={label}>{item.label}</label>
                <input id={item.label} type="text" className={field}></input>
                <span></span>
              </li>
            ))}
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
