import Select from 'react-select'

export default function FormSelect ({ name, options, classes, labelText }) {
  return (
    <div className='w-full max-w-[22rem] flex flex-col gap-4'>
      <label>{labelText}</label>
      <Select name={name} options={options} className={classes} />
    </div>
  )
}
