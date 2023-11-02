import { useContext, Fragment } from 'react'
import { AppContext } from '../../../app/AppContext'
import FormButton from '../../Buttons/FormButton'
import LoadingSpinner from '../../GeneralComponents/LoadingSpinner'
import FormSelect from './../FormSelect'
import FormSearch from '../FormSearch'
import InputLabel from '../InputLabel'
import useInputHandlers from '../../hooks/useInputHandlers'
import useGetSelectData from '../../hooks/useGetSelectData'
import FormTextArea from '../FormTextArea'
import ErrorMessage from '../ErrorMessage'

function OrderForm ({ submitInfo, data }) {
  const { form, setForm, formState, extendedItem } = useContext(AppContext)
  const { primaryOptions, secondaryOptions } = useGetSelectData()
  const primOptions = primaryOptions('primarySelectData')
  const { secondarySelectOptions, thirdSelectOptions } = secondaryOptions()
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
  } = useInputHandlers(data, 'items')

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
              {formState.validationErrors && formState.validationErrors.includes('providerId') && <ErrorMessage text='El proveedor es obligatorio' />}
              <label>*Proveedor:</label>
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
            <div>
              <InputLabel
                text='*Fecha de Llegada:'
                name='orderArrive'
                type='date'
                required
              />
            </div>

            <h3 className='basis-full'>Artículos:</h3>

            {form.items.map((item, index) => (
              <div className='flex gap-10 items-center' key={index}>
                <div
                  className='flex flex-wrap justify-center border border-gray-400 rounded-lg mb-6 px-6'
                >
                  <div className='p-3 flex flex-col w-72'>
                    {formState.validationErrors && formState.validationErrors.includes('name') && <ErrorMessage text='El nombre del producto es obligatorio' />}
                    <label>*Nombre del producto a agregar:</label>
                    <FormSearch
                      name='name'
                      options={secondarySelectOptions}
                      itemName='items'
                      index={index}
                      item={item}
                      extendedItemSchema={{
                        salePrice: '',
                        codeBar: '',
                        ingredients: '',
                        expiration: '',
                        image: '',
                        lab: '',
                        description: ''
                      }}
                    />
                  </div>
                  <InputLabel
                    text='*Precio Unitario'
                    name='unitPrice'
                    type='number'
                    placeHolder='$67...'
                    specialChange={(event) => handleInputChange(event, index)}
                    index={index}
                    required
                  />
                  <InputLabel
                    text='*Cantidad'
                    name='amount'
                    type='number'
                    placeHolder='5'
                    specialChange={(event) => handleInputChange(event, index)}
                    index={index}
                    required
                  />
                  <InputLabel
                    text='*Caducidad'
                    name='expiration'
                    type='date'
                    specialChange={(event) => handleInputChange(event, index)}
                    index={index}
                    required
                  />
                  {extendedItem.includes(index) && (
                    <>
                      <InputLabel
                        text='*Precio de venta:'
                        name='salePrice'
                        type='number'
                        specialChange={(event) => handleInputChange(event, index)}
                        index={index}
                        required
                      />
                      <InputLabel
                        text='Codigo de Barras:'
                        name='codeBar'
                        type='number'
                        placeHolder='087952345'
                        specialChange={(event) => handleInputChange(event, index)}
                        index={index}
                      />
                      <InputLabel
                        text='Ingredientes:'
                        name='ingredients'
                        type='text'
                        placeHolder='Manzanilla, Equinacea...'
                        specialChange={(event) => handleInputChange(event, index)}
                        index={index}
                      />
                      <div className='flex gap-5 items-center m-5'>
                        <label>Imagen:</label>
                        <input
                          name='image'
                          type='file'
                          className='w-72'
                          onChange={(e) => {
                            const file = e.target.files[0]
                            setForm({
                              ...form,
                              image: {
                                name: file.name,
                                path: file.path,
                                type: file.type
                              }
                            })
                          }}
                        />
                      </div>
                      <div>
                        {formState.validationErrors && formState.validationErrors.includes('lab') && <ErrorMessage text='El Laboratorio es obligatorio' />}
                        <div className='w-72'>
                          <label>*Laboratorio:</label>
                          <FormSearch
                            name='lab'
                            options={thirdSelectOptions}
                            itemName='items'
                            index={index}
                            item={item}
                            lab
                          />
                        </div>
                      </div>
                      <FormTextArea handleChange={(event) => handleInputChange(event, index)} />
                    </>
                  )}
                </div>
                <div
                  className='w-16 h-6 rounded-full mb-6 bg-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-400 hover:text-gray-700 cursor-pointer'
                  onClick={() => handleRemoveItem(index)}
                >
                  <span className='text-2xl font-bold leading-none'>-</span>
                </div>
              </div>
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
