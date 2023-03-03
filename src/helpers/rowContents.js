function getRowContents(currentSection){
    const rowContents = 
    {
        Productos: [[ 
            'Producto',
            'Stock',
            'Caducidad',
            'Precio',
            'Laboratorio'
            ],
            [
            'name',
            'stock',
            'expiration',
            'price',
            'lab.name'
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
            ['Producto','name', 'text'],
            ['Precio','price', 'number'],
            ['Stock','stock', 'number'],
            ['Linea','line',],
            ['Ingredientes','ingredients', 'text'],
            ['Laboratorio','labId'],
            ['Caducidad','expiration', 'date'],
            ['Descripcion','description'],
        ]
    }
    return inputsContents[section]
}
export { getRowContents, getInputContents }