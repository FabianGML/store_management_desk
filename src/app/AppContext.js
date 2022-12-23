import React from "react";

const AppContext = React.createContext();

function AppProvider(props) {
    const [currentSection, setCurrentSection] = React.useState('Productos escasos');
    const [searchValue, setSearchValue] = React.useState('');
    const [rows, setRows] = React.useState([]);

    let searchedValues = [];

    if (searchValue.length >= 1) {
        searchedValues = rows.filter(value => {
            const searchedText = searchValue.toLowerCase();
            const rowName = value.name.toLowerCase();
            if(value.ingredients === null){
                value.ingredients = 'sin Ingredientes';
            }
            const rowIngredients = value.ingredients.toLowerCase();
            if (rowName.includes(searchedText) || rowIngredients.includes(searchedText)  ){
                return value
            }
            
            
        })
    } else {
        searchedValues = rows
    }

    return(
        <AppContext.Provider value={{ 
        currentSection,
        setCurrentSection,
        searchValue, 
        setSearchValue,
        rows,
        setRows,
        searchedValues
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export { AppProvider, AppContext };