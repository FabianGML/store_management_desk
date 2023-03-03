import React, { useRef }from "react";
import { AppContext } from "../../app/AppContext";
import { getInputContents } from "../../helpers/rowContents";
import FormButton from "../Buttons/FormButton";
import FormInput from "./FormInput";
import FormLabel from "./FormLabel";
import FormSelect from "./FormSelect";
import LoadingSpinner from '../LoadingSpinner'
import NewEntrance from "./NewEntrance";

function Form2({ submitInfo, formState, setFormState/*loading, setLoading */}) {
  const { currentSection, form, setForm, setExtraData } = React.useContext(AppContext);
  const inputContents = getInputContents(currentSection);
  const formRef = useRef(null)



  async function getExtraData(){
    await window.Data.extraData()
    .then(result => {
        setExtraData(result)
    })
  }

  function handleChange(e, select = null) {
    if(e.target){ 
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    } else {
      setForm({
        ...form,
        ...select,
        userId: 2
      })
    }
  }
  
  React.useEffect(()=> {
    getExtraData()    
  }, [])



  return (
    <form
      className="p-5 w-full h-full flex flex-wrap  overflow-scroll justify-center"
      onSubmit={submitInfo}
      ref={formRef}
    > 
      {(!formState.loading && formState.response.message  ) && <NewEntrance text={formState.response.message}/>}
      { !formState.loading && 
      inputContents.map((input) => {
        if (input[0] === "Laboratorio") {
          return (
            <div key={input[0]}>
              <FormLabel text={`${input[0]}:`} />
              <FormSelect 
                name={input[1]} 
                handleChange={ handleChange } 
                />
            </div>
          );
        } else if (input[0] === "Descripcion") {
          return (
            <div key={input[0]}>
              <FormLabel text={`${input[0]}:`} />
              <textarea
                name={input[1]}
                className="border border-black h-32 m-5 w-64"
                onChange={handleChange}
              ></textarea>
            </div>
          );
        } else {
          return (
            <div key={input[0]}>
              <FormLabel text={`${input[0]}:`} />
              <FormInput name={input[1]} type={input[2]} />
            </div>
          );
        }
      })
    }
    {!formState.loading && 
    <FormButton 
    text={"Enviar"} 
    formState={formState} 
    setFormState={setFormState} 
    handleSubmit={submitInfo}/>}
    
      {formState.loading && <LoadingSpinner />}
      
    </form>
  );
}

export default Form2;
