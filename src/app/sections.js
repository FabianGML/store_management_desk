import home from '../svg/home-svgrepo-com.svg';
import product from '../svg/products-product-svgrepo-com.svg';
import order from '../svg/order-svgrepo-com.svg';
import provider from '../svg/map-svgrepo-com.svg';
import lab from '../svg/laboratory-svgrepo-com.svg';

// These are the sections that will be render in every views

const sections = [
    {
        svg: home,
        text: 'Inicio',
        
    },
    {
        svg: product,
        text: 'Productos',
        current: false,
    },
    {
        svg: order,
        text: 'Pedidos',
        current: false,
    },
    {
        svg: provider,
        text: 'Proveedores',
        current: false,
    },
    {
        svg: lab,
        text: 'Laboratorios',
        current: false,
    }
  ]

export default sections