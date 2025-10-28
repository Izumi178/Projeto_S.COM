import { PencilSquareIcon, UserMinusIcon } from "@heroicons/react/16/solid";
import { useEffect, useState, type SetStateAction } from "react";
import { getUsers } from "../adminActions";
import { type Pessoas } from "../getRegisterData";
import ConfirmDelete from "../components/admin/confirmDelete";
import type { popUp } from "../components/warning";
import PopUp from "../components/warning";
import { logOut, verifyAdm } from "../authLogin";
import { useNavigate } from "react-router-dom";
import EditUser from "../components/admin/edit";
export default function AdminPage() {
  const [perfis, setPerfis] = useState<Pessoas[]>();
  const [user, setUSer] = useState<Pessoas>();
  const [delClosed, closeDel] = useState(true);
  const [createClosed, closeCreate] = useState(true);
  const [editClosed, closeEdit] = useState(true);
  const [warning, setPopUp] = useState<popUp>();
  const navigate = useNavigate();
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
  useEffect(() => {
    const loadData = async () => {
      const dados = await getUsers();
      if (dados) {
        setPerfis(dados);
      }
    };
    loadData();
  }, []);
  useEffect(() => {
    const verify = async () => {
      const admin = await verifyAdm();
      if (!admin) {
        navigate("/login", { replace: true });
      }
    };
    verify();
  }, []);
  return (
    <div
      className="flex flex-col w-full min-h-screen pb-[100px] 
    items-center bg-white dark:bg-(--bg-dark)"
    >
      <div className="flex flex-row items-center my-[20px]">
        <h1 className="text-[40px] font-bold">Perfis</h1>
        <button
          className="px-[20px] py-[5px] translate-x-[200px] h-fit w-fit rounded-[5px] z-1000 bg-(--forms-bg-light) dark:bg-(--forms-bg-dark) cursor-pointer text-(--primary-color)"
          onClick={async () => {
            if (await logOut()) {
              navigate("/login", { replace: true });
            } else {
            }
          }}
        >
          Sair
        </button>
      </div>

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
              <button
                onClick={() => {
                  closeEdit(false);
                  setUSer(perfil);
                }}
                className="w-fit justify-center cursor-pointer"
              >
                <PencilSquareIcon className="text-black w-[20px]"></PencilSquareIcon>
              </button>
            </div>
            <div className="w-[75px] justify-center cursor-pointer">
              <button
                onClick={() => {
                  closeDel(false);
                  setUSer(perfil);
                }}
                className="w-fit"
              >
                <UserMinusIcon className="text-black w-[20px]"></UserMinusIcon>
              </button>
            </div>
          </div>
        ))}
      <button className="flex flex-row w-[500px] bg-(--forms-bg-light) justify-center cursor-pointer">
        Adicionar perfil
      </button>
      {!editClosed && user && (
        <EditUser id={user.id} close={closeEdit} setPopUp={setPopUp}></EditUser>
      )}
      {!delClosed && user && (
        <ConfirmDelete
          user={user}
          close={closeDel}
          setPopUp={warning?.set}
        ></ConfirmDelete>
      )}
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
