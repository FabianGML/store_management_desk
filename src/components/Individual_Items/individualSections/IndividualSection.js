import { useContext, useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../../../app/AppContext'
import IndividualProduct from './IndividualProduct'
import IndividualOrder from './IndividualOrder'
import LoadingSpinner from '../../GeneralComponents/LoadingSpinner'
import IndividualProvider from './IndividualProvider'
import IndividualLab from './IndividualLab'
import NewEntrance from '../../FormComponents/NewEntrance'

function IndividualSection () {
  const {
    currentSection,
    individualInfo,
    setIndividualInfo,
    form,
    confirmation,
    setConfirmation,
    setFormState,
    setModal
  } = useContext(AppContext)

  const { id } = useParams()
  const navigate = useNavigate()

  async function getIndividualData () {
    await window.Data.individualData(currentSection, id).then((result) => {
      setIndividualInfo(result)
    })
  }

  useEffect(() => {
    getIndividualData()
  }, [confirmation])

  async function handleUpdate () {
    await window.Data.updateEntrance(currentSection, id, form).then(
      (result) => {
        setConfirmation(result)
      }
    )
    setModal(false)
    navigate(`/${currentSection}/${id}`)
    setFormState({
      loading: false,
      response: {}
    })
  }

  const memorizedIndividualInfo = useMemo(
    () => individualInfo,
    [individualInfo]
  )

  if (!individualInfo) {
    return <LoadingSpinner />
  }

  return (
    <>
      {confirmation && (
        <div className='w-full pt-32 ml-10 flex justify-center'>
          <NewEntrance text={confirmation} />
        </div>
      )}
      {currentSection === 'Productos' && (
        <IndividualProduct
          id={id}
          handleUpdate={handleUpdate}
          individualInfo={memorizedIndividualInfo}
        />
      )}
      {currentSection === 'Pedidos' && (
        <IndividualOrder
          id={id}
          handleUpdate={handleUpdate}
          individualInfo={memorizedIndividualInfo}
        />
      )}
      {currentSection === 'Proveedores' && (
        <IndividualProvider
          id={id}
          handleUpdate={handleUpdate}
          individualInfo={memorizedIndividualInfo}
        />
      )}
      {currentSection === 'Laboratorios' && (
        <IndividualLab
          id={id}
          handleUpdate={handleUpdate}
          individualInfo={memorizedIndividualInfo}
        />
      )}
    </>
  )
}

export default IndividualSection
