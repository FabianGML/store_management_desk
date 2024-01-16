import { useState } from 'react'
import useGetSelectFormData from '../../../hooks/useGetSelectFormData'
import FormSelect from '../FormSelect'
import InputLabel from '../InputLabel'

export default function OrderForm () {
  const [isPayed, setIsPayed] = useState(false)
  const { getPrimarySelectData } = useGetSelectFormData('Pedidos')
  const options = getPrimarySelectData()

  return (
    <div className='grid grid-cols-3 gap-5 mx-5 place-items-center'>
      <FormSelect name='providerId' options={options} labelText='*Proveedor' />
      <div className='mx-20 p-5 w-48 flex flex-col items-center border border-stone-600 rounded-lg'>
        <label>¿Esta Pagado?</label>
        <input
          type='checkbox'
          name='isPayed'
          value={isPayed}
          className='mt-6'
          onClick={() => setIsPayed(!isPayed)}
        />
      </div>
      <InputLabel labelText='Fecha de llegada:' name='orderArrive' type='date' required />
      <h3 className='col-span-3 '>Artículos:</h3>
    </div>
  )
}
