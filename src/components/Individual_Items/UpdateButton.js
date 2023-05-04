import { useContext } from "react";
import { AppContext } from "../../app/AppContext";

function UpdateButton({ setModal }) {
  const { currentSection } = useContext(AppContext);

  function openModal(){
    setModal({
        showModal:true,
        modalType:'update'
      })
  }
  return (
    <button
      className="w-52 h-12 bg-slate-900 hover:bg-slate-800 text-white"
      onClick={openModal}
    >{`Editar ${currentSection}`}</button>
  );
}

export default UpdateButton;
