import { useState, Fragment, useEffect, useContext } from "react"
import SearchButton from "./Buttons/SearchButton"
import Input from "./Input"
import displayedInfoFunction from "../helpers/displayedInfo"
import TableInfo from "./TableInfo"
import { AppContext } from "../app/AppContext"
import getRowContents from "../helpers/rowContents"
import NewEntrance from "./FormComponents/NewEntrance"

function Content({setModal}) {
    const { searchValue, info,  setSearchValue, currentSection, setDisplayedInfo, confirmation } = useContext(AppContext)
    const rowContents = getRowContents(currentSection)[0]
    
    const onSearchValueChange = (event) =>{
        setSearchValue(event.target.value)
    }
    useEffect(() => {
        displayedInfoFunction(searchValue, info, currentSection, setDisplayedInfo)
    }, [searchValue])
    
    
    return(
        <Fragment>
            {confirmation && <NewEntrance text={confirmation}/>}
            <Input 
                searchValue = { searchValue }
                onSearchValueChange = { onSearchValueChange }
                width = 'w-3/4'
                margin= 'mb-10'
            />
            <SearchButton setModal={setModal}/>
            <TableInfo rowContents={ rowContents }/>
            
            
        </Fragment>
    )
}

export default Content