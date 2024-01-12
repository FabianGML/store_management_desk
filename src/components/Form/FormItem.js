import { useContext, useState } from 'react'
import { AppContext } from '../../app/AppContext'
import FormSearch from './FormSearch'
import InputLabel from './InputLabel'
import TextArea from './TextArea'
import RemoveItemButton from './RemoveItemButton'

export default function FormItem ({ index, itemNumber, removeItem }) {
  const { products, options } = useContext(AppContext)
  const [isExtended, setIsExtended] = useState(false)

  return (
    <div className='w-full h-full flex justify-center items-center gap-5 col-span-3'>
      <div className='border border-slate-600 rounded-2xl p-5 grid grid-cols-3'>
        <FormSearch text='*Name' name={`name${itemNumber}`} options={products} item setIsExtended={setIsExtended} />
        <InputLabel labelText='*Precio de compra:' name={`unitPrice${itemNumber}`} type='number' placeholder='120' />
        <InputLabel labelText='*Cantidad' name={`amount${itemNumber}`} type='number' placeholder='10' />
        <InputLabel labelText='*Fecha de vencimiento:' name={`expiration${itemNumber}`} type='date' />
        {isExtended && (
          <>
            <InputLabel labelText='Codigo de barras' name={`codeBar${itemNumber}`} type='number' />
            <InputLabel labelText='Ingredientes' name={`ingredients${itemNumber}`} type='labelText' />
            <InputLabel labelText='Imagen' name={`image${itemNumber}`} type='file' image />
            <FormSearch labelText='*Lab' name={`lab${itemNumber}`} options={options} text='*Laboratorio' />
            <TextArea name={`description${itemNumber}`} />
          </>
        )}
      </div>
      <RemoveItemButton index={index} removeItem={removeItem} />
    </div>
  )
}
