import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom"

import { AppProvider } from "./AppContext";

import Header from "../components/Header";
import Section from "../components/Section";
import MainContent from "../components/MainContent";
import sections from "./sections";
import IndividualProduct from "../components/Individual_Items/individualSections/IndividualProduct";
import IndividualSection from "../components/Individual_Items/individualSections/IndividualSection";
import IndividualOrder from "../components/Individual_Items/individualSections/IndividualOrder";

function App() {

  return (
    <HashRouter>
      <AppProvider>

        <Header>
          {sections.map(section => (
            <ul key={section.text}>
              <Section svg={section.svg} text={section.text} path={section.text} />
            </ul>
          ))}
        </Header>

        <Routes>
          <Route path='/' element={<p>Inicio</p>} />
          <Route path='/productos' element={<MainContent />} />
          <Route path='/productos/:id' element={<IndividualSection />} />
          <Route path='/pedidos' element={<MainContent />} />
          <Route path='/pedidos/:id' element={<IndividualSection/>} />
          <Route path='/proveedores' element={<MainContent />} />
          <Route path='/proveedores/:id' element={<IndividualSection/>} />
          <Route path='/laboratorios' element={<MainContent />} />  
          <Route path='/laboratorios/:id' element={<IndividualSection/>} />
        </Routes>

      </AppProvider>
    </HashRouter>
  )
}
export default App;
