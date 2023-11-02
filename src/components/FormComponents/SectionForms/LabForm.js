import { useContext } from 'react'
import { AppContext } from '../../../app/AppContext'
import FormButton from '../../Buttons/FormButton'
import LoadingSpinner from '../../GeneralComponents/LoadingSpinner'
import InputLabel from '../InputLabel'
import useInputHandlers from '../../hooks/useInputHandlers'
import ErrorMessage from '../ErrorMessage'

function LabForm ({ submitInfo, data }) {
  const { formState } = useContext(AppContext)
  useInputHandlers(data)

  return (
    <form
      onSubmit={submitInfo}
      className='p-5 w-full h-full overflow-scroll flex flex-col items-center'
    >
      <div className='flex flex-wrap '>
        {formState.validationErrors && formState.validationErrors.includes('name') && <ErrorMessage text='El nombre es obligatorio' />}
        <InputLabel text='Nombre del laboratorio' name='name' type='text' required />
      </div>
      {!formState.loading && (
        <FormButton
          text='Enviar'
          handleSubmit={submitInfo}
        />
      )}
      {formState.loading && <LoadingSpinner />}
    </form>
  )
}

export default LabForm
