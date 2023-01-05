import React from "react";
import { AppContext } from "../app/AppContext";
import getRowContents from "../helpers/rowContents";

let id = 1

function printProvider(props) {
    if(props['provider']){
        return (
            <td key={id++}>{props['provider']['name']}</td>
        )
    }
}
function Row(props) {
    const { currentSection } = React.useContext(AppContext)
    // section is where the rows info came 
    const section = getRowContents(currentSection)[1]
    
    
    return (
        <tr className= {`${ props.row % 2 !== 0 ? 'bg-zinc-200 hover:bg-zinc-400 cursor-pointer h-14 text-lg text-center': 'bg-white hover:bg-zinc-400 cursor-pointer h-14 text-lg text-center'}`}>
            {printProvider(props)}
            {section.map(column => (
                <td key={id++}>{props[column]}</td>
            ))}
            {/* {section.Pedidos && section.isPayed === true && <td key={id++}>Pagada</td>}
            {section.Pedidos && section.isPayed === false && <td key={id++}>No Pagada</td>} */}
        </tr>
    )
}

export default Row