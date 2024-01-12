export default function FormButton ({ text }) {
  return (
    <button type='submit' className='bg-slate-900 hover:bg-slate-700 text-white px-2 py-4 w-56'>
      {text}
    </button>
  )
}
