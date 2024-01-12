export default function RemoveItemButton ({ index, removeItem }) {
  return (
    <div onClick={() => removeItem(index)}>
      <span className='text-2xl font-bold leading-none w-12 h-6 rounded-full mb-6 bg-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-400 hover:text-gray-700 cursor-pointer'>-</span>
    </div>
  )
}
