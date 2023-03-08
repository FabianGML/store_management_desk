import React from "react"
import SearchButton from "./Buttons/SearchButton"
import Input from "./Input"
import displayedInfoFunction from "../helpers/displayedInfo"
import TableInfo from "./TableInfo"
import { AppContext } from "../app/AppContext"
import { getRowContents } from "../helpers/rowContents"

function Content({setModal}) {
    const { searchValue, info,  setSearchValue, currentSection, setDisplayedInfo } = React.useContext(AppContext)
    const rowContents = getRowContents(currentSection)[0]
    
    const onSearchValueChange = (event) =>{
        setSearchValue(event.target.value)
    }
    React.useEffect(() => {
        displayedInfoFunction(searchValue, info, currentSection, setDisplayedInfo)
    }, [searchValue])
    
    
    return(
        <React.Fragment>
            <Input 
                searchValue = { searchValue }
                onSearchValueChange = { onSearchValueChange }
                width = 'w-3/4'
                margin= 'mb-10'
            />
            <SearchButton setModal={setModal}/>
            <TableInfo rowContents={ rowContents }/>
            
            
        </React.Fragment>
    )
}

export default Content