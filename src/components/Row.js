import React from "react";
import { AppContext } from "../app/AppContext";
import { getRowContents } from "../helpers/rowContents";

let id = 1


function Row(props) {
    const { currentSection } = React.useContext(AppContext)
    // section is where the rows info came 
    const sectionColums = getRowContents(currentSection)[1]
    
    
    return (
        <tr className= {`${ props.row % 2 !== 0 ? 'bg-zinc-200 hover:bg-zinc-400 cursor-pointer h-14 text-lg text-center': 'bg-white hover:bg-zinc-400 cursor-pointer h-14 text-lg text-center'}`}>
            {sectionColums.map(column => {
                /* Some columns need a special render */
                if (column === 'isPayed' && props[column] === false) {
                    return <td key={id++} className='text-red-600'>No Pagada</td>
                } 
                else if (column === 'isPayed' && props[column] === true) {
                    return <td key={id++} className='text-green-600'>Pagada</td>
                } else if (column === 'price' || column === 'total') {
                    return <td key={id++}>${props[column]}</td>
                } else if (column === 'providers' && typeof(props[column]) === 'object'){
                    return (
                        <ul>
                            {props[column].map(prov =>(
                                <li>{prov}</li>
                            ))}
                        </ul>
                        )
                }
                return <td key={id++}>{props[column]}</td>
            } 
            )}
        </tr>
    )
}

export default Row