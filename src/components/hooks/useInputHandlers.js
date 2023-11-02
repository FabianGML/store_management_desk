import { useEffect, useContext, useState } from 'react'
import { AppContext } from '../../app/AppContext'
// import InputLabel from '../FormComponents/InputLabel'
// import ErrorMessage from '../FormComponents/ErrorMessage'

function useInputHandlers (data, itemName) {
  const { form, setForm } = useContext(AppContext)
  const [isLoaded, setIsLoaded] = useState(false)
  const [formUpdated, setFormUpdated] = useState(false)

  function handleSubmit () {
    setFormUpdated(true)
  }

  function handleInputChange (event, index) {
    const { name, value } = event.target
    const items = [...form[itemName]]
    items[index][name] = value
    setForm({ ...form, [itemName]: items })
  }

  function handleAddItem (newItemSchema) {
    const newItem = newItemSchema
    setForm({ ...form, [itemName]: [...form[itemName], newItem] })
  }

  function handleRemoveItem (index) {
    const items = [...form[itemName]]
    const filteredItems = items.filter((_, i) => i !== index)
    setForm((prev) => ({ ...prev, [itemName]: filteredItems }))
  }

  const handleThirdOptionSelectChange = (event, name, index) => {
    const { id } = event
    const items = [...form[itemName]]
    items[index][name] = id
    setForm({
      ...form,
      [itemName]: items
    })
  }

  const setBasicFormData = () => {
    useEffect(() => {
      if (data) {
        setForm(data)
        setIsLoaded(true)
      } else {
        setForm({
          name: '',
          price: '',
          stock: '',
          ingredients: '',
          labId: '',
          description: '',
          expiration: ''
        })
        setIsLoaded(true)
      }
    }, [])
  }

  const setComplexFormData = (setFormSchema1, setFormSchema2, submitInfo) => {
    useEffect(() => {
      if (data) {
        setForm(setFormSchema1)
        setIsLoaded(true)
      } else {
        setForm(setFormSchema2)
        setIsLoaded(true)
      }
    }, [])

    useEffect(() => {
      if (formUpdated) {
        submitInfo()
        setFormUpdated(false)
      }
    }, [handleSubmit])
  }

  const handleSelectInfo = (event, index, name) => {
    if (Array.isArray(event) && event.length > 0) {
      const { value } = event[0]
      const items = [...form[itemName]]
      if (event[0].id) {
        items[index].id = event[0].id
        delete items[index][name]
      } else {
        items[index][name] = value
      }
      setForm({ ...form, items })
    }
  }

  return {
    handleSubmit,
    handleInputChange,
    handleAddItem,
    setBasicFormData,
    handleRemoveItem,
    setComplexFormData,
    isLoaded,
    setIsLoaded,
    handleThirdOptionSelectChange,
    handleSelectInfo
  }
}

export default useInputHandlers
