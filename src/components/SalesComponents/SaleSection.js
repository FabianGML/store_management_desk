import { useEffect, useContext } from 'react'
import IndividualDataTable from '../Individual_Items/individualSections/IndividualDataTable'
import SaleSquare from './SaleSquare'
import { AppContext } from '../../app/AppContext'
// import useSubmitForm from '../hooks/useSubmitForm'

function SaleSection () {
  const { info, setInfo } = useContext(AppContext)
  // const handleSubmit = useSubmitForm()

  useEffect(() => {
    window.Data.getSales()
      .then(result => {
        setInfo(result)
      })
  }, [])

  const columns = [
    ['Fecha y Hora', 'Descuento', 'Importe'],
    ['saleDate', 'discount', 'total']
  ]
  return (
    <main className='pt-36 px-10 flex flex-col'>
      <div className='flex gap-28 justify-evenly mb-12'>
        <SaleSquare text='Ventas del dia' number={info.dayTotal || '0'} color='green' />
        <SaleSquare text='Ventas de la semana' number='2540' color='red' />
        <SaleSquare text='Ventas del mes' number='10472' color='orange' />
      </div>
      {info.tableInfo && <IndividualDataTable columns={columns} individualData={info.tableInfo} />}
    </main>
  )
}

export default SaleSection
