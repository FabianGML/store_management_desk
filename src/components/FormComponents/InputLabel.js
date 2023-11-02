import { useContext } from 'react'
import { AppContext } from '../../app/AppContext'
import ErrorMessage from './ErrorMessage'

function InputLabel ({ text, name, type, specialChange, placeHolder, required, index }) {
  const { form, setForm, formState } = useContext(AppContext)
  const isRequired = !!required
  const value = form[name] || form.items ? (form.items[index] && form.items[index][name]) : ''

  function handleChange (e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  return (
    <div>
      {formState.validationErrors && formState.validationErrors.includes(name) && <ErrorMessage text={`El campo ${text} es obligatorio`} />}
      <label className='block'>{text}</label>
      <input
        type={type}
        className='h-12 border border-black m-5 pl-3'
        name={name}
        value={value}
        onChange={specialChange || handleChange}
        placeholder={placeHolder || ''}
        required={isRequired}
      />
    </div>
  )
}

export default InputLabel
