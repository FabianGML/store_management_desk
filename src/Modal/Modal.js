import React, { useContext } from 'react'
import ReactDOM from 'react-dom'
import close from '../svg/close-svgrepo-com.svg'
import { AppContext } from '../app/AppContext'
import FormButton from '../components/Form/FormButton'
import LoadingSpinner from '../components/LoadingSpinner'

function Modal ({ currentSection, setModal, productForm, orderForm, providerForm, labForm, handleSubmit }) {
  const { loading, setExtendedItems } = useContext(AppContext)

  const closeModal = () => {
    setModal(false)
    setExtendedItems([])
  }

  return ReactDOM.createPortal(
    <div className='flex flex-col fixed modal justify-start items-end  border-4 border-slate-500 bg-slate-200 mx-64 mt-36 mb-14 overflow-auto'>
      <img
        src={close}
        className='h-8 mr-10 mt-5 hover:bg-stone-400 cursor-pointer rounded-md'
        onClick={closeModal}
      />
      <p className='w-11/12 text-lg font-semibold'>*Campos Obligatorios</p>
      <form className='flex flex-col gap-6 items-center w-full h-3/4 mt-10' onSubmit={handleSubmit}>
        {currentSection === 'Productos' &&
        productForm()}
        {currentSection === 'Pedidos' &&
        orderForm()}
        {currentSection === 'Proveedores' &&
        providerForm()}
        {currentSection === 'Laboratorios' &&
        labForm()}
        <div>
          {!loading && (
            <FormButton text='Enviar' />
          )}
          {loading && (
            <LoadingSpinner />
          )}
        </div>
      </form>
    </div>,
    document.getElementById('modal')
  )
}

export default Modal
