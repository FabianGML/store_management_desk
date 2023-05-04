import { useContext } from "react";
import { AppContext } from "../../../app/AppContext";
import Modal from "../../../Modal/Modal";
import OrderForm from "../../FormComponents/SectionForms/OrderForm";
import ConfirmationModal from "../ConfirmationModal";
import DeleteButton from "../DeleteButton";
import GoBackButton from "../GoBackButton";
import InfoBlock from "../InfoBlock";
import UpdateButton from "../UpdateButton";
import IndividualDataTable from "./IndividualDataTable";
import LoadingSpinner from "../../LoadingSpinner";
import NewEntrance from "../../FormComponents/NewEntrance";

function IndividualOrder({ id, handleUpdate, individualInfo }) {
  const { modal, setModal, confirmation } = useContext(AppContext);
  console.log(individualInfo);

  const columns = [
    ["Producto", "Cantidad", "Precio Unitario", "Importe"],
    ["name", "amount", "unitPrice", "totalPrice"],
  ]

  if (!individualInfo) {
    return <LoadingSpinner />;
  }
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
            <h2 className="text-5xl mb-10 underline w-72">{`Pedido No. ${id}`}</h2>
            <InfoBlock
              labelText="Fecha de llegada:"
              info={individualInfo.orderArrive}
            />
            <InfoBlock
              labelText="Pagada:"
              info={individualInfo.isPayed ? "Pagada" : "No Pagada"}
            />
            <InfoBlock
              labelText="Proveedor:"
              info={individualInfo["provider.name"]}
            />
            <div className="w-full flex justify-center mt-12 gap-10">
              <UpdateButton setModal={setModal} />
            </div>
          </div>
        </div>
        <div className="w-7/12">
          <h3 className="text-4xl font-semibold text-center">Productos</h3>
          {individualInfo.items && (
            <IndividualDataTable
              individualData={individualInfo.items}
              total={individualInfo.total}
              columns={columns}
            />
          )}
        </div>
      </div>
      {modal.showModal && modal.modalType === "update" && (
        <Modal
          handleSubmit={handleUpdate}
          orderForm={(submitInfo) => (
            <OrderForm submitInfo={submitInfo} data={individualInfo} />
          )}
          setModal={setModal}
        />
      )}
    </div>
  );
}

export default IndividualOrder;
