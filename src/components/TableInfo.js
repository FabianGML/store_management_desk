import React from "react"
import Data from "./Data"


function TableInfo({ rowContents }) {
    
    return (
        <table className=" w-full border border-slate-300">
            <thead>
                <tr className='h-14'>
                    {/* We iterate the array depends on which section we are */}
                    {rowContents.map(column => (
                        <th key={column}>{column}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                <Data />
            </tbody>
        </table>
    )
}

export default TableInfo