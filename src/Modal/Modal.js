import React, { useContext, useState } from 'react'
import ReactDOM from 'react-dom'
import close from '../svg/close-svgrepo-com.svg'
import { AppContext } from '../app/AppContext'
import FormButton from '../components/Form/FormButton'
import LoadingSpinner from '../components/LoadingSpinner'
import FormItem from '../components/Form/FormItem'
import AddItemButton from '../components/Form/AddItemButton'

function Modal ({ currentSection, setModal, productForm, orderForm, providerForm, labForm, handleSubmit }) {
  const [items, setItems] = useState([])
  const [i, setI] = useState(0)
  const { loading, setExtendedItems, setValidationErrors } = useContext(AppContext)
  const addItem = () => {
    setItems([...items, i])
    setI(prevI => prevI + 1)
  }

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const closeModal = () => {
    setModal(false)
    setExtendedItems([])
    setValidationErrors({})
  }

  return ReactDOM.createPortal(
    <div className='flex flex-col fixed modal justify-start items-end  border-4 border-slate-500 bg-slate-200 mx-64 mt-36 mb-14 overflow-auto'>
      <img
        src={close}
        className='h-8 mr-10 mt-5 hover:bg-stone-400 cursor-pointer rounded-md'
        onClick={closeModal}
      />
      <p className='w-11/12 text-lg font-semibold'>*Campos Obligatorios</p>
      <form className='flex flex-col gap-6 items-center w-full min-w-full mt-10 mb-10' onSubmit={handleSubmit}>
        {currentSection === 'Productos' &&
        productForm()}
        {currentSection === 'Pedidos' &&
        orderForm()}
        {currentSection === 'Proveedores' &&
        providerForm()}
        {currentSection === 'Laboratorios' &&
        labForm()}

        {currentSection !== 'Productos' && items.map(item => (<FormItem key={item} index={items.indexOf(item)} itemNumber={item} removeItem={removeItem} />))}
        {currentSection !== 'Productos' && <AddItemButton addItem={addItem} />}
        {!loading && (
          <FormButton text='Enviar' />
        )}
        {loading && (
          <LoadingSpinner />
        )}
      </form>
    </div>,
    document.getElementById('modal')
  )
}

export default Modal
