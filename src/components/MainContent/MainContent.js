import { useContext } from 'react'
import Content from './Content'
import Title from '../GeneralComponents/Title'
import Modal from '../../Modal/Modal'
import ProductForm from '../FormComponents/SectionForms/ProductForm'
import OrderForm from '../FormComponents/SectionForms/OrderForm'
import ProviderForm from '../FormComponents/SectionForms/ProviderForm'
import LabForm from '../FormComponents/SectionForms/LabForm'
import { AppContext } from '../../app/AppContext'
import useSubmitForm from '../hooks/useSubmitForm'

function MainContent () {
  const { modal } = useContext(AppContext)
  const handleSubmit = useSubmitForm()

  return (
    <main className='px-5 flex'>
      <div className='w-full mr-7 mt-32'>
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
