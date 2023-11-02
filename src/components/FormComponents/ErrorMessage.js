function ErrorMessage ({ text }) {
  return (
    <div className='h-10 w-11/12 bg-red-600'>
      <p className='h-full text-white justify-center items-center flex'>{text}</p>
    </div>
  )
}

export default ErrorMessage
