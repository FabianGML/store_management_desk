export default function Message ({ text, isError }) {
  const color = isError ? 'bg-red-600' : 'bg-green-600'
  return (
    <div className={`h-12 w-3/4 px-8 ${color}`}>
      <p className='h-full text-white justify-center items-center flex'>{text}</p>
    </div>
  )
}
