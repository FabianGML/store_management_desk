import { useContext } from 'react'
import { AppContext } from '../../app/AppContext'

function InputLabel ({ text, name, type, specialChange, placeHolder }) {
  const { form, setForm } = useContext(AppContext)

  function handleChange (e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
    console.log(form)
  }

  return (
    <div>
      <input
        type={type}
        className='h-12 border border-black m-5 pl-3'
        name={name}
        value={form[name]}
        onChange={specialChange || handleChange}
        placeholder={placeHolder || ''}
      />
      <label className='block'>{text}</label>
    </div>
  )
}

export default InputLabel
