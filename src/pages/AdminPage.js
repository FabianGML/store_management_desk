import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import getRowContents from '../helpers/rowContents'
import Row from '../components/Row'
import Modal from '../Modal/Modal'
import ProductForm from '../components/Form/sectionsForms/ProductForm'
// import { AppContext } from '../app/AppContext'
import OrderForm from '../components/Form/sectionsForms/OrderForm'

export default function AdminPage ({ modal, setModal }) {
  // const { setLoading } = useContext(AppContext)
  const [rows, setRows] = useState([[], []])
  const [info, setInfo] = useState([])
  const [inputValue, setInputValue] = useState('')

  const currentSection = useLocation().pathname.slice(1)

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const openModal = () => {
    setModal(true)
  }

  const handleSubmit = async (e) => {
    // setLoading(true)
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)
    // transform items names such as name0, name1, name2 into an array of objects
    // grouping them by their number
    if (currentSection !== 'Productos') {
      const resultObject = Object.entries(data).reduce((acc, [key, value]) => {
        const match = key.match(/(\D+)(\d+)/)
        if (match) {
          const [, property, index] = match
          acc.items = acc.items || []
          acc.items[index] = acc.items[index] || {}
          acc.items[index][property] = value
        } else {
          acc[key] = value
        }
        return acc
      }, {})
      // remove empty items (this is because "index" is not sequential)
      resultObject.items = Object.values(resultObject.items || {})

      console.log(resultObject)
    }
    // const response = await window.Data.createEntrance(currentSection, form)
    // if (response && !response.validationErrors) {
    //   setModal(false)
    //   setLoading(false)
    //   setForm({})
    // }
  }

  useEffect(() => {
    setRows(getRowContents(currentSection))
  }, [currentSection])

  useEffect(() => {
    window.Data.info(currentSection, inputValue)
      .then(res => {
        setInfo(res)
      })
  }, [inputValue, currentSection, modal])

  return (
    <main className='mx-6 my-10'>
      <h1 className='text-5xl pb-16 mb-10 border-b border-black'>{currentSection}</h1>
      <div>
        <input onChange={handleInputChange} className='w-3/4 h-14 pl-4 text-lg border border-gray-500 rounded-md outline-none' placeholder={`Buscar ${currentSection}...`} />
        <button onClick={openModal} className='bg-slate-900 hover:bg-slate-700 text-white ml-8 p-5 rounded-md'>Crear {currentSection === 'Proveedores' ? currentSection.slice(0, -2) : currentSection.slice(0, -1)}</button>
      </div>
      <table className='border border-gray-400 w-full h-full mt-14'>
        <thead>
          <tr>
            {rows[0].map(row => (
              <th key={row}>
                {row}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {info.map((row, index) => (
            <Row key={index} row={index} sectionColumns={rows[1]} currentPath={currentSection} {...row} />
          )
          )}
        </tbody>
      </table>
      {(!info.length && !inputValue.length) && <p className='text-2xl text-center mt-14 text-gray-500'>No hay {currentSection}. Para agregar uno, pulsa el botón en la parte superior derecha. 👆</p>}
      {(inputValue.length > 0 && !info.length) && <p className='text-2xl text-center mt-14 text-gray-500'>No hay {currentSection} que correspondan con {inputValue}</p>}
      {modal && (
        <Modal
          currentSection={currentSection}
          setModal={setModal}
          handleSubmit={handleSubmit}
          productForm={() => <ProductForm />}
          orderForm={() => <OrderForm />}
        />
      )}
    </main>
  )
}
// amount0: "23"
// amount1: "20"
// amount2: "3"
// codeBar2: "02378940923"
// description: "para tal y tal "
// expiration0: "2025-02-01"
// expiration1: "2442-02-01"
// expiration2: "2442-02-01"
// image2: File {name: '', path: '', lastModified: 1705081067324, lastModifiedDate: Fri Jan 12 2024 11:37:47 GMT-0600 (hora estándar central), webkitRelativePath: '', …}
// ingredients2: "fklsdfj"
// lab2: "prowiner"
// name0: "fiserul"
// name1: "cloruro de magnesio"
// name2: "lisina"
// orderArrive: "2023-02-01"
// providerId: "3"
// unitPrice0: "168"
// unitPrice1: "68"
// unitPrice2: "132"
