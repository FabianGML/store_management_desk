import { useContext, useEffect, useState } from 'react'
import IndividualDataTable from '../Individual_Items/individualSections/IndividualDataTable'
import { AppContext } from '../../app/AppContext'
import FormSelect from '../FormComponents/FormSelect'
import NewEntrance from '../FormComponents/NewEntrance'
import PurchaseModal from './PurchaseModal'

function PurchaseSection () {
  const {
    form,
    setForm,
    setFormData,
    modal,
    setModal,
    confirmation,
    setConfirmation,
    shoppingCart,
    setShoppingCart,
    total,
    calculateTotal
  } = useContext(AppContext)
  const columns = [
    ['Producto', 'Cantidad', 'Precio Unitario', 'Importe', 'Editar/Eliminar'],
    ['name', 'amount', 'unitPrice', 'total', 'delete']
  ]
  const [error, setError] = useState('')

  async function updateShoppingCart () {
    await window.Data.getProduct(form, shoppingCart).then((result) => {
      if (typeof result === 'string') {
        setError(result)
      } else {
        setShoppingCart(result)
        // adding all the total prices to get the total of the entire sale and put it in the total state
        calculateTotal(result)
        // Set error back to an empty string in case there was an error before
        setError('')
        setConfirmation('')
      }
      setForm({ code: '' })
    })
  }

  async function getProductsForSelect () {
    await window.Data.productSelect().then((result) => {
      setFormData(result)
    })
  }

  useEffect(() => {
    getProductsForSelect()
  }, [])

  return (
    <div className='flex flex-col h-full w-68 pt-32 px-5 gap-20 items-center justify-center'>
      {(error || confirmation) && (
        <NewEntrance
          text={error || confirmation}
          error={!!error}
        />
      )}
      <div className='w-full'>
        <div>
          <form className='flex items-center'>
            <input
              className='h-12 w-3/12 border-b-2 border-black bg-transparent text-xl text-center my-6 focus:outline-none'
              autoFocus
              value={form.code}
              placeholder='Codigo de Barras'
              onChange={e => setForm({ code: e.target.value })}
            />
            <FormSelect name='product' />
            <button
              className='bg-slate-900 hover:bg-slate-700 text-white px-2 py-4 w-44 ml-5 h-full'
              onClick={(e) => {
                e.preventDefault()
                updateShoppingCart()
              }}
            >
              Agregar producto
            </button>
          </form>
          {shoppingCart && (
            <IndividualDataTable
              individualData={shoppingCart}
              total={total}
              columns={columns}
            />
          )}
        </div>

        {shoppingCart === 0 && (
          <p className='w-screen text-center h-full text-gray-600 text-2xl'>
            Aun no hay productos...
          </p>
        )}
      </div>
      {shoppingCart.length > 0 && (
        <div>
          <button
            className='bg-slate-900 hover:bg-slate-700 text-white px-2 py-4 w-56'
            onClick={() => {
              setModal({
                showModal: true,
                modalType: 'create'
              })
            }}
          >
            Pagar
          </button>
        </div>
      )}
      {modal.showModal && <PurchaseModal name={modal.name} id={modal.id} />}
    </div>
  )
}

export default PurchaseSection
