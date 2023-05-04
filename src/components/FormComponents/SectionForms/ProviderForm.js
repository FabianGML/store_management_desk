import {
  useState,
  useContext,
  useEffect,
  Fragment,
  useLayoutEffect,
} from "react";
import { AppContext } from "../../../app/AppContext";
import FormButton from "../../Buttons/FormButton";
import LoadingSpinner from "../../LoadingSpinner";
import FormInput from "../FormInput";
import FormLabel from "../FormLabel";
import NewEntrance from "../NewEntrance";

function ProviderForm({ submitInfo, data }) {
  const { form, setForm, formState, setFormState } = useContext(AppContext);

  const [isLoaded, setIsLoaded] = useState(false);
  const [formUpdated, setFormUpdated] = useState(false);

  function handleInputChange(event, index) {
    const { name, value } = event.target;
    const labs = [...form.labs];
    labs[index][name] = value;
    setForm({ ...form, labs });
  }

  function handleAddItem() {
    const newLab = { labName: "" };
    setForm({ ...form, labs: [...form.labs, newLab] });
  }

  function handleSubmit() {
    setFormUpdated(true);
  }

  function handleRemoveLab(index) {
    const labs = [...form.labs];
    labs.splice(index, 1);
    setForm({ ...form, labs });
  }

  useLayoutEffect(() => {
    if (data) {
      setForm({
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        phone2: data.phone2,
        labs: data.labs,
      });
      setIsLoaded(true);
    } else {
      setForm({
        name: "",
        email: "",
        phone: "",
        phone2: "",
        labs: [{ labName: "" }],
      });
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (formUpdated) {
      submitInfo();
      setFormUpdated(false);
    }
  }, [handleSubmit]);

  return (
    <form
      className="p-5 w-full h-full overflow-scroll flex flex-col items-center"
      onSubmit={handleSubmit}
    >
      {!formState.loading && formState.response.message && (
        <NewEntrance text={formState.response.message} />
      )}
      {isLoaded && (
        <Fragment>
          <div className="flex flex-wrap justify-center" id="form">
            <div>
              <FormLabel text={"Nombre del Proveedor:"} />
              <FormInput
                name={"name"}
                type={"text"}
                specialChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
              />
            </div>
            <div>
              <FormLabel text={"Email:"} />
              <FormInput
                name={"email"}
                type={"text"}
                specialChange={(event) =>
                  setForm({ ...form, email: event.target.value })
                }
              />
            </div>
            <div>
              <FormLabel text={"Telefono:"} />
              <FormInput
                name={"phone"}
                type={"phone"}
                specialChange={(event) =>
                  setForm({ ...form, phone: event.target.value })
                }
              />
            </div>
            <div>
              <FormLabel text={"Telefono 2:"} />
              <FormInput
                name={"phone2"}
                type={"phone"}
                specialChange={(event) =>
                  setForm({ ...form, phone2: event.target.value })
                }
              />
            </div>
            <h3 className="basis-full">Laboratorios:</h3>
            {form.labs.map((lab, index) => (
              <div className="flex gap-10 items-center">
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
                <div
                  className="w-12 h-6 rounded-full mb-6 bg-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-400 hover:text-gray-700 cursor-pointer"
                  onClick={() => handleRemoveLab(index)}
                >
                  <span className="text-2xl font-bold leading-none">-</span>
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
        </Fragment>
      )}

      {!formState.loading && (
        <FormButton
          text={"Enviar"}
          formState={formState}
          setFormState={setFormState}
          handleSubmit={handleSubmit}
        />
      )}
      {formState.loading && <LoadingSpinner />}
    </form>
  );
}

export default ProviderForm;
