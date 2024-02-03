import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import useGetSelectFormData from '../../hooks/useGetSelectFormData'
import FormSearch from './FormSearch'
import InputLabel from './InputLabel'
import TextArea from './TextArea'
import RemoveItemButton from './RemoveItemButton'

export default function FormItem ({ index, itemNumber, removeItem }) {
  const [isExtended, setIsExtended] = useState(false)
  const [name, setName] = useState('id')
  const currentSection = useLocation().pathname.slice(1)
  const { getProductsSelectData, getThirdSelectData } = useGetSelectFormData(currentSection)

  const products = getProductsSelectData()
  const thirdOption = getThirdSelectData()

  // This component wrapper is used to display the error message
  // in order to have the index prop available and not repeat code
  // I let this component inside this file because it is only used here
  const InputLabelItem = ({ labelText, name, type, placeholder }) => {
    return (
      <InputLabel
        labelText={labelText}
        name={name}
        type={type}
        placeholder={placeholder}
        index={index}
      />
    )
  }

  return (
    <div className='w-full h-full flex justify-center items-center gap-5 col-span-3'>
      <div className={`border border-slate-600 rounded-2xl p-5 ${(currentSection === 'Pedidos' || isExtended) && 'grid grid-cols-3'}`}>
        <FormSearch
          text='*Name'
          name={`${name}${itemNumber}`}
          options={products}
          item
          setIsExtended={setIsExtended}
          setName={setName}
          index={index}
        />
        {currentSection === 'Pedidos' && (
          <>
            <InputLabelItem labelText='*Precio de compra' name={`unitPrice${itemNumber}`} type='number' placeholder='$120' />
            <InputLabelItem labelText='*Cantidad' name={`amount${itemNumber}`} type='number' placeholder='10' />
            <InputLabelItem labelText='*Fecha de vencimiento' name={`expiration${itemNumber}`} type='date' />
          </>
        )}
        {isExtended && (
          <>
            {currentSection === 'Proveedores' && (
              <>
                <InputLabelItem labelText='*Cantidad' name={`amount${itemNumber}`} type='number' placeholder='10' />
                <InputLabelItem labelText='*Fecha de vencimiento' name={`expiration${itemNumber}`} type='date' />
              </>
            )}
            <InputLabelItem labelText='*Precio de venta' name={`salePrice${itemNumber}`} type='number' placeholder='$120' />
            <InputLabelItem labelText='Codigo de barras' name={`codeBar${itemNumber}`} type='number' />
            <InputLabelItem labelText='Ingredientes' name={`ingredients${itemNumber}`} type='labelText' />
            <InputLabelItem labelText='Imagen' name={`image${itemNumber}`} type='file' image />
            <FormSearch labelText='*Lab' name={`lab${itemNumber}`} options={thirdOption} text='*Laboratorio' />
            <TextArea name={`description${itemNumber}`} />
          </>
        )}
      </div>
      <RemoveItemButton index={index} removeItem={removeItem} />
    </div>
  )
}
