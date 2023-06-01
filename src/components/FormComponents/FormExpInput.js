import React from 'react'

function FormExInput () {
  return (
    <div className='h-12 w-32 border border-black m-5 pl-3 flex justify-center'>
      <input className='outline-none w-10 bg-transparent' placeholder='MM' />
      <span className='text-gray-400 pt-2'> / </span>
      <input className='outline-none w-10 bg-transparent ml-5' placeholder='YY' />
    </div>
  )
}

export default FormExInput
