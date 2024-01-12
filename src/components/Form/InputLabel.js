export default function InputLabel ({ name, type, labelText, placeholder, required, image }) {
  return (
    <div className='mx-10 flex flex-col'>
      <label className='text-lg' htmlFor={name}>{labelText}</label>
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
