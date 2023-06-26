import { useContext } from 'react'
import { AppContext } from '../../../app/AppContext'
import FormButton from '../../Buttons/FormButton'
import LoadingSpinner from '../../GeneralComponents/LoadingSpinner'
import InputLabel from '../InputLabel'
import useSetFormIfData from '../../hooks/useSetFormIfData'

function LabForm ({ submitInfo, data }) {
  const { formState } = useContext(AppContext)
  useSetFormIfData(data)

  return (
    <form
      onSubmit={submitInfo}
      className='p-5 w-full h-full overflow-scroll flex flex-col items-center'
    >
      <div className='flex flex-wrap '>
        <InputLabel text='Nombre del laboratorio' name='name' type='text' />
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
