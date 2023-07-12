import { createPortal } from 'react-dom'
import ConfirmationButton from './ConfirmationButton'
import RejectButton from './RejectButton'
import { Fragment, useContext } from 'react'
import { AppContext } from '../../app/AppContext'

function PurchaseModal ({ name, id }) {
  const { modal, setModal, total, form, setForm } = useContext(AppContext)
  return createPortal(
    <div className='flex flex-col fixed modal justify-center items-center border-4 border-slate-500 bg-slate-200 mx-72 my-56 py-5'>
      {/* ------------------------------------------------------------------ */}
      {modal.modalType === 'delete' && (
        <>
          <p className='text-xl text-center'>
            {' '}
            Seguro que quieres retirar {name} ?
          </p>
          <div className=' flex gap-5 mt-7'>
            <ConfirmationButton id={id} />
            <RejectButton setModal={setModal} id={id} />
          </div>
        </>
      )}
      {/* ------------------------------------------------------------------ */}
      {modal.modalType === 'create' && (
        <>
          <p className='text-2xl text-center'>{` Cobrar: $${total}`}</p>
          <input
            className='h-12 w-3/12 border-b-2 border-black bg-transparent text-xl text-center my-6 focus:outline-none'
            autoFocus
            placeholder='El cliente paga...'
            onChange={(e) => setForm(e.target.value)}
          />
          <p className='text-2xl text-center'>
            {`Cambio: ${form - total || 0}`}{' '}
          </p>
          <div className=' flex gap-5 mt-7'>
            <ConfirmationButton id={id} />
            <RejectButton setModal={setModal} id={id} />
          </div>
        </>
      )}
      {/* ------------------------------------------------------------------ */}
      {modal.modalType === 'update' && (
        <>
          <p className='text-2xl text-center'>{` Cantidad actual: ${modal.amount}`}</p>
          <label className='fold-bold text-lg'>Nueva cantidad del producto:</label>
          <input
            name='amount'
            className='h-12 w-3/12 border-b-2 border-black bg-transparent text-xl text-center my-6 focus:outline-none'
            autoFocus
            placeholder='5'
            onChange={(e) => setForm({
              ...form,
              [e.target.name]: e.target.value
            })}
          />
          <label className='fold-bold text-lg'>Descuento:</label>
          <input
            name='discount'
            className='h-12 w-3/12 border-b-2 border-black bg-transparent text-xl text-center my-6 focus:outline-none'
            autoFocus
            placeholder='30%'
            onChange={(e) => setForm({
              ...form,
              [e.target.name]: e.target.value
            })}
          />
          <div className=' flex gap-5 mt-7 items-center'>
            <p>Quieres actualizar la cantidad?</p>
            <ConfirmationButton id={id} />
            <RejectButton setModal={setModal} id={id} />
          </div>
        </>
      )}
    </div>,
    document.getElementById('modal')
  )
}

export default PurchaseModal
