import { useContext } from 'react'
import Select from 'react-dropdown-select'
import { AppContext } from '../../app/AppContext'

export default function FormSearch ({ name, options, text, index }) {
  const { form, setForm } = useContext(AppContext)
  // const value = form[name] || (form.items[index] && form.items[index][name]) || ''
  // const value = form[name]

  const handleSelectInfo = (event) => {
    // if (Array.isArray(event) && event.length > 0) {
    //   const { value } = event[0]
    //   const items = [...form[itemName]]
    //   if (item.id || event[0].id) {
    //     const itemId = item.id || event[0].id
    //     items[index][name] = value
    //     lab ? items[index][name] = event[0].id : items[index].id = itemId
    //   } else {
    //     items[index][name] = value
    //     delete items[index].id
    //   }
    //   setForm({ ...form, items })
    // }
    const { value } = event[0]
    setForm({
      ...form,
      [name]: value
    })
    console.log(event)
  }

  return (
    <div className='w-80 mx-10'>
      {/* {formState.validationErrors && formState.validationErrors.includes('labId') && <ErrorMessage text='El campo Laboratorio es obligatorio' />} */}
      <label>{text}:</label>
      <div className='p-5'>
        <Select
          options={options}
          onChange={(event) => handleSelectInfo(event)}
        // values={[{ value, label: value }]}
          searcheable
          create
          required
        />
      </div>
    </div>
  )
}
