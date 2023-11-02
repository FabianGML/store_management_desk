import { useContext } from 'react'
import Content from './Content'
import Title from '../GeneralComponents/Title'
import Modal from '../../Modal/Modal'
import ProductForm from '../FormComponents/SectionForms/ProductForm'
import OrderForm from '../FormComponents/SectionForms/OrderForm'
import ProviderForm from '../FormComponents/SectionForms/ProviderForm'
import LabForm from '../FormComponents/SectionForms/LabForm'
import { AppContext } from '../../app/AppContext'
import { useNavigate } from 'react-router-dom'
import NewEntrance from '../FormComponents/NewEntrance'

function MainContent () {
  const { currentSection, form, setForm, formState, setFormState, setModal, modal } = useContext(AppContext)
  const navigate = useNavigate()

  const handleSubmit = async () => {
    const response = await window.Data.createEntrance(currentSection, form)
    if (response && !response.validationErrors) {
      navigate(`/${currentSection}`)
      setModal(false)
      setFormState({
        loading: false,
        response
      })
      setForm({})
    }
    if (response.validationErrors) {
      setFormState({
        loading: false,
        validationErrors: response.validationErrors
      })
    }
  }

  return (
    <main className='px-5 flex justify-center'>
      <div className='w-full mr-7 mt-32'>
        <div className='flex justify-center w-full mb-5'>
          {formState.response && <NewEntrance text={formState.response} />}
        </div>
        <Title />
        <Content />
      </div>
      {modal && (
        <Modal
          handleSubmit={handleSubmit}
          productForm={(submitInfo) => (
            <ProductForm
              submitInfo={submitInfo}
            />
          )}
          orderForm={(submitInfo) => (
            <OrderForm
              submitInfo={submitInfo}
            />
          )}
          providerForm={(submitInfo) => (
            <ProviderForm
              submitInfo={submitInfo}
            />
          )}
          labForm={(submitInfo) => (
            <LabForm
              submitInfo={submitInfo}
            />
          )}
        />
      )}
    </main>
  )
}

export default MainContent
