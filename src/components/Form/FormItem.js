import FormSearch from './FormSearch'
import InputLabel from './InputLabel'
import TextArea from './TextArea'
import RemoveItemButton from './RemoveItemButton'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import useGetSelectFormData from '../../hooks/useGetSelectFormData'

export default function FormItem ({ index, itemNumber, removeItem, options }) {
  const [isExtended, setIsExtended] = useState(false)
  const currentSection = useLocation().pathname.slice(1)
  const { getProductsSelectData, getThirdSelectData } = useGetSelectFormData(currentSection)

  const products = getProductsSelectData()
  const thirdOption = getThirdSelectData()

  return (
    <div className='w-full h-full flex justify-center items-center gap-5 col-span-3'>
      <div className={`border border-slate-600 rounded-2xl p-5 ${(currentSection === 'Pedidos' || isExtended) && 'grid grid-cols-3'}`}>
        <FormSearch text='*Name' name={`productName${itemNumber}`} options={products} item setIsExtended={setIsExtended} />
        {currentSection === 'Pedidos' && (
          <>
            <InputLabel labelText='*Precio de compra:' name={`unitPrice${itemNumber}`} type='number' placeholder='$120' />
            <InputLabel labelText='*Cantidad' name={`amount${itemNumber}`} type='number' placeholder='10' />
            <InputLabel labelText='*Fecha de vencimiento:' name={`expiration${itemNumber}`} type='date' />
          </>
        )}
        {isExtended && (
          <>
            {currentSection === 'Proveedores' && <InputLabel labelText='*Precio de venta:' name={`salePrice${itemNumber}`} type='number' placeholder='$120' />}
            <InputLabel labelText='Codigo de barras' name={`codeBar${itemNumber}`} type='number' />
            <InputLabel labelText='Ingredientes' name={`ingredients${itemNumber}`} type='labelText' />
            <InputLabel labelText='Imagen' name={`image${itemNumber}`} type='file' image />
            <FormSearch labelText='*Lab' name={`lab${itemNumber}`} options={thirdOption} text='*Laboratorio' />
            <TextArea name={`description${itemNumber}`} />
          </>
        )}
      </div>
      <RemoveItemButton index={index} removeItem={removeItem} />
    </div>
  )
}
