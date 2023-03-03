import Row from './Row';
import React from "react";
import { AppContext } from '../app/AppContext';

function Data() {
    const { displayedInfo, setDisplayedInfo, info, setInfo, currentSection } = React.useContext(AppContext);

    let row = 1;
    let id = 1;
    
    //Geting the info depends in the section we currently are 
    async function getInfo(){
        await window.Data.info(currentSection)
        .then(result => {
            setInfo(result)
            setDisplayedInfo(result)
        }
        )
    }
    React.useEffect(() => {
        getInfo()
        console.log(info)
        console.log(currentSection)
    }, [currentSection])

    return (
        <React.Fragment>
            { displayedInfo.map(data => (
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