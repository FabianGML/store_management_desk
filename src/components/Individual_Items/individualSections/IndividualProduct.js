import { useContext } from 'react'
import { AppContext } from '../../../app/AppContext'

import Modal from '../../../Modal/Modal'
import ProductForm from '../../FormComponents/SectionForms/ProductForm'
import GoBackButton from '../GoBackButton'
import InfoBlock from '../InfoBlock'
import UpdateButton from '../UpdateButton'

function IndividualProduct ({ handleUpdate, individualInfo }) {
  const { modal, setModal } = useContext(AppContext)
  const {
    name,
    price,
    stock,
    ingredients,
    description,
    expiration,
    expiration2,
    image
  } = individualInfo

  const images = require.context('../../../images', true)

  return (
    <>
      <div className='flex h-full w-screen pt-32 px-5 gap-20 items-center'>
        <GoBackButton />
        <div className='ml-64'>
          <h2 className='text-5xl mb-10 underline w-72'>{name}</h2>
          {image && <img className='h-96 w-80 border border-black object-contain' src={images(`./${image}`)} />}
          {!image && <div className='flex h-96 w-80 border border-black justify-center items-center text-gray-400 text-2xl'>Sin Imagen </div>}
        </div>
        <div className=' mt-7 flex flex-col gap-2'>
          <InfoBlock labelText='Precio:' info={`$${price}`} />
          <InfoBlock labelText='Stock:' info={stock} />
          <InfoBlock
            labelText='Laboratorio:'
            info={individualInfo['lab.name']}
          />
          <InfoBlock labelText='Caducidad:' info={expiration} />
          <InfoBlock
            labelText='Caducidad 2:'
            info={expiration2 || 'Sin caducidad'}
          />
          <InfoBlock
            labelText='Ingredientes:'
            info={ingredients || 'Sin ingredientes'}
          />
          <InfoBlock labelText='Descripcion:' info={description} />
        </div>
      </div>
      <div className='w-full flex justify-center my-6 gap-24'>
        <UpdateButton setModal={setModal} />
      </div>
      {modal.showModal && modal.modalType === 'update' && (
        <Modal
          handleSubmit={handleUpdate}
          productForm={(submitInfo) => (
            <ProductForm
              submitInfo={submitInfo}
              data={individualInfo}
            />
          )}
          setModal={setModal}
        />
      )}
    </>
  )
}

export default IndividualProduct
