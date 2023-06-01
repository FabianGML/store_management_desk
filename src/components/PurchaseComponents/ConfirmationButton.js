import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../app/AppContext'

function ConfirmationButton ({ id }) {
  const {
    shoppingCart,
    setShoppingCart,
    setConfirmation,
    modal,
    setModal,
    setTotal,
    form,
    calculateTotal
  } = useContext(AppContext)
  const navigate = useNavigate()
  const handleModalFunction = {
    delete: () => handleDelete(),
    create: () => createSale(),
    update: () => handleUpdate()
  }
  // ------------------- Delete an item from the shoppingCart ------------------ //
  const handleDelete = () => {
    shoppingCart.forEach((item, index) => {
      if (item.id === id) {
        shoppingCart.splice(index, 1)
      }
    })
    calculateTotal(shoppingCart)

    setModal(false)
    navigate('/')
  }

  // ------------------- Create a sale in Db ------------------ //
  async function createSale () {
    const data = shoppingCart.map((item) => ({
      productId: item.id,
      amount: item.amount
    }))
    await window.Data.createSale({ items: data }).then((result) => {
      setConfirmation(result)
    })
    setModal(false)
    setShoppingCart([])
    setTotal(0)
    navigate('/')
  }

  function handleUpdate () {
    for (const item of shoppingCart) {
      if (item.id === modal.id) {
        item.amount = form
        item.total = item.unitPrice * form
      }
    }
    calculateTotal(shoppingCart)
    setModal(false)
  }
  return (
    <button
      className='h-12 w-24 bg-slate-900 text-white'
      onClick={handleModalFunction[modal.modalType]}
    >
      Si
    </button>
  )
}

export default ConfirmationButton
