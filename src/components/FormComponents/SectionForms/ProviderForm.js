import { useContext } from 'react'
import { AppContext } from '../../../app/AppContext'
import FormButton from '../../Buttons/FormButton'
import LoadingSpinner from '../../GeneralComponents/LoadingSpinner'
import InputLabel from '../InputLabel'
import useSetFormIfData from '../../hooks/useSetFormIfData'
import useGetPrimarySelectData from '../../hooks/useGetSelectData'
import FormSearch from '../FormSearch'

function ProviderForm ({ submitInfo, data }) {
  const { form, setForm, formState } = useContext(AppContext)
  /*
  ---------------------------------------------------
  CustomHook to handle the submit and items change, add and remove
  */
  const {
    handleSubmit,
    handleAddItem,
    handleRemoveItem,
    setComplexFormData,
    isLoaded
  } = useSetFormIfData(data, 'products')

  setComplexFormData(
    data
      ? {
          id: data.id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          products: data.products
        }
      : null, {
      name: '',
      email: '',
      phone: '',
      products: []
    }
    , submitInfo)
  // -----------------------------------------------------
  /*
  ---------------------------------------------------
  CustomHook to handle the labs data
  */
  const { secondaryOptions } = useGetPrimarySelectData()
  const secOptions = secondaryOptions()
  // -----------------------------------------------------
  return (
    <form
      className='p-5 w-full h-full overflow-scroll flex flex-col items-center'
      onSubmit={handleSubmit}
    >
      {isLoaded && (
        <>
          <div className='flex flex-wrap justify-center' id='form'>
            <InputLabel
              text='Nombre del Proveedor:'
              name='name'
              type='text'
              specialChange={(event) =>
                setForm({ ...form, name: event.target.value })}
            />
            <InputLabel
              text='Email:' name='email'
              type='text'
              specialChange={(event) =>
                setForm({ ...form, email: event.target.value })}
            />
            <InputLabel
              text='Telefono:'
              name='phone'
              type='phone'
              specialChange={(event) =>
                setForm({ ...form, phone: event.target.value })}
            />
            <h3 className='basis-full text-center pr-24 pb-5'>Productos:</h3>
            {form.products.map((product, index) => (
              <div className='flex gap-10 items-center mx-5' key={index}>
                <div
                  key={index}
                  className='flex flex-wrap border border-gray-400 rounded-lg mb-6'
                >
                  <div className='p-3 flex flex-col w-80'>
                    <label>Nombre:</label>
                    <FormSearch name='productName' options={secOptions} itemName='products' index={index} item={product} />
                  </div>
                </div>
                <div
                  className='w-12 h-6 rounded-full mb-6 bg-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-400 hover:text-gray-700 cursor-pointer'
                  onClick={() => handleRemoveItem(index)}
                >
                  <span className='text-2xl font-bold leading-none'>-</span>
                </div>
              </div>
            ))}
          </div>
          <div
            className='w-12 rounded-full mb-6 bg-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-400 hover:text-gray-700 cursor-pointer'
            onClick={() => handleAddItem({ productName: '' })}
          >
            <span className='text-2xl font-bold leading-none'>+</span>
          </div>
        </>
      )}

      {!formState.loading && (
        <FormButton text='Enviar' handleSubmit={handleSubmit} />
      )}
      {formState.loading && <LoadingSpinner />}
    </form>
  )
}

export default ProviderForm
