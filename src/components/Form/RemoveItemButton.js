import { useContext } from 'react'
import { AppContext } from '../../app/AppContext'

export default function RemoveItemButton ({ index }) {
  const { form, setForm, extendedItems, setExtendedItems } = useContext(AppContext)

  function handleRemoveItem () {
    // Removing the index number from the extendedItems array
    const newExtendedItems = extendedItems.filter(item => item !== index)
    setExtendedItems(newExtendedItems)
    const items = [...form.items]

    // const items = [...form.items]
    const filteredItems = items.filter((_, i) => i !== index)
    console.log(filteredItems)
    // setForm({ ...form, items: filteredItems })
    setForm((prev) => ({ ...prev, items: filteredItems }))
    console.log(form)
  }
  return (
    <div onClick={handleRemoveItem}>
      <span className='text-2xl font-bold leading-none w-12 h-6 rounded-full mb-6 bg-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-400 hover:text-gray-700 cursor-pointer'>-</span>
    </div>
  )
}
