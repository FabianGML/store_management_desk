import { useContext } from 'react'
import { AppContext } from '../../../app/AppContext'
import FormButton from '../../Buttons/FormButton'
import LoadingSpinner from '../../GeneralComponents/LoadingSpinner'
import InputLabel from '../InputLabel'
import useSetFormIfData from '../../hooks/useSetFormIfData'

function ProviderForm ({ submitInfo, data }) {
  const { form, setForm, formState } = useContext(AppContext)
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
  } = useSetFormIfData(data, 'labs')

  setComplexFormData(
    data
      ? {
          id: data.id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          labs: data.labs
        }
      : null, {
      name: '',
      email: '',
      phone: '',
      labs: [{ labName: '' }]
    }
    , submitInfo)
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
            <h3 className='basis-full'>Laboratorios:</h3>
            {form.labs.map((lab, index) => (
              <div className='flex gap-10 items-center' key={index}>
                <div
                  key={index}
                  className='flex flex-wrap border border-gray-400 rounded-lg mb-6'
                >
                  <div>
                    <label>Nombre:</label>
                    <input
                      id={`name-${index}`}
                      name='labName'
                      type='text'
                      value={lab.labName}
                      className='h-12 border border-black m-5 pl-3'
                      onChange={(event) => handleInputChange(event, index)}
                    />
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
            onClick={() => handleAddItem({ labName: '' })}
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
