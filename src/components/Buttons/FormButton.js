import React from "react"

function FormButton({ text, formState, setFormState, handleSubmit }) {

    return <button type="submit" 
    className="bg-slate-900 hover:bg-slate-700 text-white px-4 h-16 w-60 "
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