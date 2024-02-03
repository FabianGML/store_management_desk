import { useState } from 'react'
import Creatable from 'react-select/creatable'
import Message from '../Message'
import { useGetErrorMessage } from '../../hooks/useGetErrorMessage'

export default function FormSearch ({ name, text, options, item, setIsExtended, setName, index }) {
  const [selectedValue, setSelectedValue] = useState(null)
  const message = useGetErrorMessage({ name, labelText: text, index })

  const handleCreate = (newOption) => {
    setSelectedValue({ label: newOption, value: newOption })
    if (item) {
      setIsExtended(true)
      setName('productName')
    }
  }

  return (
    <div className='w-80 mx-10 flex flex-col items-center'>
      {message && <Message text={message} isError />}
      <label className='self-start'>{text}:</label>
      <div className='p-5'>
        <Creatable
          name={name}
          options={options}
          onCreateOption={handleCreate}
          onChange={(op) => setSelectedValue({ label: op.label, value: op.value })}
          className='min-w-[18rem]'
          value={selectedValue}
        />
      </div>
    </div>
  )
}
