import React from "react";

import useApp from "./useApp";

import Header from "../components/Header";
import Section from "../components/Section";
import MainContent from "../components/MainContent";
import Title from "../components/Title";
import Content from "../components/Content";
import Products from '../components/Products';

import home from '../svg/home-svgrepo-com.svg';
import product from '../svg/products-product-svgrepo-com.svg';
import order from '../svg/order-svgrepo-com.svg';
import provider from '../svg/map-svgrepo-com.svg';
import lab from '../svg/laboratory-svgrepo-com.svg';

function App() {
  const {
    section,
    setSection,
    searchValue, 
    setSearchValue,
    rows,
    setRows,
    searchedValues
  } = useApp();

  return (
    <React.Fragment>
      <Header>
            <Section svg={ home } text='Inicio' />
            <Section svg={ product } text='Productos' />
            <Section svg={ order } text='Pedidos' />
            <Section svg={ provider } text='Proveedores' />
            <Section svg={ lab } text='Laboratorios' />
      </Header>

      <MainContent> 
          <Title title='Productos Escasos'/>
          <Content 
            searchValue = { searchValue } 
            setSearchValue = { setSearchValue }
          >
            <Products 
              rows= { searchedValues } 
              setRows = { setRows }
              />
          </Content>
      </MainContent>
    </React.Fragment>
    
  )
}
export default App;
