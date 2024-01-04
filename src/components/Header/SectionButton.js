import { useContext } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AppContext } from '../../app/AppContext'

export default function SectionButton ({ image, text, setModal }) {
  const { setForm } = useContext(AppContext)
  const currentSection = useLocation().pathname.slice(1)
  const isActive = currentSection === text ? 'bg-slate-800' : ''

  const handleSectionChange = () => {
    setForm({})
    setModal(false)
  }

  return (
    <li onClick={handleSectionChange}>
      <NavLink to={`/${text}`} className={`flex flex-row  justify-center items-center gap-3 w-48 h-20 rounded-lg hover:bg-slate-800 ${isActive}`}>
        <img src={image} alt={text} className='h-6' />
        <span className='text-white text-lg'>{text}</span>
      </NavLink>
    </li>
  )
}
