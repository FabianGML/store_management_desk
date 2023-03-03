import React from "react"
import { AppContext } from "../../app/AppContext"

function FormInput({ name, type }) {
    const { form, setForm } = React.useContext(AppContext)
    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    return (
        <input 
        type={ type }
        className="h-12 border border-black m-5 pl-3" 
        name={name}
        onChange={handleChange}
        >

        </input>
    )
}

export default FormInput