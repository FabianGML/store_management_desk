import Row from './Row';
import React from "react";
import { AppContext } from '../app/AppContext';

function Products() {
    const { searchedValues, setRows } = React.useContext(AppContext);

    let row = 1;


    React.useEffect(() => {
        window.Products.products()
        .then(result => {
            setRows(result)
        }
            )

    }, [])

    return (
        <React.Fragment>
            { searchedValues.map(product => (
                <Row
                    key= { product.id }
                    row = { row++ }
                    {...product}
                />
            ))}
        </React.Fragment>

    )
}

export default Products