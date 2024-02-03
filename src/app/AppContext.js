import { createContext, useState } from 'react'

const AppContext = createContext()

function AppProvider (props) {
  const [loading, setLoading] = useState(false)
  const [extendedItems, setExtendedItems] = useState([])
  const [message, setMessage] = useState('')
  const [validationErrors, setValidationErrors] = useState({})

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        extendedItems,
        setExtendedItems,
        message,
        setMessage,
        validationErrors,
        setValidationErrors
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}

export { AppProvider, AppContext }
