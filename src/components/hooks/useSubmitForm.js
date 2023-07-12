import { useContext, useEffect } from 'react'
import { AppContext } from '../../app/AppContext'
import { useNavigate } from 'react-router-dom'

const useSubmitForm = () => {
  const { currentSection, form, setForm, formState, setFormState, setModal } = useContext(AppContext)
  const navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      const response = await window.Data.createEntrance(currentSection, form)
      navigate(`/${currentSection}`)
      setModal(false)
      setFormState({
        loading: false
      })
      if (response) {
        setFormState({
          ...formState,
          response
        })
        setForm({})
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    handleSubmit()
  }, [])

  return handleSubmit
}

export default useSubmitForm
