import formInputs from '../../../helpers/formInputs'
import FormSearch from '../FormSearch'
import InputLabel from '../InputLabel'
import TextArea from '../TextArea'
import useGetSelectFormData from '../../../hooks/useGetSelectFormData'
import { useContext } from 'react'
import { AppContext } from '../../../app/AppContext'

export default function ProductForm () {
  const { options } = useContext(AppContext)
  const inputs = formInputs('Productos')

  const { getPrimarySelectData } = useGetSelectFormData('Productos')
  getPrimarySelectData()

  return (
    <div className='grid grid-cols-3 gap-5'>
      {inputs.map((input) => (
        <InputLabel
          labelText={`${input[0]}:`}
          name={input[1]}
          type={input[2]}
          placeholder={input[3]}
          key={input[0]}
          required={input[4]}
        />
      ))}

      <div className='flex justify-center items-center'>
        <label>Imagen:</label>
        <input
          name='image'
          type='file'
          className='w-72'
        />
      </div>
      <FormSearch name='labId' options={options} text='Laboratorio' />
      <TextArea name='description' />
    </div>
  )
}
