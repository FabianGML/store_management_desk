import { useContext } from 'react'
import { AppContext } from '../../app/AppContext'

function AddButton ({ id }) {
  const { setConfirmation } = useContext(AppContext)
  const addProducts = async () => {
    await window.Data.addProducts(id).then(result => setConfirmation(result))
  }
  return (
    <button className='w-52 h-12 bg-slate-900 hover:bg-slate-800 text-white' onClick={addProducts}>
      Añadir Productos
    </button>
  )
}

export default AddButton
