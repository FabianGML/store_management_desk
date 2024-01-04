import { useContext, useEffect } from 'react'
import useGetSelectFormData from '../../../hooks/useGetSelectFormData'
import FormSelect from '../FormSelect'
import { AppContext } from '../../../app/AppContext'
import TextArea from '../TextArea'
import AddItemButton from '../AddItemButton'
import RemoveItemButton from '../RemoveItemButton'
import ItemFormSearch from '../items/ItemFormSearch'
import ItemInputLabel from '../items/ItemInputLabel'
import InputLabel from '../InputLabel'

export default function OrderForm () {
  const { form, setForm, options, products, extendedItems } = useContext(AppContext)
  const { getPrimarySelectData, getProductsSelectData, getThirdSelectData } = useGetSelectFormData('Proveedores')
  getPrimarySelectData()
  getProductsSelectData()
  getThirdSelectData()

  useEffect(() => {
    setForm({
      items: []
    })
  }, [])

  return (
    <div className='grid grid-cols-3 gap-5'>
      <FormSelect name='providerId' options={options} />
      <div className='mx-10 p-5 flex flex-col border border-stone-600 rounded-lg'>
        <label>¿Esta Pagado?</label>
        <input
          id='isPayed'
          type='checkbox'
          // checked={form.isPayed}
          className='mt-6'
          onChange={(event) =>
            setForm({ ...form, isPayed: event.target.checked })}
        />
      </div>
      <InputLabel text='Fecha de llegada:' name='orderArrive' type='date' required />
      <h3 className='col-span-3 ml-7'>Artículos:</h3>
      {form.items && form.items.map((item, index) => (
        <div key={index} className='w-full flex justify-center items-center gap-5 col-span-3'>
          <div className='border border-slate-600 rounded-2xl p-5 grid grid-cols-3'>
            <ItemFormSearch text='*Name' name='name' options={products} index={index} />
            <ItemInputLabel text='*Precio de compra:' name='unitPrice' type='number' placeholder='120' index={index} />
            <ItemInputLabel text='*Cantidad' name='amount' type='number' placeholder='10' index={index} />
            <ItemInputLabel text='*Fecha de vencimiento:' name='expiration' type='date' index={index} />
            {extendedItems.includes(index) && (
              <>
                <ItemInputLabel text='Codigo de barras' name='codeBar' type='number' index={index} />
                <ItemInputLabel text='Ingredientes' name='ingredients' type='text' index={index} />
                <ItemInputLabel text='Imagen' name='image' type='file' index={index} image />
                <ItemFormSearch text='*Lab' name='lab' options={options} index={index} />
                <TextArea index={index} />
              </>
            )}
          </div>
          <RemoveItemButton index={index} />
        </div>
      ))}
      <AddItemButton schema={{ name: '', unitPrice: '', amount: '', expiration: '' }} />
    </div>
  )
}
