import { useContext } from 'react'
import Content from './Content'
import Title from '../GeneralComponents/Title'
import Modal from '../../Modal/Modal'
import ProductForm from '../FormComponents/SectionForms/ProductForm'
import OrderForm from '../FormComponents/SectionForms/OrderForm'
import ProviderForm from '../FormComponents/SectionForms/ProviderForm'
import LabForm from '../FormComponents/SectionForms/LabForm'
import { AppContext } from '../../app/AppContext'

function MainContent () {
  const { currentSection, form, setForm, setFormState, modal } = useContext(AppContext)

  async function handleSubmit () {
    try {
      const response = await window.Data.sendForm(currentSection, form)
      if (response) {
        setFormState({
          loading: false,
          response
        })
        setForm({})
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <section className='h-screen pt-32 px-5 flex'>
      <div className='w-full mr-7'>
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
    </section>
  )
}

export default MainContent
