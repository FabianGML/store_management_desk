import { useContext } from 'react'
import Select from 'react-dropdown-select'
import { AppContext } from '../../app/AppContext'

function FormSearch ({ name, options, itemName, index, item, extendedItemSchema, lab }) {
  const { form, setForm, extendedItem, setExtendedItem } = useContext(AppContext)
  const value = form[name] || (form.items[index] && form.items[index][name]) || ''

  const handleSelectInfo = (event) => {
    if (Array.isArray(event) && event.length > 0) {
      const { value } = event[0]
      const items = [...form[itemName]]
      if (item.id || event[0].id) {
        const itemId = item.id || event[0].id
        items[index][name] = value
        lab ? items[index][name] = event[0].id : items[index].id = itemId
      } else {
        items[index][name] = value
        delete items[index].id
      }
      setForm({ ...form, items })
    }
  }

  const handleNewProduct = () => {
    if (!lab) {
      setExtendedItem([...extendedItem, index])
      const items = [...form[itemName]]
      let currentItem = items[index]
      items.splice(index, 1)
      currentItem = { ...currentItem, ...extendedItemSchema }
      setForm({ ...form, [itemName]: [...items, currentItem] })
    }
  }

  return (
    <Select
      options={options}
      onChange={(event) => handleSelectInfo(event)}
      values={[{ value, label: value }]}
      onCreateNew={handleNewProduct}
      searcheable
      create
      required
    />
  )
}

export default FormSearch
