import { UserIcon, HomeIcon } from "@heroicons/react/16/solid";
import {
  GetPersonalData,
  GetAdressData,
  type Pessoas,
  type Endereco,
} from "../../../server/getRegisterData";
import { useEffect, useState } from "react";

type user = {
  id: string;
};

function RegisterData({ id }: user) {
  const [personalData, setPersonalData] = useState<Pessoas>();
  const [adressData, setAdressData] = useState<Endereco>();
  useEffect(() => {
    const loadData = async () => {
      const dadosPessoais = await GetPersonalData(id);
      const dadosEndereco = await GetAdressData(id);
      if (dadosPessoais) {
        setPersonalData(dadosPessoais[0]);
      }
      if (dadosEndereco) {
        setAdressData(dadosEndereco[0]);
      }
    };
    loadData();
  }, []);
  interface dataLabel {
    label: string;
    data: any;
  }
  const firstRow: dataLabel[] = [
    { label: "Nome", data: personalData?.name },
    { label: "CPF", data: personalData?.CPF },
    { label: "Email", data: personalData?.email },
    { label: "Telefone", data: personalData?.telefone },
    { label: "Sexo", data: personalData?.sexo },
    { label: "Data de Nascimento", data: personalData?.nascimento },
    { label: "Estado Civil", data: personalData?.civil },
    { label: "Cidade de Nascimento", data: personalData?.cidade },
  ];

  const address: dataLabel[] = [
    { label: "CEP", data: adressData?.CEP },
    { label: "Cidade", data: adressData?.cidade },
    { label: "Logradouro", data: adressData?.logradouro },
    { label: "Numero", data: adressData?.numero },
  ];

  const card =
    "flex flex-col min-w-[300px] sm:max-w-[600px] md:max-w-[760px] lg:max-w-[1000px] xl:max-w-[1200px] 2xl:max-w-[1500px] h-auto px-[30px] py-[10px] shadow-md gap-y-[10px]";
  const titleArea =
    "flex flex-row items-center w-fit h-auto gap-x-[10px] whitespace-nowrap justify-start";
  const grid =
    "flex grid cols-1 sm:grid-cols-2 lg:grid-cols-4 big:grid-cols-1 big:md:grid-cols-2 items-center h-auto gap-y-[20px] sm:px-[10px] lg:px-[20px] py-[10px] justify-start sm:gap-x-[30px] md:gap-x-[40px]";
  const label =
    "text-(--primary-color) font-bold whitespace-nowrap text-xs lg:text-base big:text-lg";
  const field =
    "block py-[10px] px-[20px] font-bold text-(--primary-color) whitespace-nowrap rounded-full bg-(--forms-bg-light) dark:bg-(--forms-bg-dark) lg:text-sm xl:text-sm 2xl:text-xl big:text-3xl big:min-w-300px min-w-[300px] sm:min-w-[220px] md:min-w-[300px] lg:min-w-[220px] xl:min-w-[250px] 2xl:min-w-[300px]";
  return (
    <ul>
      <li>
        <div className={card}>
          <div className={titleArea}>
            <div className="flex flex-row items-center w-fit h-auto gap-x-[10px] whitespace-nowrap">
              <UserIcon className="w-[30px] text-(--primary-color)" />
              <h3 className="sm:text-xl md:text-2xl big:text-3xl text-(--primary-color) font-bold">
                Dados Pessoais
              </h3>
            </div>
          </div>
          <div className={grid}>
            {firstRow.map((item) => (
              <li className="flex flex-col items-start gap-[5px]">
                <label className={label}>{item.label}</label>
                <p className={field}>{item.data}</p>
              </li>
            ))}
          </div>
        </div>
      </li>
      <li>
        <div className={card}>
          <div className={titleArea}>
            <div className="flex flex-row items-center w-fit h-auto gap-x-[10px] whitespace-nowrap">
              <HomeIcon className="w-[30px] text-(--primary-color)" />
              <h3 className="text-2xl big:text-3xl text-(--primary-color) font-bold">
                Endereço
              </h3>
            </div>
          </div>
          <div className={grid}>
            {address.map((item) => (
              <li className="flex flex-col items-start gap-[5px]">
                <label className={label}>{item.label}</label>
                <p className={field}>{item.data}</p>
              </li>
            ))}
          </div>
        </div>
      </li>
    </ul>
  );
}

export default RegisterData;
