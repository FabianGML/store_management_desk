import { useContext } from 'react'
import { AppContext } from '../../app/AppContext'

export default function TextArea ({ index }) {
  const { form, setForm } = useContext(AppContext)

  const handleChange = (e) => {
    if (index) {
      const { name, value } = e.target
      const items = [...form.items]
      items[index][name] = value
      setForm({ ...form, items })
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value
      })
    }
  }

  return (
    <div className='flex justify-center items-center col-span-3 pr-24'>
      <label>Descripcion:</label>
      <textarea
        name='description'
        className='border border-black h-32 m-5 w-64 p-2'
        value={form.description}
        onChange={handleChange}
      />
    </div>
  )
}
