import { PhoneIcon, HomeIcon } from "@heroicons/react/16/solid";

function AlterData() {
  interface dataLabel {
    label: string;
    data: string;
  }
  const contact: dataLabel[] = [
    { label: "Email:", data: "gabriel.izumi17@gmail.com" },
    { label: "Telefone:", data: "(19) 97422-7325" },
  ];

  const address: dataLabel[] = [
    { label: "CEP", data: "18085-846" },
    { label: "Cidade", data: "Sorocaba" },
    { label: "Logradouro", data: "Rua Ottília Wey Pereira" },
    { label: "Número", data: "128" },
  ];

  return (
    <ul>
      <li>
        <div className="flex flex-col min-width-[400px] md:min-width-[700px] h-auto pb-[20px] shadow-md">
          <div className="flex flex-row items-center min-width-[400px] md:min-width-[700px] h-auto px-[30px] py-[20px]  justify-between">
            <div className="flex flex-row items-center w-fit h-auto gap-x-[10px] whitespace-nowrap">
              <PhoneIcon className="w-[30px] text-(--primary-color)" />
              <h3 className="text-2xl text-(--primary-color) font-bold">
                Alterar Contato
              </h3>
            </div>
          </div>
          <ul className="flex flex-row items-center min-width-[400px] md:min-width-[700px] h-auto px-[40px] py-[10px] justify-start gap-[40px]">
            {contact.map((item) => (
              <li className="flex flex-col items-start gap-[5px]">
                <label className="text-(--primary-color) font-bold">
                  {item.label}
                </label>
                <input
                  type={item.label === "email" ? "email" : "tel"}
                  className="bg-gray-200 px-[20px] py-[10px] min-w-[100px] rounded-full text-(--primary-color) font-bold"
                ></input>
              </li>
            ))}
          </ul>
          <button></button>
        </div>
      </li>
      <li>
        <div className="flex flex-col min-width-[400px] md:min-width-[700px] h-auto pb-[20px]">
          <div className="flex flex-row items-center min-width-[400px] md:min-width-[700px] h-auto px-[30px] py-[20px] justify-between">
            <div className="flex flex-row items-center w-fit h-auto gap-x-[10px] whitespace-nowrap">
              <HomeIcon className="w-[30px] text-(--primary-color)" />
              <h3 className="text-2xl text-(--primary-color) font-bold">
                Alterar Endereço
              </h3>
            </div>
          </div>
          <ul className="flex flex-row items-center min-width-[400px] md:min-width-[700px] h-auto px-[40px] py-[10px] justify-start gap-[20px] md:gap-[40px]">
            {address.map((item) => (
              <li className="flex flex-col items-start gap-[5px]">
                <label className="text-(--primary-color) font-bold">
                  {item.label}
                </label>
                <p className="block py-[10px] text-smc md:text-lg whitespace-nowrap sm:px-[10px] md:px-[20px] bg-gray-200 min-w-[150px] md:min-w-[250px] rounded-full text-(--primary-color) font-bold">
                  {item.data}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </li>
    </ul>
  );
}

export default AlterData;
