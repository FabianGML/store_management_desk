import { createContext, useState } from 'react'

const AppContext = createContext()

function AppProvider (props) {
  const [loading, setLoading] = useState(false)
  const [extendedItems, setExtendedItems] = useState([])

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        extendedItems,
        setExtendedItems
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}

export { AppProvider, AppContext }
