import { useState } from "react";
import { createPortal } from "react-dom";
import ConfirmationButton from "./ConfirmationButton";
import RejectButton from "./RejectButton";

function ConfirmationModal({ setModal, name, id }) {
  return createPortal(
    <div className="flex flex-col fixed modal justify-center items-center border-4 border-slate-500 bg-slate-200 mx-96 my-56">
      <p className="text-xl"> Seguro que quieres eliminar {name} ?</p>
      <div className=" flex gap-5 mt-7">
        <ConfirmationButton id={id} />
        <RejectButton setModal={setModal} id={id} />
      </div>
    </div>,
    document.getElementById("modal")
  );
}

export default ConfirmationModal;
