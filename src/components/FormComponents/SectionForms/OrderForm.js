import { useContext, Fragment } from 'react'
import { AppContext } from '../../../app/AppContext'
import FormButton from '../../Buttons/FormButton'
import LoadingSpinner from '../../GeneralComponents/LoadingSpinner'
import FormSelect from './../FormSelect'
import InputLabel from '../InputLabel'
import useSetFormIfData from '../../hooks/useSetFormIfData'
import useGetSelectData from '../../hooks/useGetSelectData'
import FormSearch from '../FormSearch'

function OrderForm ({ submitInfo, data }) {
  const { form, setForm, formState } = useContext(AppContext)
  const { primaryOptions, secondaryOptions } = useGetSelectData()
  const primOptions = primaryOptions('primarySelectData')
  const secondOptions = secondaryOptions()
  /*
  ---------------------------------------------------
  CustomHook to handle the submit and items change, add and remove
  */
  const {
    handleSubmit,
    handleInputChange,
    handleAddItem,
    handleRemoveItem,
    setComplexFormData,
    isLoaded
  } = useSetFormIfData(data, 'items')

  setComplexFormData(
    data
      ? {
          id: data.id,
          providerId: data.providerId,
          isPayed: data.isPayed,
          orderArrive: data.orderArrive,
          items: data.items
        }
      : null, {
      providerId: '',
      isPayed: false,
      orderArrive: '',
      items: []
    }
    , submitInfo)
  // -----------------------------------------------------
  return (
    <form
      onSubmit={handleSubmit}
      className='p-5 w-full h-full overflow-scroll flex flex-col items-center'
    >
      {isLoaded && (
        <>
          <div className='flex flex-wrap '>
            <div>
              <label>Proveedor</label>
              <FormSelect name='providerId' options={primOptions} />
            </div>
            <div className='mx-10 p-5 flex flex-col border border-stone-600 rounded-lg'>
              <label>¿Esta Pagado?</label>
              <input
                id='isPayed'
                type='checkbox'
                checked={form.isPayed}
                className='mt-6'
                onChange={(event) =>
                  setForm({ ...form, isPayed: event.target.checked })}
              />
            </div>
            <InputLabel
              text='Fecha de Llegada'
              name='orderArrive'
              type='date'
              specialChange={(event) =>
                setForm({ ...form, orderArrive: event.target.value })}
            />

            <h3 className='basis-full'>Artículos:</h3>

            {form.items.map((item, index) => (
              <Fragment key={index}>
                <div className='flex gap-10 items-center' key={index}>
                  <div
                    className='flex flex-wrap justify-center border border-gray-400 rounded-lg mb-6'
                  >
                    <div className='p-3 flex flex-col w-80'>
                      <label>Nombre:</label>
                      <FormSearch name='name' options={secondOptions} itemName='items' index={index} item={item} />
                    </div>
                    <div>
                      <label>Precio Unitario: </label>
                      <input
                        id={`unitPrice-${index}`}
                        name='unitPrice'
                        type='number'
                        min='0'
                        value={item.unitPrice}
                        className='h-12 border border-black m-5 pl-3'
                        onChange={(event) => handleInputChange(event, index)}
                      />
                    </div>
                    <div>
                      <label>Cantidad:</label>
                      <input
                        id={`amount-${index}`}
                        name='amount'
                        type='number'
                        min='0'
                        value={item.amount}
                        className='h-12 border border-black m-5 pl-3'
                        onChange={(event) => handleInputChange(event, index)}
                      />
                    </div>
                    <div>
                      <label>Fecha de Caducidad:</label>
                      <input
                        id={`expiration-${index}`}
                        name='expiration'
                        type='date'
                        value={item.expiration}
                        className='h-12 border border-black m-5 pl-3'
                        onChange={(event) => handleInputChange(event, index)}
                      />
                    </div>
                  </div>
                  <div
                    className='w-16 h-6 rounded-full mb-6 bg-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-400 hover:text-gray-700 cursor-pointer'
                    onClick={() => handleRemoveItem(index)}
                  >
                    <span className='text-2xl font-bold leading-none'>-</span>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
          <div
            className='w-12 h-6 rounded-full mb-6 bg-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-400 hover:text-gray-700 cursor-pointer'
            onClick={() => handleAddItem({ name: '', unitPrice: '', amount: '', expiration: '' })}
          >
            <span className='text-2xl font-bold leading-none'>+</span>
          </div>
          {!formState.loading && (
            <FormButton
              text='Enviar'
              handleSubmit={handleSubmit}
            />
          )}
        </>
      )}

      {formState.loading && <LoadingSpinner />}
    </form>
  )
}

export default OrderForm
