import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'

import { AppProvider } from './AppContext'

import Header from '../components/Header/Header'
// import Section from '../components/GeneralComponents/Section'
import sections from './sections'
import PurchaseSection from '../pages/PuchaseSection'
import AdminPage from '../pages/AdminPage'
import SectionButton from '../components/Header/SectionButton'

function App () {
  return (
    <HashRouter>
      <AppProvider>

        <Header>
          {sections.map(section => (
            <SectionButton image={section.svg} text={section.text} path={section.text} key={section.text} />
          ))}
        </Header>

        <Routes>
          <Route path='/' element={<PurchaseSection />} />
          {/* <Route path='/ventas' element={<SaleSection />} /> */}
          <Route path='/productos' element={<AdminPage />} />
          {/* <Route path='/productos/:id' element={<IndividualSection />} />
          <Route path='/pedidos' element={<MainContent />} />
          <Route path='/pedidos/:id' element={<IndividualSection />} />
          <Route path='/proveedores' element={<MainContent />} />
          <Route path='/proveedores/:id' element={<IndividualSection />} />
          <Route path='/laboratorios' element={<MainContent />} />
          <Route path='/laboratorios/:id' element={<IndividualSection />} /> */}
        </Routes>

      </AppProvider>
    </HashRouter>
  )
}
export default App
