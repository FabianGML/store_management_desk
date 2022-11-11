import React from "react";

function Row(props) {
    console.log(props)
    return (
        <tr className= {`${ props.row % 2 !== 0 ? 'bg-zinc-200 hover:bg-zinc-400 cursor-pointer h-14 text-lg text-center': 'bg-white hover:bg-zinc-400 cursor-pointer h-14 text-lg text-center'}`}  >
            <td>{props.name}</td>
            <td className={`${props.stock <= 5 ? 'text-red-600' : ''}`}  >{props.stock}</td>
            <td>{props.expiration}</td>
            <td>${props.price}</td>
            <td>{props.lab}</td> {/* no se puede llamar a lab.name (averiguar por que ) */}
        </tr>
    )
}

export default Row