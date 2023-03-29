import React from "react";
import ReactDOM from "react-dom";
import { AppContext } from "../app/AppContext";
import close from "../svg/close-svgrepo-com.svg";

function Modal(props) {
  const { currentSection, setCurrentSection, form, setForm, setFormData } = React.useContext(AppContext);
  const [formState, setFormState] = React.useState({
    loading: false,
    response: {},
  });

  async function getFormData() {
    await window.Data.formData(currentSection).then((result) => {
      setFormData(result);
    });
  }

  function closeModal() {
    props.setModal(false);
  }

  async function handleSubmit() {
    try {
      console.log(form);
      const response = await window.Data.sendForm(currentSection, form);
      if (response.message) {
        setFormState({
          loading: false,
          response,
        });
        setForm({})
      }
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    getFormData();
  }, []);

  return ReactDOM.createPortal(
    <div className="flex flex-col fixed modal justify-center items-end  border-4 border-slate-500 bg-slate-200 mx-64 my-24">
      <img
        src={close}
        className="h-8 mr-10 mt-5 hover:bg-stone-400 cursor-pointer rounded-md"
        onClick={closeModal}
      ></img>
      {currentSection === "Productos" &&
        props.productForm(handleSubmit, formState, setFormState)}
      {currentSection === "Pedidos" &&
        props.orderForm(handleSubmit, formState, setFormState)}
      {currentSection === "Proveedores" &&
        props.providerForm(handleSubmit, formState, setFormState)}
      {currentSection === "Laboratorios" &&
        props.labForm(handleSubmit, formState, setFormState)}
    </div>,
    document.getElementById("modal")
  );
}

export default Modal;
