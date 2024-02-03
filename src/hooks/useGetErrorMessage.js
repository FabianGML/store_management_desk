import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../app/AppContext'

export function useGetErrorMessage ({ name, labelText, index }) {
  const { validationErrors } = useContext(AppContext)
  const [message, setMessage] = useState('')
  useEffect(() => {
    console.log('entrando efect')
    if (index === undefined) {
      console.log('entrando if')
      if (validationErrors?.errors?.includes(name)) {
        setMessage(`${labelText} no puede estar vacío`)
      }
    } else {
      if (validationErrors?.items?.[index]?.includes(name.slice(0, -1))) {
        setMessage(`${labelText} no puede estar vacío`)
      }
    }
  }
  , [validationErrors])
  return message
}
