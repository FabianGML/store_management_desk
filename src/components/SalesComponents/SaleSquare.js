function SaleSquare ({ text, number, color }) {
  const colors = {
    green: 'bg-lime-600',
    orange: 'bg-orange-600',
    cyan: 'bg-cyan-600'
  }
  return (
    <div className={`flex flex-col text-white gap-7 w-60 h-32 ${colors[color]}`}>
      <span className='text-xl p-2 underline underline-offset-4'>${number}</span>
      <span className='self-center text-xl'>{text}</span>
    </div>
  )
}

export default SaleSquare
