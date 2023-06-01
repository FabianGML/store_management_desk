function RejectButton ({ setModal }) {
  function closeModal () {
    setModal(false)
  }
  return <button className='h-12 w-24 bg-slate-900 text-white' onClick={closeModal}> No </button>
}

export default RejectButton
