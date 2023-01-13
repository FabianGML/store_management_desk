import React from "react";

const AppContext = React.createContext();

function AppProvider(props) {
    const [currentSection, setCurrentSection] = React.useState('Inicio');
    const [searchValue, setSearchValue] = React.useState('');
    const [info, setInfo] = React.useState([]);
    const [displayedInfo, setDisplayedInfo] = React.useState([])
    
    return(
        <AppContext.Provider value={{ 
        currentSection,
        setCurrentSection,
        searchValue, 
        setSearchValue,
        info,
        setInfo,
        displayedInfo,
        setDisplayedInfo,
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export { AppProvider, AppContext };