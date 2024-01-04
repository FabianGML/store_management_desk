import { useContext, useState } from 'react'
import Creatable from 'react-select/creatable'
import { AppContext } from '../../../app/AppContext'

export default function ItemFormSearch ({ text, name, options, index, lab }) {
  const { form, setForm, extendedItems, setExtendedItems } = useContext(AppContext)
  const [value, setValue] = useState('')

  function handleSelectInfo (e) {
    const items = [...form.items]
    setValue(e.value)
    items[index][name] = value
    setForm({ ...form, items })
  }

  const handleNewProduct = (inputValue) => {
    console.log('entrando')
    setValue(inputValue)
    const items = [...form.items]
    items[index][name] = inputValue
    setForm({ ...form, items })

    // Actualizar las opciones solo si no está en modo laboratorio
    if (!lab) {
      if (!extendedItems.includes(index)) setExtendedItems([...extendedItems, index])
    }
    console.log(value)
  }

  return (
    <div className='w-80 mx-10'>
      {/* {formState.validationErrors && formState.validationErrors.includes('labId') && <ErrorMessage text='El campo Laboratorio es obligatorio' />} */}
      <label>{text}:</label>
      <div className='p-5'>
        <Creatable
          options={options}
          onChange={(event) => handleSelectInfo(event)}
          value={value}
          name={name}
          onCreateOption={handleNewProduct}
          controlShouldRenderValue
        />
      </div>
    </div>
  )
}
