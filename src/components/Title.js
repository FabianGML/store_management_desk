import React from "react";
import { AppContext } from "../app/AppContext";

function Title() {
    const { currentSection } = React.useContext(AppContext);

    return (
            <h1 
            className="text-4xl h-20 pb-14 pl-7 mb-7 border-b border-black" 
            id="title">
                { currentSection === 'Inicio'? 'Productos escasos': currentSection }
            </h1>
    )
}

export default Title;