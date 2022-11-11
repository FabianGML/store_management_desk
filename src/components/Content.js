import React from "react"
import Button from "./Button"
import Input from "./Input"


function Content({ children, searchValue, setSearchValue }) {
    const onSearchValueChange = (event) =>{
        setSearchValue(event.target.value)
    }

    return(
        <React.Fragment>
            <Input 
                searchValue = { searchValue }
                onSearchValueChange = { onSearchValueChange }
                width = 'w-3/4'
                margin= 'mb-10'
            />
            <Button 
                section = 'Productos' //se deberia cambiar por la seccion 
            />
            <table className=" w-full border border-slate-300">
                <thead>
                    <tr className='h-14'>
                    <th>Producto</th>
                    <th>Stock</th>
                    <th>Caducidad</th>
                    <th>Precio</th>
                    <th>Laboratorio</th>
                    </tr>
                </thead>
                <tbody>
                    { children }
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default Content