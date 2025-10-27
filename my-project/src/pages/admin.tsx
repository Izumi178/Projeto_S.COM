import { PencilSquareIcon, UserMinusIcon } from "@heroicons/react/16/solid";
import { useEffect, useState, type SetStateAction } from "react";
import { getUsers } from "../adminActions";
import { type Pessoas } from "../getRegisterData";
import ConfirmDelete from "../components/confirmDelete";
export default function AdminPage() {
  const [perfis, setPerfis] = useState<Pessoas[]>();
  const [delUser, setDelUser] = useState<Pessoas>();
  const [closed, close] = useState(true);
  const [done, setPopup] = useState(true);
  useEffect(() => {
    const loadData = async () => {
      const dados = await getUsers();
      if (dados) {
        setPerfis(dados);
      }
    };
    loadData();
  }, []);
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="my-[20px] text-[40px] font-bold">Perfis</h1>
        <div className="flex flex-row w-[500px] bg-(--primary-color)">
          <div className="w-[50px]">id</div>
          <div className="w-[300px]">Nome</div>
          <div className="w-[75px]">Editar Perfil</div>
          <div className="w-[75px]">Deletar Perfil</div>
        </div>
        {perfis &&
          perfis.map((perfil) => (
            <div className="flex flex-row w-[500px] bg-(--forms-bg-light)">
              <p className="w-[50px]">{perfil.id}</p>
              <p className="w-[300px]">{perfil.name}</p>
              <div className="w-[75px]">
                <button className="w-fit justify-center cursor-pointer">
                  <PencilSquareIcon className="text-black w-[20px]"></PencilSquareIcon>
                </button>
              </div>
              <div className="w-[75px] justify-center cursor-pointer">
                <button
                  onClick={() => {
                    close(false);
                    setDelUser(perfil);
                  }}
                  className="w-fit"
                >
                  <UserMinusIcon className="text-black w-[20px]"></UserMinusIcon>
                </button>
              </div>
            </div>
          ))}
        <button className="flex flex-row w-[500px] bg-(--forms-bg-light) justify-center cursor-pointer">
          {" "}
          Adicionar perfil
        </button>
      </div>
      {!closed && delUser && (
        <ConfirmDelete user={delUser} close={close}></ConfirmDelete>
      )}
      {}
    </div>
  );
}
