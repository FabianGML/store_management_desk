import { useState } from 'react'
import Creatable from 'react-select/creatable'

export default function FormSearch ({ name, text, options, item, setIsExtended }) {
  const [selectedValue, setSelectedValue] = useState(null)

  const handleCreate = (newOption) => {
    setSelectedValue({ label: newOption, value: newOption })
    if (item) setIsExtended(true)
  }

  return (
    <div className='w-80 mx-10'>
      {/* {formState.validationErrors && formState.validationErrors.includes('labId') && <ErrorMessage text='El campo Laboratorio es obligatorio' />} */}
      <label>{text}:</label>
      <div className='p-5'>
        <Creatable
          name={name}
          options={options}
          onCreateOption={handleCreate}
          onChange={(op) => setSelectedValue({ label: op.label, value: op.value })}
          value={selectedValue}
          required
        />
      </div>
    </div>
  )
}
