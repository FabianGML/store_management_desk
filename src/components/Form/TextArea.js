export default function TextArea ({ defaultValue, name }) {
  return (
    <div className='flex justify-center items-center col-span-3 pr-24'>
      <label>Descripcion:</label>
      <textarea
        name={name}
        className='border border-black h-32 m-5 w-64 p-2'
        defaultValue={defaultValue}
      />
    </div>
  )
}
