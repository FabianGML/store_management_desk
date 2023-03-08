import React from "react";

const AppContext = React.createContext();

function AppProvider(props) {
  const [currentSection, setCurrentSection] = React.useState("Productos"); //State to set the section we currently are
  const [searchValue, setSearchValue] = React.useState(""); //State to capture the search input
  const [info, setInfo] = React.useState([]); //State to set the information from the backend
  const [displayedInfo, setDisplayedInfo] = React.useState([]); //State to set the rows wheter the user inputs a search or not
  const [form, setForm] = React.useState({}); // Set the base object to send the information to the backend
  const [formData, setFormData] = React.useState([]); // Some forms need data from a model, this state helps to store this data and use it in a form

  return (
    <AppContext.Provider
      value={{
        currentSection,
        setCurrentSection,
        searchValue,
        setSearchValue,
        info,
        setInfo,
        displayedInfo,
        setDisplayedInfo,
        form,
        setForm,
        formData,
        setFormData,
        }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export { AppProvider, AppContext };
