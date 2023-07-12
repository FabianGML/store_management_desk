import { useContext } from 'react'
import { AppContext } from '../../app/AppContext'
import Select from 'react-select'

function FormSelect ({ name, options }) {
  const { form, setForm } = useContext(AppContext)

  function handleSelectInfo (e) {
    setForm({
      ...form,
      [name]: e.value
    })
  }

  return (
    <Select options={options} onChange={handleSelectInfo} className='pt-5 pl-5 w-80' />
  )
}

export default FormSelect
