import Row from './Row';
import React from "react";
import { AppContext } from '../app/AppContext';

function Data() {
    const { searchedValues, setSearchValue, rows, setRows, currentSection, setCurrentSection } = React.useContext(AppContext);

    let row = 1;
    let id = 1;
    
    async function getInfo(){
        await window.Data.info(currentSection)
        .then(result => {
            setRows(result)
        }
        )
    }
    React.useEffect(() => {
        getInfo()
        console.log(rows)
        console.log(currentSection)
        
    }, [currentSection])

    return (
        <React.Fragment>
            { searchedValues.map(data => (
                <Row
                    key= { id++ }
                    row = { row++ }
                    {...data}
                />
            ))}
        </React.Fragment>

    )
}

export default Data