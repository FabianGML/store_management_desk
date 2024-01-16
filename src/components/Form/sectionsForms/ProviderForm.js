import InputLabel from '../InputLabel'
import useGetSelectFormData from '../../../hooks/useGetSelectFormData'

export default function ProviderForm () {
  const { getProductsSelectData, getThirdSelectData } = useGetSelectFormData('Proveedores')
  getProductsSelectData()
  getThirdSelectData()

  return (
    <div className='grid grid-cols-3 gap-5 mx-5 place-items-center'>
      <InputLabel
        name='name'
        type='text'
        labelText='*Nombre'
        placeholder='Nombre del proveedor'
        required
      />
      <InputLabel
        name='providerEmail'
        type='email'
        labelText='Correo'
        placeholder='proveedor@mail.com'
      />
      <InputLabel
        name='phone'
        type='text'
        labelText='*Teléfono'
        placeholder='553003030'
      />
    </div>
  )
}
