import { useContext, useState } from 'react'
import useGetSelectFormData from '../../../hooks/useGetSelectFormData'
import FormSelect from '../FormSelect'
import { AppContext } from '../../../app/AppContext'
import InputLabel from '../InputLabe'
import AddItemButton from '../AddItemButton'
import FormItem from '../FormItem'

export default function OrderForm () {
  const [items, setItems] = useState([])
  const [i, setI] = useState(0)
  const [isPayed, setIsPayed] = useState(false)
  const { options } = useContext(AppContext)
  const { getPrimarySelectData, getProductsSelectData, getThirdSelectData } = useGetSelectFormData('Pedidos')
  getPrimarySelectData()
  getProductsSelectData()
  getThirdSelectData()

  const addItem = () => {
    setItems([...items, i])
    setI(prevI => prevI + 1)
  }

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index))
  }

  return (
    <div className='grid grid-cols-3 gap-5 mx-5 place-items-center'>
      <FormSelect name='providerId' options={options} labelText='*Proveedor' />
      <div className='mx-10 p-5 flex flex-col border border-stone-600 rounded-lg'>
        <label>¿Esta Pagado?</label>
        <input
          type='checkbox'
          name='isPayed'
          checked={isPayed}
          className='mt-6'
          onChange={() => setIsPayed(!isPayed)}
        />
      </div>
      <InputLabel labelText='Fecha de llegada:' name='orderArrive' type='date' required />
      <h3 className='col-span-3 ml-7'>Artículos:</h3>
      {items.map(item => (<FormItem key={item} index={items.indexOf(item)} itemNumber={item} removeItem={removeItem} />))}
      <AddItemButton addItem={addItem} />
    </div>
  )
}
