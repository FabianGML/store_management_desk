import React from "react";
import ReactDOM from "react-dom";
import { AppContext } from "../app/AppContext";
import { getInputContents } from "../helpers/rowContents";
import close from "../svg/close-svgrepo-com.svg";

function Modal(props) {
  const { currentSection, form,  } = React.useContext(AppContext);
  const inputContents = getInputContents(currentSection);
  const [formState, setFormState] = React.useState({loading:false, response:{}});

  function closeModal() {
    props.setModal(false)
  }

  async function handleSubmit() {
    try {
      const response = await window.Data.sendForm(form)
      if (response.message) {
        setFormState({
          loading:false,
          response
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return ReactDOM.createPortal(
    <div className="flex flex-col fixed modal justify-center items-end  border-4 border-slate-500 bg-slate-200 mx-64 my-24">
      <img
        src={close}
        className="h-8 mr-10 mt-5 hover:bg-stone-400 cursor-pointer rounded-md"
        onClick={closeModal}
      ></img>
      {/* {inputContents < 4 && props.form1()} */}
      {inputContents.length >= 8 && props.form2(handleSubmit, formState, setFormState)}
      {/* <Form2 submitInfo={handleSubmit} /> */}
    </div>,
    document.getElementById("modal")
  );
}

export default Modal;
