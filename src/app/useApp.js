import React from "react";

function useApp() {
    const [section, setSection] = React.useState('Productos Escasos');
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
            // console.log(value.ingredients)
            
        })
    } else {
        searchedValues = rows
    }

    return({ 
        section,
        setSection,
        searchValue, 
        setSearchValue,
        rows,
        setRows,
        searchedValues
    })
}

export default useApp;