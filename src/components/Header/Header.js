export default function Header ({ children }) {
  return (
    <header className='h-32 bg-slate-900'>
      <nav>
        <ul className='flex flex-row justify-center gap-3 items-center h-32'>
          {children}
        </ul>
      </nav>
    </header>
  )
}
