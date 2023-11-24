import { createContext } from 'react'

const AppContext = createContext()

function AppProvider (props) {
  return (
    <AppContext.Provider
      value={{
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}

export { AppProvider, AppContext }
