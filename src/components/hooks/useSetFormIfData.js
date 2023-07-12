import { useEffect, useContext, useState } from 'react'
import { AppContext } from '../../app/AppContext'

function useSetFormIfData (data, itemName) {
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
    setForm({ ...form, items })
  }

  function handleAddItem (newItemSchema) {
    const newItem = newItemSchema
    setForm({ ...form, [itemName]: [...form[itemName], newItem] })
  }

  function handleRemoveItem (index) {
    const items = [...form[itemName]]
    items.splice(index, 1)
    setForm({ ...form, [itemName]: items })
  }

  const setBasicFormData = () => {
    useEffect(() => {
      if (data) {
        setForm(data)
      }
    }, [data, setForm])
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

  return {
    handleSubmit,
    handleInputChange,
    handleAddItem,
    setBasicFormData,
    handleRemoveItem,
    setComplexFormData,
    isLoaded,
    setIsLoaded
  }
}

export default useSetFormIfData
