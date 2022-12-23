import React from "react"
import { AppContext } from "../app/AppContext"
import Button from "./Button"
import Input from "./Input"
import Products from "./Products"


function Content() {
    const { searchValue, setSearchValue } = React.useContext(AppContext)

    const rowContents = 
        {
            Products: [ 
                'Producto',
                'Stock',
                'Caducidad',
                'Precio',
                'Laboratorio'
            ],

        }
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
            <Button />
            <table className=" w-full border border-slate-300">
                <thead>
                    <tr className='h-14'>
                        {/* We iterate the array depends on which section we are */}
                        {rowContents.Products.map(column => (
                            <th>{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <Products />
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default Content