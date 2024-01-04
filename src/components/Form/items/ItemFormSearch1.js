import { useContext } from 'react'
import Select from 'react-dropdown-select'
import { AppContext } from '../../../app/AppContext'

export default function ItemFormSearch ({ text, name, options, index, lab }) {
  const { form, setForm, extendedItems, setExtendedItems } = useContext(AppContext)
  const value = form.items[index][name]

  const handleNewProduct = () => {
    if (lab) return
    if (!extendedItems.includes(index)) setExtendedItems([...extendedItems, index])
  }

  const handleSelectInfo = (event) => {
    if (event.length) {
      const { value } = event[0]
      const items = [...form.items]
      items[index][name] = value
      setForm({ ...form, items })
    }
  }
  return (
    <div className='w-80 mx-10'>
      {/* {formState.validationErrors && formState.validationErrors.includes('labId') && <ErrorMessage text='El campo Laboratorio es obligatorio' />} */}
      <label>{text}:</label>
      <div className='p-5'>
        <Select
          options={options}
          onChange={(event) => handleSelectInfo(event)}
          name={name}
          values={[{ value, label: value }]}
          valueField='value'
          onCreateNew={handleNewProduct}
          searcheable
          create
          required
        />
      </div>
    </div>
  )
}
