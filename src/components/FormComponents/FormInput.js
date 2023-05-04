import React from "react"
import { AppContext } from "../../app/AppContext"

function FormInput({ name, type, specialChange }) {
    const { form, setForm } = React.useContext(AppContext);
    
    function handleChange(e) {
            setForm({
                ...form,
                [e.target.name]: e.target.value
            })
            console.log(form)
    }

    return (
        <input 
        type={ type }
        className="h-12 border border-black m-5 pl-3" 
        name={name}
        value={form[name]}
        onChange={specialChange || handleChange}
        >

        </input>
    )
}

export default FormInput