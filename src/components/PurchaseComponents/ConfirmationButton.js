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
    const data = shoppingCart.map((item) => {
      const { id, amount, unitPrice, total } = item
      const discount = item.discount || 0
      return {
        productId: id,
        amount,
        unitPrice,
        total,
        discount
      }
    })
    console.log(data)
    await window.Data.createSale(data).then((result) => {
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
        if (form.amount) {
          const discount = item.discount
          const sumOfItems = item.unitPrice * form.amount
          item.amount = form.amount
          discount ? item.total = sumOfItems - (sumOfItems * (discount / 100)) : item.total = sumOfItems
        }
        if (form.discount) {
          console.log('estoy entrando')
          item.discount = form.discount
          item.total = (item.unitPrice - (item.unitPrice * (form.discount / 100))) * item.amount
        }
        if (!form.amount && !form.discount) {
          return
        }
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
      Confirmar
    </button>
  )
}

export default ConfirmationButton
