import React from "react";
import { AppContext } from "../../app/AppContext";

function Input({ searchValue, onSearchValueChange, width, margin }) {
    const { currentSection } = React.useContext(AppContext);
    return (
        <input 
            type='search'
            placeholder={`Buscar ${currentSection}...`} 
            className={` ${width} ${margin} h-14  pl-4 text-lg border border-gray-500 rounded-md outline-none`}
            value = { searchValue }
            onChange = { onSearchValueChange }
        ></input>
    )
}

export default Input