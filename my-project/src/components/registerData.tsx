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
  const card =
    "flex flex-col min-w-[300px] sm:max-w-[600px] md:max-w-[760px] lg:max-w-[1000px] xl:max-w-[1200px] 2xl:max-w-[1500px] h-auto px-[30px] py-[10px] shadow-md gap-y-[10px]";
  const titleArea =
    "flex flex-row items-center w-fit h-auto gap-x-[10px] whitespace-nowrap justify-start";
  const grid =
    "flex grid cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center h-auto gap-y-[20px] sm:px-[10px] lg:px-[20px] py-[10px] justify-start sm:gap-x-[30px] md:gap-x-[40px]";
  const label =
    "text-(--primary-color) font-bold whitespace-nowrap text-xs lg:text-base";
  const field =
    "block py-[10px] px-[20px] font-bold text-(--primary-color) whitespace-nowrap rounded-full bg-(--forms-bg-light) dark:bg-(--forms-bg-dark) lg:text-sm xl:text-xl min-w-[300px] sm:min-w-[220px] md:min-w-[300px] lg:min-w-[220px] xl:min-w-[250px] 2xl:min-w-[300px]";
  return (
    <ul>
      <li>
        <div className={card}>
          <div className={titleArea}>
            <div className="flex flex-row items-center w-fit h-auto gap-x-[10px] whitespace-nowrap">
              <UserIcon className="w-[30px] text-(--primary-color)" />
              <h3 className="text-2xl text-(--primary-color) font-bold">
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
              <h3 className="text-2xl text-(--primary-color) font-bold">
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
