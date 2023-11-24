import { NavLink } from 'react-router-dom'

export default function SectionButton ({ image, text }) {
  return (
    <li>
      <NavLink to={`/${text}`} className='flex flex-row  justify-center items-center gap-3 w-48 h-20 rounded-lg hover:bg-slate-800'>
        <img src={image} alt={text} className='h-6' />
        <span className='text-white text-lg'>{text}</span>
      </NavLink>
    </li>
  )
}
