function getRowContents(currentSection){
    const rowContents = 
    {
        Productos: [[ 
            'Producto',
            'Stock',
            'Caducidad',
            'Precio',
            'Laboratorio',
            'Proveedores'
            ],
            [
            'name',
            'stock',
            'expiration',
            'price',
            'lab.name',
            'providers'
            ]
        ],
        Pedidos: [[ 
            'Proveedor',
            'Fecha de Llegada',
            'Total',
            'Pagada',
            ],
            [
            'provider.name',
            'orderArrive',
            'total',
            'isPayed'
            ]
        ],
        Proveedores: [
            [
            'Nombre',
            'Email',
            'Numero',
            ],
            [
            'name',
            'email',
            'phone'
            ]
        ],
        Laboratorios: [
            [
            'Nombre',
            ],
            [
            'name'
            ]
        ],
    }
    return rowContents[currentSection]
}

function getInputContents(section) {
    const inputsContents = {
        Productos: 
        // {
        //     Producto: 'name',
        //     Precio: 'price',
        //     Stock: 'stock',
        //     Linea: 'line',
        //     Laboratorio: 'labId',
        //     Caducidad: 'expiration',
        //     Descripcion: 'description'
        // }
        [
            /* [label, name, type]
                -label that will appear in the "label" element
                -name that is used to send the data to the backend
                -type of the input if need it 
            */
            ['Producto','name', 'text'],
            ['Precio','price', 'number'],
            ['Stock','stock', 'number'],
            ['Ingredientes','ingredients', 'text'],
            ['Imagen','image', 'file'],
            ['Laboratorio','labId'],
            ['Caducidad','expiration', 'date'],
            ['Descripcion','description'],
        ],
        // Pedidos:
        // [
        //     ['Laboratorio','labId'],
        //     ['Pagada','isPayed'],
        //     ['Llegada del Pedido','orderArrive', 'date'],
        //     ['Ingredientes','ingredients', 'text'],
        //     ['Laboratorio','labId'],
        //     ['Caducidad','expiration', 'date'],
        //     ['Descripcion','description'],
        // ],
    }
    return inputsContents[section]
}
export { getRowContents, getInputContents }