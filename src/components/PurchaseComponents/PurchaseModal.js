import { createPortal } from "react-dom";
import ConfirmationButton from "./ConfirmationButton";
import RejectButton from "./RejectButton";
import { Fragment, useContext } from "react";
import { AppContext } from "../../app/AppContext";

function PurchaseModal({ name, id }) {
  const { modal, setModal, total, form, setForm, shoppingCart, setShoppingCart } = useContext(AppContext);
  return createPortal(
    <div className="flex flex-col fixed modal justify-center items-center border-4 border-slate-500 bg-slate-200 mx-72 my-56">
      {modal.modalType === "delete" && (
        <Fragment>
          <p className="text-xl text-center">
            {" "}
            Seguro que quieres retirar {name} ?
          </p>
          <div className=" flex gap-5 mt-7">
            <ConfirmationButton id={id} />
            <RejectButton setModal={setModal} id={id} />
          </div>
        </Fragment>
      )}

      {modal.modalType === "create" && (
        <Fragment>
          <p className="text-2xl text-center">{` Cobrar: $${total}`}</p>
          <input
            className="h-12 w-3/12 border-b-2 border-black bg-transparent text-xl text-center my-6 focus:outline-none"
            autoFocus
            placeholder="El cliente paga..."
            onChange={(e) => setForm(e.target.value)}
          ></input>
          <p className="text-2xl text-center">
            {`Cambio: ${form - total || 0}`}{" "}
          </p>
          <div className=" flex gap-5 mt-7">
            <ConfirmationButton id={id}  />
            <RejectButton setModal={setModal} id={id} />
          </div>
        </Fragment>
      )}
      {modal.modalType === "update" && (
        <Fragment>
          <p className="text-2xl text-center">{` Cantidad actual: ${modal.amount}`}</p>
          <input
            className="h-12 w-3/12 border-b-2 border-black bg-transparent text-xl text-center my-6 focus:outline-none"
            autoFocus
            placeholder="Nueva cantidad..."
            onChange={(e) => setForm(e.target.value)}
          ></input>
          <div className=" flex gap-5 mt-7">
            <p>Quieres actualizar la cantidad?</p>
            <ConfirmationButton id={id} />
            <RejectButton setModal={setModal} id={id} />
          </div>
        </Fragment>
      )}
    </div>,
    document.getElementById("modal")
  );
}

export default PurchaseModal;
