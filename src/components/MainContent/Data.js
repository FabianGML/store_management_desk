import { useContext, useEffect, Fragment } from 'react'
import Row from '../GeneralComponents/Row'
import { AppContext } from '../../app/AppContext'

function Data () {
  const {
    searchValue,
    displayedInfo,
    setDisplayedInfo,
    info,
    setInfo,
    currentSection,
    confirmation
  } = useContext(AppContext)

  // Geting the info depends in the section we currently are
  async function getInfo () {
    await window.Data.info(currentSection).then((result) => {
      setInfo(result)
      setDisplayedInfo(result)
    })
  }

  useEffect(() => {
    getInfo()
  }, [currentSection, confirmation])

  if (displayedInfo.length === 0 && searchValue.length === 0) {
    return <p className='w-full text-xl text-center'>No hay {currentSection}</p>
  }
  if (displayedInfo.length === 0 && searchValue.length > 0) {
    return (
      <p className='p-6 text-lg'>No hay conincidencias para "{searchValue}"</p>
    )
  }
  return (
    <>
      {Array.isArray(info) && displayedInfo.map((data, index) => (
        <Row key={index} row={index} {...data} />
      ))}
    </>
  )
}

export default Data
