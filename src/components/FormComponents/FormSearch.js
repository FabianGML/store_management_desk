import { useContext } from 'react'
import Select from 'react-dropdown-select'
import { AppContext } from '../../app/AppContext'

function FormSearch ({ name, options, itemName, index, item }) {
  const { form, setForm } = useContext(AppContext)
  const value = item.name

  const handleSelectInfo = (e) => {
    console.log(e[0])
    const { value } = e[0]
    const items = [...form[itemName]]
    items[index][name] = value
    setForm({ ...form, items })
    console.log(form)
  }

  return (
    <Select
      name={name}
      options={options}
      onChange={handleSelectInfo}
      values={[{ value, label: value }]}
      searcheable
      create
      required
    />
  )
}

export default FormSearch
