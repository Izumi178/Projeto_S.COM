import { UserIcon, HomeIcon } from "@heroicons/react/16/solid";

function RegisterData() {
  interface dataLabel {
    label: string;
    data: string;
  }
  const firstRow: dataLabel[] = [
    { label: "Nome:", data: "Gabriel Kazuo Izumi" },
    { label: "CPF:", data: "488.123.498-62" },
    { label: "Email:", data: "gabriel.izumi17@gmail.com" },
    { label: "Telefone:", data: "(19) 97422-7325" },
  ];

  const secondRow: dataLabel[] = [
    { label: "Sexo:", data: "Masculino" },
    { label: "Data de Nascimento:", data: "17/02/2005" },
    { label: "Estado Civil:", data: "Solteiro" },
    { label: "Cidade de Nascimento:", data: "Campinas" },
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
        <div className="flex flex-col min-width-[1000px] h-auto pb-[20px] shadow-md">
          <div className="flex flex-row items-center min-w-[1000px] h-auto px-[30px] py-[20px]  justify-between">
            <div className="flex flex-row items-center w-fit h-auto gap-x-[10px] whitespace-nowrap">
              <UserIcon className="w-[30px] text-(--primary-color)" />
              <h3 className="text-2xl text-(--primary-color) font-bold">
                Dados Pessoais
              </h3>
            </div>
          </div>
          <ul className="flex flex-row items-center min-w-[1000px] h-auto px-[40px] py-[10px] justify-start gap-[40px]">
            {firstRow.map((item) => (
              <li className="flex flex-col items-start gap-[5px]">
                <label className="text-(--primary-color) font-bold">
                  {item.label}
                </label>
                <p className="block py-[10px] px-[20px] bg-gray-200 min-w-[250px] rounded-full text-(--primary-color) font-bold">
                  {item.data}
                </p>
              </li>
            ))}
          </ul>
          <ul className="flex flex-row items-center min-w-[1000px] h-auto px-[40px] py-[10px] justify-start gap-[40px]">
            {secondRow.map((item) => (
              <li className="flex flex-col items-start gap-[5px]">
                <label className="text-(--primary-color) font-bold">
                  {item.label}
                </label>
                <p className="block py-[10px] px-[20px] bg-gray-200 min-w-[250px] rounded-full text-(--primary-color) font-bold">
                  {item.data}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </li>
      <li>
        <div className="flex flex-col min-width-[1000px] h-auto pb-[20px]">
          <div className="flex flex-row items-center min-w-[1000px] h-auto px-[30px] py-[20px] justify-between">
            <div className="flex flex-row items-center w-fit h-auto gap-x-[10px] whitespace-nowrap">
              <HomeIcon className="w-[30px] text-(--primary-color)" />
              <h3 className="text-2xl text-(--primary-color) font-bold">
                Endereço
              </h3>
            </div>
          </div>
          <ul className="flex flex-row items-center min-w-[1000px] h-auto px-[40px] py-[10px] justify-start gap-[40px]">
            {address.map((item) => (
              <li className="flex flex-col items-start gap-[5px]">
                <label className="text-(--primary-color) font-bold">
                  {item.label}
                </label>
                <p className="block py-[10px] px-[20px] bg-gray-200 min-w-[250px] rounded-full text-(--primary-color) font-bold">
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

export default RegisterData;
