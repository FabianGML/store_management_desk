import { useContext } from 'react'
import { AppContext } from '../../app/AppContext'

export default function AddItemButton ({ schema }) {
  const { form, setForm } = useContext(AppContext)

  const handleAddItem = () => {
    setForm({
      ...form,
      items: [...form.items, schema]
    })
  }
  return (
    <div
      className='col-span-3 flex justify-center items-center'
      onClick={() => handleAddItem()}
    >
      <span className='text-2xl font-bold leading-none w-12 h-6 rounded-full mb-6 bg-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-400 hover:text-gray-700 cursor-pointer'>+</span>
    </div>
  )
}
