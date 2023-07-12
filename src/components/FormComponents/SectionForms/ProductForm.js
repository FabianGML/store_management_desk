import React, { useContext } from 'react'
import { AppContext } from '../../../app/AppContext'
import FormButton from '../../Buttons/FormButton'
import FormSelect from './../FormSelect'
import LoadingSpinner from '../../GeneralComponents/LoadingSpinner'
import InputLabel from '../InputLabel'
import useSetFormIfData from '../../hooks/useSetFormIfData'
import useGetSelectData from '../../hooks/useGetSelectData'

function ProductForm ({ submitInfo, data }) {
  const { form, setForm, formState } = useContext(AppContext)

  function handleChange (e, select = null) {
    if (e.target) {
      setForm({
        ...form,
        [e.target.name]: e.target.value
      })
    } else {
      setForm({
        ...form,
        ...select,
        userId: 2
      })
    }
  }
  const { primaryOptions } = useGetSelectData()
  const options = primaryOptions('primarySelectData')

  const formInputs = [
    ['Nombre', 'name', 'text'],
    ['Precio', 'price', 'number'],
    ['Stock', 'stock', 'number'],
    ['Codigo de Barras', 'barCode', 'text'],
    ['Ingredientes', 'ingredients', 'text'],
    ['Caducidad', 'expiration', 'date']
  ]

  const { setBasicFormData } = useSetFormIfData(data)
  setBasicFormData()

  return (
    <form
      className='p-5 w-full h-full overflow-scroll flex flex-col items-center'
      onSubmit={submitInfo}
    >
      <div className='flex flex-wrap justify-center w-11/12'>
        {formInputs.map((input) => (
          <InputLabel text={`${input[0]}:`} name={input[1]} type={input[2]} key={input[0]} />
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
        <div className=''>
          <label>Laboratorio</label>
          <FormSelect name='labId' options={options} />
        </div>

        <div className='flex items-center'>
          <label>Descripcion:</label>
          <textarea
            name='description'
            className='border border-black h-32 m-5 w-64 p-2'
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        {!formState.loading && (
          <FormButton text='Enviar' handleSubmit={submitInfo} />
        )}
      </div>

      {formState.loading && <LoadingSpinner />}
    </form>
  )
}

export default ProductForm
