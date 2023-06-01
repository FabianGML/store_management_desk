import { useContext } from 'react'
import { AppContext } from '../../../app/AppContext'
import Modal from '../../../Modal/Modal'
import OrderForm from '../../FormComponents/SectionForms/OrderForm'
import GoBackButton from '../GoBackButton'
import InfoBlock from '../InfoBlock'
import UpdateButton from '../UpdateButton'
import IndividualDataTable from './IndividualDataTable'
import LoadingSpinner from '../../GeneralComponents/LoadingSpinner'

function IndividualOrder ({ id, handleUpdate, individualInfo }) {
  const { modal, setModal } = useContext(AppContext)

  const columns = [
    ['Producto', 'Cantidad', 'Precio Unitario', 'Importe'],
    ['name', 'amount', 'unitPrice', 'totalPrice']
  ]

  if (!individualInfo) {
    return <LoadingSpinner />
  }
  return (
    <div className='overflow-x-hidden'>
      <div className='flex h-full w-screen pt-32 ml-10 items-start'>
        <div className='flex flex-col'>
          <GoBackButton />
          <div>
            <h2 className='text-5xl mb-10 underline w-72'>{`Pedido No. ${id}`}</h2>
            <InfoBlock
              labelText='Fecha de llegada:'
              info={individualInfo.orderArrive}
            />
            <InfoBlock
              labelText='Pagada:'
              info={individualInfo.isPayed ? 'Pagada' : 'No Pagada'}
            />
            <InfoBlock
              labelText='Proveedor:'
              info={individualInfo['provider.name']}
            />
          </div>
        </div>
        <div className='w-7/12 ml-6'>
          <h3 className='text-4xl font-semibold text-center'>Productos</h3>
          {individualInfo.items && (
            <IndividualDataTable
              individualData={individualInfo.items}
              total={individualInfo.total}
              columns={columns}
            />
          )}
        </div>
      </div>
      <div className='w-full flex justify-center mt-12 gap-10'>
        <UpdateButton setModal={setModal} />
      </div>
      {modal.showModal && modal.modalType === 'update' && (
        <Modal
          handleSubmit={handleUpdate}
          orderForm={(submitInfo) => (
            <OrderForm submitInfo={submitInfo} data={individualInfo} />
          )}
          setModal={setModal}
        />
      )}
    </div>
  )
}

export default IndividualOrder
