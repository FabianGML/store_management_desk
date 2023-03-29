import React from "react";
import { AppContext } from "../../app/AppContext";
import FormButton from "../Buttons/FormButton";
import FormInput from "./FormInput";
import FormLabel from "./FormLabel";
import FormSelect from "./FormSelect";
import LoadingSpinner from '../LoadingSpinner'
import NewEntrance from "./NewEntrance";

function ProductForm({ submitInfo, formState, setFormState}) {
  const { form, setForm } = React.useContext(AppContext)
  
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

  const formInputs = [
    ['Producto','name', 'text'],
    ['Precio','price', 'number'],
    ['Stock','stock', 'number'],
    ['Ingredientes','ingredients', 'text'],
    ['Caducidad','expiration', 'date']
  ]


  return (
    <form
      className="p-5 w-full h-full overflow-scroll flex flex-col items-center"
      onSubmit={submitInfo}
    > 
      {(!formState.loading && formState.response.message  ) && <NewEntrance text={formState.response.message}/>}
      <div className="flex flex-wrap justify-center">
        { formInputs.map(input => (
          <div key={input[0]}>
            <FormLabel text={`${input[0]}:`} />
            <FormInput name={input[1]} type={input[2]} />
          </div>
        ))}

        <div>
          <FormLabel text={'Imagen'} />
          <input type='file' className="pt-5 w-72"></input>
        </div>

        <div>
          <FormLabel text={'Laboratorio'} />
          <FormSelect name={'labId'} handleChange={handleChange} />
        </div>

        <div>
          <FormLabel text={'Descripcion'} />
          <textarea
          name={'description'}
          className="border border-black h-32 m-5 w-64"
          onChange={handleChange}
          ></textarea>
        </div>
      </div>
      <div>

        {!formState.loading && 
        <FormButton 
        text={"Enviar"} 
        formState={formState} 
        setFormState={setFormState} 
        handleSubmit={submitInfo}/>}
      </div>
    
      {formState.loading && <LoadingSpinner />}
      
    </form>
  );
}

export default ProductForm;
