import Select from 'react-select'
import { useGetErrorMessage } from '../../hooks/useGetErrorMessage'
import Message from '../Message'

export default function FormSelect ({ name, options, classes, labelText, required }) {
  const message = useGetErrorMessage({ name, labelText })
  return (
    <div className='w-full max-w-[22rem] flex flex-col items-center gap-4'>
      {message && <Message text={message} isError />}
      <label className='self-start'>{labelText}</label>
      <Select name={name} options={options} className={classes} />
    </div>
  )
}
