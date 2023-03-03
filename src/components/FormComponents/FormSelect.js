import React from "react"
import { AppContext } from "../../app/AppContext"
import Select from 'react-select'

function FormSelect({name, handleChange}) {
    const { extraData, setExtraData } = React.useContext(AppContext);

    function handleSelectInfo(e){
        const option = {
            [name]:e.value
        }
        handleChange(e,option)
    }
    

    const optionsData = extraData.map(row => {return {value: row.id, label: row.name} })
    
    
    return (
        <Select options={ optionsData } onChange={handleSelectInfo}/>
        // <select name={name} className='w-64 h-14 mt-5'>
        //     { extraData.map(value => (
        //             <option value={value.id} key={value.id} onClick={ handleSelectChange }>{value.name}</option>        
        //         ))
        //     }
        // </select>
    )
}

export default FormSelect