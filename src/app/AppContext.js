import { createContext, useState } from 'react'

const AppContext = createContext()

function AppProvider (props) {
  const [form, setForm] = useState({})
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState([])
  const [products, setProducts] = useState([])
  const [extendedItems, setExtendedItems] = useState([])
  const [thirdOption, setThirdOption] = useState([])

  return (
    <AppContext.Provider
      value={{
        form,
        setForm,
        loading,
        setLoading,
        options,
        setOptions,
        products,
        setProducts,
        extendedItems,
        setExtendedItems,
        thirdOption,
        setThirdOption
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}

export { AppProvider, AppContext }
