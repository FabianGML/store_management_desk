export default function FormButton ({ text, handleSubmit }) {
  return (
    <button
      type='submit'
      className='bg-slate-900 hover:bg-slate-700 text-white px-2 py-4 w-56'
      onClick={handleSubmit}
    >
      {text}
    </button>
  )
}
