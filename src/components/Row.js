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
            {section.map(column => {
                /* If we are in "orders" section, we need to know wheter or not
                the bill is payed so we print "pagada" if it's payed  
                */
                if (column === 'isPayed' && props[column] === false) {
                    return <td key={id++}>No Pagada</td>
                } 
                else if (column === 'isPayed' && props[column] === true) {
                    return <td key={id++}>Pagada</td>
                } 
                return <td key={id++}>{props[column]}</td>
            } 
            )}
        </tr>
    )
}

export default Row