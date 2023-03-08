import React from "react"
import { AppContext } from "../../app/AppContext"
import Select from 'react-select'

function FormSelect({name, handleChange}) {
    const { formData } = React.useContext(AppContext);

    function handleSelectInfo(e){
        const option = {
            [name]:e.value
        }
        handleChange(e,option)
    }
    

    const optionsData = formData.map(row => {return {value: row.id, label: row.name} })
    
    
    return (
        <Select options={ optionsData } onChange={handleSelectInfo} className='pt-5'/>
    )
}

export default FormSelect