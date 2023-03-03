import React from "react"
import { AppContext } from "../../app/AppContext"

function FormButton({ text, formState, setFormState, handleSubmit }) {

    return <button type="submit" 
    className="bg-slate-900 hover:bg-slate-700 text-white px-4 py-3 h-16 w-24 mt-20"
    onClick={() => {
        setFormState({
            ...formState,
            loading: true
        })
        handleSubmit()
    }}
    >
        {text}
    </button>
}

export default FormButton