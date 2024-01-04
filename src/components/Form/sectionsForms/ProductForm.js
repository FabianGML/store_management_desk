import { useContext } from 'react'
import InputLabel from '../InputLabel'
import { AppContext } from '../../../app/AppContext'
import TextArea from '../TextArea'
import formInputs from '../../../helpers/formInputs'
import FormSearch from '../FormSearch'
import useGetSelectFormData from '../../../hooks/useGetSelectFormData'

export default function ProductForm () {
  const { form, setForm, options } = useContext(AppContext)

  const inputs = formInputs('Productos')

  const { getPrimarySelectData } = useGetSelectFormData('Productos')
  getPrimarySelectData()

  return (
    <div className='grid grid-cols-3 gap-5'>
      {inputs.map((input) => (
        <InputLabel
          text={`${input[0]}:`}
          name={input[1]}
          type={input[2]}
          placeholder={input[3]}
          key={input[0]}
          required={input[4]}
        />
      ))}

      <div className='col-span-2 flex justify-center items-center'>
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
      <FormSearch name='labId' options={options} text='Laboratorio' lab />
      <TextArea />
    </div>
  )
}
