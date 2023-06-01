import Label from '../GeneralComponents/Label'

function InfoBlock ({ labelText, info }) {
  return (
    <div className='mb-2 flex items-center gap-4'>
      <Label text={labelText} />
      <p className='text-lg'>{info}</p>
    </div>
  )
}

export default InfoBlock
