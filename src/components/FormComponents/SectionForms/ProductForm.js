import React, { useContext } from 'react'
import { AppContext } from '../../../app/AppContext'
import FormButton from '../../Buttons/FormButton'
import FormSelect from './../FormSelect'
import LoadingSpinner from '../../GeneralComponents/LoadingSpinner'
import useInputHandlers from '../../hooks/useInputHandlers'
import useGetSelectData from '../../hooks/useGetSelectData'
import InputLabel from '../../FormComponents/InputLabel'
import FormTextArea from '../FormTextArea'
import ErrorMessage from '../ErrorMessage'

function ProductForm ({ submitInfo, data }) {
  const { form, setForm, formState } = useContext(AppContext)

  function handleChange (e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const { primaryOptions } = useGetSelectData()
  const options = primaryOptions('primarySelectData')

  const formInputs = [
    ['*Nombre', 'name', 'text', 'Fiserul...', true],
    ['*Precio', 'price', 'number', '$120', true],
    ['*Stock', 'stock', 'number', '5', true],
    ['Codigo de Barras', 'barCode', 'text', '087952345', false],
    ['Ingredientes', 'ingredients', 'text', 'Manzanilla, Equinacea...', false],
    ['*Caducidad', 'expiration', 'date', '', true]
  ]

  const { setBasicFormData, isLoaded } = useInputHandlers(data)
  setBasicFormData()
  return (
    <form
      className='p-5 w-full h-full overflow-scroll flex flex-col items-center'
      onSubmit={submitInfo}
    >
      {isLoaded && (
        <>
          <div className='flex flex-wrap justify-center w-11/12'>
            {formInputs.map((input) => (
              <InputLabel
                text={`${input[0]}:`}
                name={input[1]}
                type={input[2]}
                placeholder={input[3]}
                key={input[0]}
                required={input[4]}
              />
            ))}

            <div className='flex gap-5 items-center m-5'>
              <label>Imagen:</label>
              <input
                name='image'
                type='file'
                className='w-72'
                onChange={(e) => {
                  const file = e.target.files[0]
                  setForm({
                    ...form,
                    image: {
                      name: file.name,
                      path: file.path,
                      type: file.type
                    }
                  })
                }}
              />
            </div>
            <div>
              {formState.validationErrors && formState.validationErrors.includes('labId') && <ErrorMessage text='El campo Laboratorio es obligatorio' />}
              <label>*Laboratorio:</label>
              <FormSelect name='labId' options={options} />
            </div>
            <FormTextArea handleChange={handleChange} />
          </div>
          <div>
            {!formState.loading && (
              <FormButton text='Enviar' handleSubmit={submitInfo} />
            )}
          </div>
        </>
      )}
      {formState.loading && <LoadingSpinner />}
    </form>
  )
}

export default ProductForm
