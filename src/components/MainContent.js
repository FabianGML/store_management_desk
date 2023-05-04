import { useContext, useState } from "react";
import Content from "./Content";
import Title from "./Title";
import Modal from "../Modal/Modal";
import ProductForm from "./FormComponents/SectionForms/ProductForm";
import OrderForm from "./FormComponents/SectionForms/OrderForm";
import ProviderForm from "./FormComponents/SectionForms/ProviderForm";
import LabForm from "./FormComponents/SectionForms/LabForm";
import { AppContext } from "../app/AppContext";

function MainContent() {
  const { currentSection, form, setForm, setFormState } = useContext(AppContext)
  const [modal, setModal] = useState(false);
  

  async function handleSubmit() {
    try {
      const response = await window.Data.sendForm(currentSection, form);
      if (response.message) {
        setFormState({
          loading: false,
          response,
        });
        setForm({});
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="h-screen pt-32 px-5 flex">
      <div className="w-full mr-7">
        <Title />
        <Content setModal={setModal} />
      </div>
      {modal && (
        <Modal
          handleSubmit={handleSubmit}
          // form1={ () => <Form1 />} //Form 1 Is going to be need when less than 4 input fields are required
          productForm={(submitInfo) => (
            <ProductForm
              submitInfo={submitInfo}
            />
          )}
          orderForm={(submitInfo) => (
            <OrderForm
              submitInfo={submitInfo}
            />
          )}
          providerForm={(submitInfo) => (
            <ProviderForm
              submitInfo={submitInfo}
            />
          )}
          labForm={(submitInfo) => (
            <LabForm
              submitInfo={submitInfo}
            />
          )}
          setModal={setModal}
        />
      )}
    </section>
  );
}

export default MainContent;
