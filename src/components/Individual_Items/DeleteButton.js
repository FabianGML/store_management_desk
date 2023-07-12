import { useContext } from 'react'
import { AppContext } from '../../app/AppContext'

function DeleteButton ({ setModal }) {
  const { currentSection } = useContext(AppContext)

  function openModal () {
    setModal({
      showModal: true,
      modalType: 'delete'
    })
  }
  return (
    <button
      className='w-52 h-12 bg-red-700 hover:bg-red-600 text-white'
      onClick={openModal}
    >{`Borrar ${currentSection}`}
    </button>
  )
}

export default DeleteButton
