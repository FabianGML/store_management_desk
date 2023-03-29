import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../app/AppContext";
import FormButton from "../Buttons/FormButton";
import LoadingSpinner from "../LoadingSpinner";
import FormInput from "./FormInput";
import FormLabel from "./FormLabel";
import NewEntrance from "./NewEntrance";

function ProviderForm({ submitInfo, formState, setFormState }) {
  const { form, setForm } = useContext(AppContext);
  const [provider, setProvider] = useState({
    name: "",
    email: "",
    phone: "",
    phone2: "",
    labs: [{ labName: "" }],
  });

  function handleInputChange(event, index) {
    const { name, value } = event.target;
    const labs = [...provider.labs];
    labs[index][name] = value;
    setProvider({ ...provider, labs });
  }

  function handleAddItem() {
    const newItem = { labName: "" };
    setProvider({ ...provider, labs: [...provider.labs, newItem] });
  }

  function combineForm() {
    setForm(provider);
  }

  useEffect(() => {
    submitInfo();
  }, [form]);

  return (
    <form
      className="p-5 w-full h-full overflow-scroll flex flex-col items-center"
      onSubmit={submitInfo}
    >
      {!formState.loading && formState.response.message && (
        <NewEntrance text={formState.response.message} />
      )}
      <div className="flex flex-wrap justify-center" id="form">
        <div>
          <FormLabel text={"Nombre del Proveedor:"} />
          <FormInput
            name={"name"}
            type={"text"}
            specialChange={(event) =>
              setProvider({ ...provider, name: event.target.value })
            }
          />
        </div>
        <div>
          <FormLabel text={"Email:"} />
          <FormInput
            name={"email"}
            type={"text"}
            specialChange={(event) =>
              setProvider({ ...provider, email: event.target.value })
            }
          />
        </div>
        <div>
          <FormLabel text={"Telefono:"} />
          <FormInput
            name={"phone"}
            type={"phone"}
            specialChange={(event) =>
              setProvider({ ...provider, phone: event.target.value })
            }
          />
        </div>
        <div>
          <FormLabel text={"Telefono 2:"} />
          <FormInput
            name={"phone2"}
            type={"phone"}
            specialChange={(event) =>
              setProvider({ ...provider, phone2: event.target.value })
            }
          />
        </div>
        <h3 className="basis-full">Laboratorios:</h3>
        {provider.labs.map((lab, index)=> (
            <div
            key={index}
            className="flex flex-wrap border border-gray-400 rounded-lg mb-6"
          >
            <div>
              <FormLabel text="Nombre" />
              <input
                id={`name-${index}`}
                name="labName"
                type="text"
                value={lab.labName}
                className="h-12 border border-black m-5 pl-3"
                onChange={(event) => handleInputChange(event, index)}
              />
            </div>
          </div>
        ))}
      </div>
      <div
        className="w-12 rounded-full mb-6 bg-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-400 hover:text-gray-700 cursor-pointer"
        onClick={handleAddItem}
      >
        <span className="text-2xl font-bold leading-none">+</span>
      </div>
      {!formState.loading && (
        <FormButton
          text={"Enviar"}
          formState={formState}
          setFormState={setFormState}
          handleSubmit={combineForm}
        />
      )}
      {formState.loading && <LoadingSpinner />}
    </form>
  );
}

export default ProviderForm;
