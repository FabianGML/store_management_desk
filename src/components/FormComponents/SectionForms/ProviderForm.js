import { useContext } from 'react'
import { AppContext } from '../../../app/AppContext'
import FormButton from '../../Buttons/FormButton'
import LoadingSpinner from '../../GeneralComponents/LoadingSpinner'
import useInputHandlers from '../../hooks/useInputHandlers'
import useGetSelectData from '../../hooks/useGetSelectData'
import FormSearch from '../FormSearch'
import FormTextArea from '../FormTextArea'
import ErrorMessage from '../ErrorMessage'
import InputLabel from '../InputLabel'

function ProviderForm ({ submitInfo, data }) {
  const { form, setForm, formState, extendedItem } = useContext(AppContext)
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
          name: data.name,
          email: data.email,
          phone: data.phone,
          items: data.items
        }
      : null, {
      name: '',
      email: '',
      phone: '',
      items: []
    }
    , submitInfo)
  // -----------------------------------------------------
  /*
  ---------------------------------------------------
  CustomHook to handle the labs data
  */
  const { secondaryOptions } = useGetSelectData()
  const { secondarySelectOptions, thirdSelectOptions } = secondaryOptions()
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
              text='*Nombre del Proveedor:'
              name='name'
              type='text'
              placeHolder='Soya natura...'
              required
            />
            <InputLabel
              text='Email:'
              name='email'
              placeHolder='correo@mail.com'
              type='email'
            />
            <InputLabel
              text='Telefono:'
              name='phone'
              placeHolder='55834723'
              type='number'
            />
            <h3 className='basis-full text-center pr-24 pb-5'>Productos:</h3>
            {form.items.map((item, index) => (
              <div className='flex gap-10 items-center' key={index}>
                <div
                  className='flex flex-wrap justify-center border border-gray-400 rounded-lg mb-6 px-10'
                >
                  <div className='p-3 flex flex-col w-80'>
                    <label>Nombre del producto:</label>
                    {formState.validationErrors && formState.validationErrors.includes('productName') && <ErrorMessage text='Elproducto es obligatorio' />}
                    <FormSearch
                      name='productName'
                      options={secondarySelectOptions}
                      itemName='items'
                      index={index}
                      item={item}
                      extendedItemSchema={{
                        price: '',
                        codeBar: '',
                        ingredients: '',
                        expiration: '',
                        image: '',
                        lab: '',
                        description: ''
                      }}
                    />
                  </div>
                  {extendedItem.includes(index) && (
                    <>
                      <InputLabel
                        text='*Cantidad:'
                        name='amount'
                        type='number'
                        specialChange={(event) => handleInputChange(event, index)}
                        index={index}
                        required
                      />
                      <InputLabel
                        text='*Caducidad:'
                        name='expiration'
                        type='date'
                        specialChange={(event) => handleInputChange(event, index)}
                        index={index}
                        required
                      />
                      <InputLabel
                        text='*Precio de venta:'
                        name='price'
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
