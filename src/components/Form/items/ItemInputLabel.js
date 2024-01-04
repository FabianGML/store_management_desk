import { useContext } from 'react'
import { AppContext } from '../../../app/AppContext'

export default function ItemInputLabel ({ text, name, type, placeHolder, required, index, image }) {
  const { form, setForm } = useContext(AppContext)
  const isRequired = !!required
  const value = form.items[index][name]

  const handleChange = (event) => {
    const { name, value } = event.target
    const items = [...form.items]
    items[index][name] = value
    setForm({ ...form, items })
    console.log(form)
  }
  return (
    <div className='mx-10'>
      {/* {formState.validationErrors && formState.validationErrors.includes(name) && <ErrorMessage text={`El campo ${text} es obligatorio`} />} */}
      <label className='block'>{text}</label>
      <input
        type={type}
        className={`h-12 m-5 pl-3 w-64 ${!image ? 'border border-black' : ''}`}
        value={value}
        onChange={handleChange}
        name={name}
        placeholder={placeHolder || ''}
        required={isRequired}
      />
    </div>
  )
}
