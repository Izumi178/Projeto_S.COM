import { PhoneIcon, HomeIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

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
  const [phoneReal, phoneValidator] = useState(false);
  const [emailReal, emailValidator] = useState(false);
  const [CEPReal, CEPValidator] = useState(false);
  function handleCEP(e: React.ChangeEvent<HTMLInputElement>) {
    const cep = e.target.value;
    if (/^\\d+$/.test(cep) && cep.length === 8) {
      CEPValidator(true);
    } else {
      CEPValidator(false);
    }
  }
  function handlePhone(e: React.ChangeEvent<HTMLInputElement>) {
    const phone = e.target.value;
    if (/^\\d+$/.test(phone) && phone.length >= 8) {
      phoneValidator(true);
    } else {
      phoneValidator(false);
    }
  }
  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    const cep = e.target.value;
    if (/^\\d+$/.test(cep) && cep.length >= 8) {
      emailValidator(true);
    } else {
      emailValidator(false);
    }
  }
  return (
    <ul>
      <li>
        <div className="flex flex-col min-width-[300px] md:min-width-[700px] h-auto pb-[20px] px-[30px] gap-y-[10px]">
          <div className="flex flex-row items-center min-width-[300px] md:min-width-[700px] h-auto px-[30px] py-[20px]  justify-between">
            <div className="flex flex-row items-center w-fit h-auto gap-x-[10px] whitespace-nowrap">
              <PhoneIcon className="w-[30px] text-(--primary-color)" />
              <h3 className="text-2xl text-(--primary-color) font-bold">
                Alterar Contato
              </h3>
            </div>
          </div>
          <ul className="flex flex-row items-center min-width-[300px] md:min-width-[700px] h-auto px-[40px] py-[10px] justify-start gap-[40px]">
            {contact.map((item) => (
              <li className="flex flex-col items-start gap-[5px]">
                <label className="text-(--primary-color) font-bold">
                  {item.label}
                </label>
                <input
                  id={item.label}
                  type={item.label === "Email" ? "email" : "tel"}
                  className="bg-(--forms-bg-light) dark:bg-(--forms-bg-dark) px-[20px] py-[10px] min-w-[100px] rounded-full text-(--primary-color) font-bold"
                  onChange={item.label === "Phone" ? handlePhone : handleEmail}
                ></input>
                <span
                  className={
                    (item.label === "Email" && emailReal) ||
                    (item.label === "Telefone" && phoneReal)
                      ? "hidden"
                      : span
                  }
                >
                  {item.label + " inválido"}
                </span>
              </li>
            ))}
          </ul>
          <button className="bg-(--primary-color) text-white dark:text-(--bg-dark) w-[150px] h-[40px] whitespace-nowrap font-bold rounded-xl items-center cursor-pointer transition duration-300 hover:scale-105">
            Salvar mudanças
          </button>
        </div>
      </li>
      <li>
        <div className="flex flex-col min-width-[300px] md:min-width-[700px] h-auto pb-[20px] px-[30px] gap-y-[10px]">
          <div className="flex flex-row items-center min-width-[300px] md:min-width-[700px] h-auto  py-[20px] justify-between">
            <div className="flex flex-row items-center w-fit h-auto gap-x-[10px] whitespace-nowrap">
              <HomeIcon className="w-[30px] text-(--primary-color)" />
              <h3 className="text-2xl text-(--primary-color) font-bold">
                Alterar Endereço
              </h3>
            </div>
          </div>
          <ul className="flex flex-row items-center min-width-[300px] md:min-width-[700px] h-auto px-[40px] py-[10px] justify-start gap-[20px] md:gap-[40px]">
            {address.map((item) => (
              <li className="flex flex-col items-start gap-[5px]">
                <label className="text-(--primary-color) font-bold">
                  {item.label}
                </label>
                <input
                  id={item.label}
                  type="text"
                  className="bg-(--forms-bg-light) dark:bg-(--forms-bg-dark) px-[20px] py-[10px] min-w-[100px] rounded-full text-(--primary-color) font-bold"
                ></input>
                <span className={CEPReal ? "hidden" : span}>
                  {item.label === "CEP" && "CEP inválido"}
                </span>
              </li>
            ))}
          </ul>
          <button className="bg-(--primary-color) text-white dark:text-(--bg-dark) w-[150px] h-[40px] whitespace-nowrap font-bold rounded-xl items-center cursor-pointer transition duration-300 hover:scale-105">
            Salvar mudanças
          </button>
        </div>
      </li>
    </ul>
  );
}

export default AlterData;
