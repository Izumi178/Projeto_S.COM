import { PencilSquareIcon, UserMinusIcon } from "@heroicons/react/16/solid";
import { useEffect, useState, type SetStateAction } from "react";
import { getUserEmail, getUsers } from "../adminActions";
import {
  GetAdressData,
  GetPersonalData,
  type Endereco,
  type Pessoas,
} from "../getRegisterData";
import ConfirmDelete from "../components/admin/confirmDelete";
import type { popUp } from "../components/warning";
import PopUp from "../components/warning";
import { logOut, verifyAdm, verifyAuth } from "../authLogin";
import { useNavigate } from "react-router-dom";
import EditUser from "../components/admin/edit";
import { GetInstitutionalData, type Aluno } from "../getInstitutionalData";
import CreateUser from "../components/admin/create";
export default function AdminPage() {
  const [perfis, setPerfis] = useState<Pessoas[]>();
  const [user, setUSer] = useState<Pessoas>();
  const [personalData, setPersonalData] = useState<Pessoas>();
  const [adressData, setAdressData] = useState<Endereco>();
  const [institutionalData, setInstitutionalData] = useState<Aluno>();
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
        <h1 className="text-[40px] text-(--primary-color) font-bold">Perfis</h1>
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
      <div className="px-[20px] text-(--primary-color)">
        <div className="flex flex-row w-[950px] bg-(--primary-color) dark:text-white text-(--forms-bg-black)">
          <div className="w-[500px]">id</div>
          <div className="w-[300px]">Nome</div>
          <div className="w-[75px]">Editar Perfil</div>
          <div className="w-[75px]">Deletar Perfil</div>
        </div>
        {perfis &&
          perfis.map((perfil) => (
            <div className="flex flex-row w-[950px] bg-(--forms-bg-light) dark:bg-(--forms-bg-dark) ">
              <p className="w-[500px]">{perfil.id}</p>
              <p className="w-[300px]">{perfil.name}</p>
              <div className="w-[75px]">
                <button
                  onClick={async () => {
                    setUSer(perfil);
                    if (user) {
                      const email = await getUserEmail(user?.id);
                      if (email) {
                        const dadosInstitucionais = await GetInstitutionalData(
                          email
                        );
                        const dadosPessoais = await GetPersonalData(email);
                        const dadosEndereco = await GetAdressData(email);
                        if (
                          dadosPessoais &&
                          dadosEndereco &&
                          dadosInstitucionais
                        ) {
                          setPersonalData(dadosPessoais[0]);
                          setAdressData(dadosEndereco[0]);
                          setInstitutionalData(dadosInstitucionais[0]);
                        }
                      }
                    }

                    closeEdit(false);
                  }}
                  className="w-fit justify-center cursor-pointer"
                >
                  <PencilSquareIcon className=" w-[20px]"></PencilSquareIcon>
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
                  <UserMinusIcon className="w-[20px]"></UserMinusIcon>
                </button>
              </div>
            </div>
          ))}
        <button
          onClick={() => {
            closeCreate(false);
          }}
          className="flex flex-row w-[950px] bg-(--forms-bg-light) dark:bg-(--forms-bg-dark) justify-center cursor-pointer"
        >
          + Adicionar perfil
        </button>
      </div>

      {!createClosed && (
        <CreateUser close={closeCreate} setPopUp={setPopUp}></CreateUser>
      )}
      {!editClosed &&
        user &&
        personalData &&
        adressData &&
        institutionalData && (
          <EditUser
            close={closeEdit}
            setPopUp={setPopUp}
            personalData={personalData}
            addressData={adressData}
            institutionalData={institutionalData}
          ></EditUser>
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
