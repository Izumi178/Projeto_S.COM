import { useState } from "react";
import PersonalForm from "../components/personalForm";
import AddressForm from "../components/adressForm";
import InstitutionalForm from "../components/institutionalForms";
import { type person, type address } from "../createAccount";
export default function SignIn() {
  const [activePage, setPage] = useState(1);
  const [person, setPerson] = useState<person>();
  const [address, setAddress] = useState<address>();
  return (
    <div className="flex flex-col w-full min-h-screen pb-[100px] items-center mt-[200px] bg-white dark:bg-(--bg-dark)">
      <div className="flex flex-col w-[800px] h-auto items-center justify-center  bg-gray-100 rounded-[40px] drop-shadow-2xl p-[20px]">
        <h2 className="text-(--primary-color) font-bold text-[40px]">
          Matricule-se
        </h2>
        {activePage === 1 ? (
          <PersonalForm
            changePage={setPage}
            setPerson={setPerson}
          ></PersonalForm>
        ) : activePage === 2 ? (
          <AddressForm
            changePage={setPage}
            setAddress={setAddress}
          ></AddressForm>
        ) : (
          <InstitutionalForm
            changePage={setPage}
            pers={person}
            ad={address}
          ></InstitutionalForm>
        )}
      </div>
    </div>
  );
}
