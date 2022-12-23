import React from "react";
import { HashRouter, Routes, Route} from "react-router-dom"

import { AppProvider } from "./AppContext";

import Header from "../components/Header";
import Section from "../components/Section";
import MainContent from "../components/MainContent";
import sections from "./sections";

function App() {
  return (
    <HashRouter>
      <AppProvider>

        <Header>
          {sections.map(section => (
            <ul>
              <Section key={section.text} svg={section.svg} text={section.text} path={section.text} />
            </ul>
          ))}
        </Header>

        <Routes>
          <Route path='/' element={<MainContent />} />
          <Route path='/productos' element={<MainContent />} />
          <Route path='/pedidos' element={<MainContent />} />
          <Route path='/proveedores' element={<MainContent />} />
          <Route path='/laboratorios' element={<MainContent />} />
                           
        </Routes>

      </AppProvider>
    </HashRouter>
  )
}
export default App;
