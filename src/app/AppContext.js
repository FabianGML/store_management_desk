import { createContext, useState } from "react";

const AppContext = createContext();

function AppProvider(props) {
  const [currentSection, setCurrentSection] = useState("Productos"); //State to set the section we currently are
  const [searchValue, setSearchValue] = useState(""); //State to capture the search input
  const [info, setInfo] = useState([]); //State to set the information from the backend
  const [individualInfo, setIndividualInfo] = useState({}); // State to set The individual infomation (product, order, provider)
  const [displayedInfo, setDisplayedInfo] = useState([]); //State to set the rows wheter the user inputs a search or not
  const [form, setForm] = useState({}); // Set the form object to send the information to the backend
  const [formData, setFormData] = useState([]); // Some forms need data from a model, this state helps to store this data and use it in a form
  const [counter, setCounter] = useState(2); // Some forms need a counter to make a difference between some fieldsets
  const [confirmation, setConfirmation] = useState(""); // State used to set the delete or update confirmation message
  const [formState, setFormState] = useState({
    loading: false,
    response: {},
  });
  const [modal, setModal] = useState({
    showModal: false,
    modalType: "",
  });
  

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
        counter,
        setCounter,
        confirmation,
        setConfirmation,
        formState,
        setFormState,
        modal,
        setModal
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export { AppProvider, AppContext };
