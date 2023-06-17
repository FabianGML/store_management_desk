function SaleSquare ({ text, number, color }) {
  return (
    <div className={`flex flex-col text-white gap-7 w-60 h-32 bg-${color}-600`}>
      <span className='text-xl p-2 underline underline-offset-4'>${number}</span>
      <span className='self-center text-xl'>{text}</span>
    </div>
  )
}

export default SaleSquare
