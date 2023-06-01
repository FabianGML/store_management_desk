import { useContext } from 'react'
import { AppContext } from '../../app/AppContext'
import Select from 'react-select'

function FormSelect ({ name }) {
  const { form, setForm, formData } = useContext(AppContext)

  function handleSelectInfo (e) {
    setForm({
      ...form,
      [name]: e.value
    })
  }
  if (formData) {
    var optionsData = formData.map(row => { return { value: row.id, label: row.name } })
  }

  return (
    <Select options={optionsData} onChange={handleSelectInfo} className='pt-5 pl-5 w-80' />
  )
}

export default FormSelect
