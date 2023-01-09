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
            'price',
            'expiration',
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

export default getRowContents