import { useContext } from "react";
import { AppContext } from "../../../app/AppContext";
import Modal from "../../../Modal/Modal";
import LabForm from "../../FormComponents/SectionForms/LabForm";
import GoBackButton from "../GoBackButton";
import UpdateButton from "../UpdateButton";
import IndividualDataTable from "./IndividualDataTable";
import LoadingSpinner from "../../GeneralComponents/LoadingSpinner";
import NewEntrance from "../../FormComponents/NewEntrance";

function IndividualLab({ id, handleUpdate, individualInfo }) {
  const { modal, setModal, confirmation } = useContext(AppContext);
  const columns = [
    ["Producto", "Stock"],
    ["name", "stock"],
  ];

  if (!individualInfo) {
    return <LoadingSpinner />;
  }
  console.log(individualInfo);
  return (
    <div className="overflow-x-hidden">
      {confirmation && (
        <div className="w-full pt-32 ml-10 flex justify-center">
          <NewEntrance text={confirmation} />
        </div>
      )}
      <div className="flex h-full w-screen pt-32 ml-10 items-start">
        <div className="flex flex-col">
          <GoBackButton />
          <div>
            <h2 className="text-5xl mb-10 underline w-72 text-center">{`Laboratorio: ${individualInfo.name}`}</h2>
          </div>
        </div>
        <div className="w-7/12">
          <h3 className="text-4xl font-semibold text-center">Productos</h3>
          {individualInfo.products && (
            <IndividualDataTable
              individualData={individualInfo.products}
              columns={columns}
            />
          )}
        </div>
      </div>
      <div className="w-full flex justify-center mt-12 gap-10">
        <UpdateButton setModal={setModal} />
      </div>
      {modal.showModal && modal.modalType === "update" && (
        <Modal
          handleSubmit={handleUpdate}
          labForm={(submitInfo) => (
            <LabForm submitInfo={submitInfo} data={individualInfo} />
          )}
          setModal={setModal}
        />
      )}
    </div>
  );
}

export default IndividualLab;
