import { useContext } from 'react'
import { AppContext } from '../../app/AppContext'
import Select from 'react-select'

export default function FormSelect ({ name, options, classes }) {
  const { form, setForm } = useContext(AppContext)

  function handleSelectInfo (e) {
    setForm({
      ...form,
      [name]: e.value
    })
  }
  return (
    <Select options={options} onChange={handleSelectInfo} className={classes} />
  )
}
