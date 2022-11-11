import Row from './Row';
import React from "react";

function Products({ rows, setRows }) {
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
            { rows.map(product => (
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