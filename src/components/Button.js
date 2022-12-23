import React from "react"
import { AppContext } from "../app/AppContext"

function Button() {
    const { currentSection } = React.useContext(AppContext);
    return (
        <button 
        className="bg-slate-900 hover:bg-slate-700 text-white ml-8 p-5 rounded-md">
            Crear { currentSection === 'Proveedores'? currentSection.slice(0,-2): currentSection.slice(0, -1) }
        </button>
    )
}

export default Button