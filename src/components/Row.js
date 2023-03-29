import React from "react";
import { AppContext } from "../app/AppContext";
import getRowContents from "../helpers/rowContents";

function Row(props) {
    const { currentSection } = React.useContext(AppContext)
    // section is where the rows info came 
    const sectionColums = getRowContents(currentSection)[1]
        
    return (
        <tr className= {`${ props.row % 2 !== 0 ? 'bg-zinc-200 hover:bg-zinc-400 cursor-pointer h-14 text-lg text-center': 'bg-white hover:bg-zinc-400 cursor-pointer h-14 text-lg text-center'}`}>
            {sectionColums && sectionColums.map((column, index) => {
                /* Some columns need a special render */
                if (column === 'isPayed' && props[column] === false) {
                    return <td key={index} className='text-red-600'>No Pagada</td>
                } 
                else if (column === 'isPayed' && props[column] === true) {
                    return <td key={index} className='text-green-600'>Pagada</td>
                } else if (column === 'price' || column === 'total') {
                    return <td key={index}>${props[column]}</td>
                } else if (column === 'providers'){
                    return (    
                        <ul>
                            {props[column] && props['providers'].map((prov, index) =>(
                                <li key={index}>{prov}</li>
                                ))}
                        </ul>
                        )
                }
                return <td key={index}>{props[column]}</td>
            } 
            )}
        </tr>
    )
}

export default Row