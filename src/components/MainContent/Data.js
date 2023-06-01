import { useContext, useEffect, Fragment } from 'react'
import Row from '../GeneralComponents/Row'
import { AppContext } from '../../app/AppContext'
import LoadingSpinner from '../GeneralComponents/LoadingSpinner'

function Data () {
  const {
    searchValue,
    displayedInfo,
    setDisplayedInfo,
    info,
    setInfo,
    currentSection
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
    console.log(info)
    console.log(currentSection)
  }, [currentSection])

  if (displayedInfo.length === 0 && searchValue.length === 0) {
    return <LoadingSpinner />
  }
  if (displayedInfo.length === 0 && searchValue.length > 0) {
    return (
      <p className='p-6 text-lg'>No hay conincidencias para "{searchValue}"</p>
    )
  }
  return (
    <>
      {displayedInfo.map((data, index) => (
        <Row key={index} row={index} {...data} />
      ))}
    </>
  )
}

export default Data
