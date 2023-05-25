import { useEffect, useContext } from "react";
import { AppContext } from "../../../app/AppContext";
import FormButton from "../../Buttons/FormButton";
import FormInput from "./../FormInput";
import Label from "../FormLabel";
import FormSelect from "./../FormSelect";
import LoadingSpinner from '../../GeneralComponents/LoadingSpinner'
import NewEntrance from "./../NewEntrance";

function ProductForm({ submitInfo, data }) {
  const { form, setForm, formState } = useContext(AppContext)
  
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
    ['Nombre','name', 'text'],
    ['Precio','price', 'number'],
    ['Stock','stock', 'number'],
    ['Codigo de Barras','barCode', 'text'],
    ['Ingredientes','ingredients', 'text'],
    ['Caducidad','expiration', 'date']
  ]

  useEffect(() => {
    if(data) {
      setForm(data)
    }
  }, [])

  return (
    <form
      className="p-5 w-full h-full overflow-scroll flex flex-col items-center"
      onSubmit={submitInfo}
    > 
      {(!formState.loading && formState.response.message  ) && <NewEntrance text={formState.response.message}/>}
      <div className="flex flex-wrap justify-center w-11/12">
        { formInputs.map(input => (
          <div key={input[0]}>
            <Label text={`${input[0]}:`} />
            <FormInput name={input[1]} type={input[2]} />
          </div>
        ))}

        <div>
          <Label text={'Imagen'} />
          <input type='file' className="pt-5 w-72"></input>
        </div>

        <div>
          <Label text={'Laboratorio'} />
          <FormSelect name={'labId'} handleChange={handleChange} />
        </div>

        <div>
          <Label text={'Descripcion'} />
          <textarea
          name={'description'}
          className="border border-black h-32 m-5 w-64 p-2"
          onChange={handleChange}
          ></textarea>
        </div>
      </div>
      <div>

        {!formState.loading && 
        <FormButton 
        text={"Enviar"} 
        handleSubmit={submitInfo}/>}
      </div>
    
      {formState.loading && <LoadingSpinner />}
      
    </form>
  );
}

export default ProductForm;
