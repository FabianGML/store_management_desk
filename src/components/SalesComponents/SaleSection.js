import { useEffect, useContext } from 'react'
import IndividualDataTable from '../Individual_Items/individualSections/IndividualDataTable'
import SaleSquare from './SaleSquare'
import { AppContext } from '../../app/AppContext'
// import FormSelect from '../FormComponents/FormSelect'
// import useSubmitForm from '../hooks/useSubmitForm'
// const monthNames = [
//   'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
//   'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
// ]

// const months = monthNames.map((name, index) => ({
//   value: (index + 1).toString().padStart(2, '0'),
//   label: name
// }))

const columns = [
  ['Fecha y Hora', 'Importe'],
  ['saleDate', 'total']
]

function SaleSection () {
  const { info, setInfo } = useContext(AppContext)

  useEffect(() => {
    window.Data.getSales()
      .then(result => {
        setInfo(result)
      })
  }, [])

  return (
    <main className='pt-36 px-10 flex flex-col items-center'>
      <div className='flex gap-28 justify-evenly mb-12'>
        <SaleSquare text='Ventas del dia' number={info.dayTotal || '0'} color='green' />
        <SaleSquare text='Ventas de la semana' number={info.weekTotal || '0'} color='orange' />
        <SaleSquare text='Ventas del mes' number={info.monthTotal || '0'} color='cyan' />
      </div>
      <div className='w-3/4'>
        {info.tableInfo && <IndividualDataTable columns={columns} individualData={info.tableInfo} />}
      </div>
    </main>
  )
}

export default SaleSection
