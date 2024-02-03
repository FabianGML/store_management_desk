import Message from '../Message'
import { useGetErrorMessage } from '../../hooks/useGetErrorMessage'

export default function InputLabel ({ name, type, labelText, placeholder, required, image, index }) {
  const message = useGetErrorMessage({ name, labelText, index })

  return (
    <div className='mx-10 flex flex-col items-center'>
      {message && <Message text={message} isError />}
      <label className='text-lg self-start' htmlFor={name}>{labelText}</label>
      <input
        className={`h-12 m-5 pl-3 w-64 ${!image ? 'border border-black' : ''}`}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
      />
    </div>
  )
}
