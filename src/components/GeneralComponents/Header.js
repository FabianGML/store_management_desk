import React from 'react'

function Header ({ children }) {
  return (
    <header className='fixed bg-slate-900 w-full z-10'>
      <div className='flex ml-20'>
        {children}
      </div>
    </header>
  )
}

export default Header
