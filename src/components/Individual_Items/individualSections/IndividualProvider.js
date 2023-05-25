import { useContext } from "react";
import { AppContext } from "../../../app/AppContext";
import ProviderForm from "../../FormComponents/SectionForms/ProviderForm";
import LoadingSpinner from "../../GeneralComponents/LoadingSpinner";
import GoBackButton from "../GoBackButton";
import InfoBlock from "../InfoBlock";
import IndividualDataTable from "./IndividualDataTable";
import Modal from "../../../Modal/Modal";
import UpdateButton from "../UpdateButton";
import NewEntrance from "../../FormComponents/NewEntrance";

function IndividualProvider({ id, handleUpdate, individualInfo }) {
  const { modal, setModal, confirmation } = useContext(AppContext);
  if (!individualInfo) {
    return <LoadingSpinner />;
  }
  console.log(individualInfo);
  const columns = [
    [["Nombre"], ["labName"]],
    [
      ["Producto",'Laboratorio', "Stock", "Caducidad"],
      ["name", 'lab' ,"stock", "expiration"],
    ],
  ];
  return (
    <section className="overflow-x-hidden">
      {confirmation && (
        <div className="w-full pt-32 ml-10 flex justify-center">
          <NewEntrance text={confirmation} />
        </div>
      )}
      <div className="w-full pt-32 ml-10 flex justify-center gap-28">
        <div className="flex flex-col">
          <GoBackButton />
          <h2 className="text-5xl mb-10 underline w-72">
            {individualInfo.name}
          </h2>
          <InfoBlock labelText="Telefono:" info={individualInfo.phone} />
          {individualInfo.phone2 && (
            <InfoBlock labelText="Telefono2:" info={individualInfo.phone2} />
          )}
          <InfoBlock labelText="Correo:" info={individualInfo.email} />

          <h3 className="text-4xl font-semibold text-center mt-12">
            Laboratorios
          </h3>
          {individualInfo.labs && (
            <IndividualDataTable
              individualData={individualInfo.labs}
              columns={columns[0]}
            />
          )}
        </div>
        <div className="w-7/12">
          <h3 className="text-4xl font-semibold text-center">Productos</h3>
          {individualInfo.products && (
            <IndividualDataTable
              individualData={individualInfo.products}
              columns={columns[1]}
            />
          )}
        </div>
      </div>
      <div className="w-full flex justify-center mt-12 gap-10 mb-24">
        <UpdateButton setModal={setModal} />
      </div>
      {modal.showModal && modal.modalType === "update" && (
        <Modal
          handleSubmit={handleUpdate}
          providerForm={(submitInfo) => (
            <ProviderForm submitInfo={submitInfo} data={individualInfo} />
          )}
          setModal={setModal}
        />
      )}
    </section>
  );
}

export default IndividualProvider;
