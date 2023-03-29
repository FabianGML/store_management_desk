import React from "react"
import { AppContext } from "../../app/AppContext"

function FormInput({ name, type, ref, inputSet, fieldSetId, specialChange }) {
    const { form, setForm, itemsArray, setItemsArray, itemsForm, setItemsForm} = React.useContext(AppContext);

    
    function handleChange(e) {
        if(inputSet === true) {
            setItemsForm({
                [fieldSetId]: {
                    ...itemsForm,
                    [e.target.name]: e.target.value
                }
            })
            console.log(itemsForm)
        }else {
            setForm({
                ...form,
                [e.target.name]: e.target.value
            })
        }
    }

    return (
        <input 
        type={ type }
        className="h-12 border border-black m-5 pl-3" 
        ref={ref}
        name={name}
        onChange={specialChange || handleChange}
        >

        </input>
    )
}

export default FormInput