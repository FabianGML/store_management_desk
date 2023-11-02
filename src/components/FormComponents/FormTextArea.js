import { useContext } from 'react'
import { AppContext } from '../../app/AppContext'

function FormTextArea ({ handleChange }) {
  const { form } = useContext(AppContext)
  return (
    <div className='flex items-center'>
      <label>Descripcion:</label>
      <textarea
        name='description'
        className='border border-black h-32 m-5 w-64 p-2'
        value={form.description}
        onChange={handleChange}
      />
    </div>
  )
}

export default FormTextArea
