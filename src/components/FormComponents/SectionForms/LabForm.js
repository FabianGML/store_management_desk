import { useContext, useEffect } from "react";
import { AppContext } from "../../../app/AppContext";
import FormButton from "../../Buttons/FormButton";
import LoadingSpinner from "../../GeneralComponents/LoadingSpinner";
import FormInput from "../FormInput";
import FormLabel from "../FormLabel";
import NewEntrance from "../NewEntrance";

function LabForm({ submitInfo, data }) {
  const { formState, setForm } = useContext(AppContext);
    
  useEffect(() => {
    if(data) {
      setForm(data)
    }
  }, [])

  return (
    <form
      onSubmit={submitInfo}
      className="p-5 w-full h-full overflow-scroll flex flex-col items-center"
    >
      {!formState.loading && formState.response.message && (
        <NewEntrance text={formState.response.message} />
      )}

      <div className="flex flex-wrap ">
        <div>
          <FormLabel text="Nombre del laboratorio" />
          <FormInput name="name" type="text" />
        </div>
      </div>
      {!formState.loading && (
        <FormButton
          text={"Enviar"}
          handleSubmit={submitInfo}
        />
      )}
      {formState.loading && <LoadingSpinner />}
    </form>
  );
}

export default LabForm;
