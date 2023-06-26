import { createContext, useState } from 'react'

const AppContext = createContext()

function AppProvider (props) {
  const [currentSection, setCurrentSection] = useState('Productos') // State to set the section we currently are
  const [searchValue, setSearchValue] = useState('') // State to capture the search input
  const [info, setInfo] = useState([]) // State to set the information from the backend
  const [individualInfo, setIndividualInfo] = useState({}) // State to set The individual infomation (product, order, provider)
  const [displayedInfo, setDisplayedInfo] = useState([]) // State to set the rows wheter the user inputs a search or not
  const [form, setForm] = useState({}) // Set the form object to send the information to the backend
  const [formData, setFormData] = useState([]) // Some forms need data from a model, this state helps to store this data and use it in a form
  const [confirmation, setConfirmation] = useState('') // State used to set the delete or update confirmation message
  const [formState, setFormState] = useState({
    // State use to set the loading screen after a form is send to the backend
    loading: false,
    response: ''
  })
  const [modal, setModal] = useState(false) // State use to set if the current modal should be close or open
  const [shoppingCart, setShoppingCart] = useState([]) // State used to controle the shoppingCart either we change of section or not
  const [total, setTotal] = useState('') // State use to set the total of the shoppingCart

  // ----------- Calculate the total of the shoppingCart ----------------- //
  const calculateTotal = (array) => {
    const total = array
      .map(({ total }) => total)
      .reduce((total, price) => total + price, 0)
    setTotal(total)
  }

  return (
    <AppContext.Provider
      value={{
        currentSection,
        setCurrentSection,
        searchValue,
        setSearchValue,
        info,
        setInfo,
        individualInfo,
        setIndividualInfo,
        displayedInfo,
        setDisplayedInfo,
        form,
        setForm,
        formData,
        setFormData,
        confirmation,
        setConfirmation,
        formState,
        setFormState,
        modal,
        setModal,
        shoppingCart,
        setShoppingCart,
        total,
        setTotal,
        calculateTotal
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}

export { AppProvider, AppContext }
