import React from "react";

const AppContext = React.createContext();

function AppProvider(props) {
  const [currentSection, setCurrentSection] = React.useState("Productos"); //State to set the section we currently are
  const [searchValue, setSearchValue] = React.useState(""); //State to capture the search input
  const [info, setInfo] = React.useState([]); //State to set the information from the backend
  const [displayedInfo, setDisplayedInfo] = React.useState([]); //State to set the rows wheter the user inputs a search or not
  const [form, setForm] = React.useState({}); // Set the form object to send the information to the backend
  const [formData, setFormData] = React.useState([]); // Some forms need data from a model, this state helps to store this data and use it in a form
  const [itemsArray, setItemsArray] = React.useState([]); // Some forms send more than one item, so we need an state to set the array to combined with the form 
  const [itemsForm, setItemsForm] = React.useState({}); // Some forms need to send a bunch of items together, this state helps to separate the "normal" form from the items
  const [counter, setCounter] = React.useState(2); // Some forms need a counter to make a difference between some fieldsets 

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
        itemsArray,
        setItemsArray,
        itemsForm,
        setItemsForm,
        counter,
        setCounter
        }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export { AppProvider, AppContext };
