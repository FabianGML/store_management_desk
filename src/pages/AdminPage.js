import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import getRowContents from '../helpers/rowContents'
import Row from '../components/Row'

export default function AdminPage () {
  const currentSection = useLocation().pathname.slice(1)
  const [rows, setRows] = useState([[], []])
  const [info, setInfo] = useState([])
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (e) => {
    console.log('se esta ejecutando el input')
    setInputValue(e.target.value)
  }

  const getInfo = () => {
    window.Data.info(currentSection, inputValue)
      .then(res => {
        setInfo(res)
      })
  }
  useEffect(() => {
    setRows(getRowContents(currentSection))
  }, [currentSection])

  useEffect(() => {
    console.log('me estoy ejecutando')
    getInfo()
  }, [inputValue])

  return (
    <main className='mx-6 my-10'>
      <h1 className='text-5xl pb-16 mb-10 border-b border-black'>{currentSection}</h1>
      <div>
        <input onChange={handleInputChange} className='w-3/4 h-14 pl-4 text-lg border border-gray-500 rounded-md outline-none' placeholder={`Buscar ${currentSection}...`} />
        <button onClick={getInfo} className='bg-slate-900 hover:bg-slate-700 text-white ml-8 p-5 rounded-md'>Crear {currentSection === 'Proveedores' ? currentSection.slice(0, -2) : currentSection.slice(0, -1)}</button>
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
    </main>
  )
}
