// import trashSvg from '../../svg/trash-full-svgrepo-com.svg'
// import updateSvg from '../../svg/update-page-svgrepo-com.svg'

import { useNavigate } from 'react-router-dom'

export default function Row (props) {
  const navigate = useNavigate()
  const renderCell = (column, value) => {
    switch (column) {
      case 'isPayed':
        // eslint-disable-next-line no-case-declarations
        const className = value ? 'text-green-600' : 'text-red-600'
        // eslint-disable-next-line no-case-declarations
        const displayValue = value ? 'Pagada' : 'No Pagada'
        return (
          <td key={column} className={className}>
            {displayValue}
          </td>
        )
      case 'price':
      case 'unitPrice':
      case 'total':
        return <td key={column}>${value}</td>
      case 'providers':
        return (
          <td key={column}>
            <ul>
              {value &&
                value.map((provider, index) => <li key={index}>{provider}</li>)}
            </ul>
          </td>
        )
        //   case 'delete':
        //     return (
        //       <td key={column} className='flex gap-3 justify-center'>
        //         <img
        //           src={updateSvg}
        //           className='bg-green-700 max-h-9 mt-2 rounded-lg'
        //           title='Editar cantidad'
        //           onClick={() =>
        //             openUpdateModal(props.id, props.amount)}
        //         />
        //         <img
        //           src={trashSvg}
        //           className='bg-red-700 max-h-9 mt-2 rounded-lg'
        //           title='Eliminar'
        //           onClick={() =>
        //             openDeleteModal(props.id, props.name)}
        //         />
        //       </td>
        //     )
      case 'saleDate':
        // eslint-disable-next-line no-var
        var date = value.toLocaleString()
        return (
          <td key={column}>
            {date}
          </td>
        )
      case 'discount':
        // eslint-disable-next-line no-var
        var discount = value > 0 ? `%${value}` : 'N/A'
        return (
          <td key={column}>
            {discount}
          </td>
        )
      default:
        return <td key={column}>{value}</td>
    }
  }

  function handleClick () {
    if (!props.isIndividual) navigate(`${props.currentPath}/${props.id}`)
  }
  return (
    <tr
      className={`${
        props.row % 2 !== 0
          ? 'bg-zinc-200 hover:bg-zinc-400 cursor-pointer'
          : 'bg-white hover:bg-zinc-400 cursor-pointer'
      } h-14 text-lg text-center`}
      onClick={handleClick}
    >
      {props.sectionColumns.map((column) => {
        const value = props[column]
        return renderCell(column, value)
      })}
    </tr>
  )
}
