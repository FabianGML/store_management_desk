import { useContext } from 'react'
import { AppContext } from '../../app/AppContext'

export default function InputLabel ({ text, name, type, placeHolder, required, index, image }) {
  const { form, setForm } = useContext(AppContext)
  const isRequired = !!required
  const value = form[name] || form.items ? (form.items[index] && form.items[index][name]) : ''

  function handleChange (e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  return (
    <div className='mx-10'>
      {/* {formState.validationErrors && formState.validationErrors.includes(name) && <ErrorMessage text={`El campo ${text} es obligatorio`} />} */}
      <label className='block'>{text}</label>
      <input
        type={type}
        className={`h-12 m-5 pl-3 w-64 ${!image ? 'border border-black' : ''}`}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeHolder || ''}
        required={isRequired}
      />
    </div>
  )
}
