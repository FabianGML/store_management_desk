import React from 'react'
import ReactDOM from 'react-dom'
import { AppContext } from '../app/AppContext'
import close from '../svg/close-svgrepo-com.svg'

function Modal ({ productForm, orderForm, providerForm, labForm, handleSubmit }) {
  const { currentSection, setFormData, setModal } = React.useContext(AppContext)

  async function getFormData () {
    await window.Data.formData(currentSection).then((result) => {
      setFormData(result)
    })
  }

  function closeModal () {
    if (setModal) {
      setModal(false)
    }
  }

  React.useEffect(() => {
    getFormData()
  }, [])

  return ReactDOM.createPortal(
    <div className='flex flex-col fixed modal justify-center items-end  border-4 border-slate-500 bg-slate-200 mx-64 mt-36 mb-14'>
      <img
        src={close}
        className='h-8 mr-10 mt-5 hover:bg-stone-400 cursor-pointer rounded-md'
        onClick={closeModal}
      />
      {currentSection === 'Productos' &&
        productForm(handleSubmit)}
      {currentSection === 'Pedidos' &&
        orderForm(handleSubmit)}
      {currentSection === 'Proveedores' &&
        providerForm(handleSubmit)}
      {currentSection === 'Laboratorios' &&
        labForm(handleSubmit)}
    </div>,
    document.getElementById('modal')
  )
}

export default Modal
