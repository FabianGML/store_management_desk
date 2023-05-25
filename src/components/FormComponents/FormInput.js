import { useContext, useRef } from "react"
import { AppContext } from "../../app/AppContext"

function FormInput({ name, type, specialChange, placeHolder, autofocus}) {
    const { form, setForm } = useContext(AppContext);
    
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
        autofocus
        name={name}
        value={form[name]}
        onChange={specialChange || handleChange}
        placeholder={placeHolder || ''}
        >

        </input>
    )
}

export default FormInput