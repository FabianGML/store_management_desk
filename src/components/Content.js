import React from "react"
import { AppContext } from "../app/AppContext"
import Button from "./Button"
import Input from "./Input"
import Data from "./Data"
import getRowContents from "../helpers/rowContents"
import displayedInfoFunction from "../helpers/displayedInfo"

function Content() {
    const { searchValue, info,  setSearchValue, currentSection, setDisplayedInfo, displayedInfo } = React.useContext(AppContext)
    
    const onSearchValueChange = (event) =>{
        setSearchValue(event.target.value)
    }
    React.useEffect(() => {
        displayedInfoFunction(searchValue, info, currentSection, setDisplayedInfo, displayedInfo)
        console.log(searchValue)
    }, [searchValue])
    const rowContents = getRowContents(currentSection)[0]
    
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
                        {rowContents.map(column => (
                            <th key={column}>{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <Data />
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default Content