import { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import getRowContents from '../helpers/rowContents'
import Row from '../components/Row'
import Modal from '../Modal/Modal'
import ProductForm from '../components/Form/sectionsForms/ProductForm'
import { AppContext } from '../app/AppContext'
import OrderForm from '../components/Form/sectionsForms/OrderForm'

export default function AdminPage ({ modal, setModal }) {
  const { form, setForm, setLoading } = useContext(AppContext)
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

  const handleSubmit = async () => {
    setLoading(true)
    const response = await window.Data.createEntrance(currentSection, form)
    if (response && !response.validationErrors) {
      setModal(false)
      setLoading(false)
      setForm({})
    }
    if (response.validationErrors) {
      // setFormState({
      //   loading: false,
      //   validationErrors: response.validationErrors
      // })
    }
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

  console.log(info)

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
