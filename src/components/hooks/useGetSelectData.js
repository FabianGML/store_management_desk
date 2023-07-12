import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../app/AppContext'

function useGetPrimarySelectData () {
  const [primarySelectOptions, setPrimarySelectOptions] = useState([]) // Some forms need data from a model, this state helps to store this data and use it in a form
  const [secondarySelectOptions, setSecondarySelectOptions] = useState([])
  const { currentSection } = useContext(AppContext)

  function primaryOptions (preloadFunction) {
    useEffect(() => {
      window.Data[preloadFunction](currentSection).then((result) => {
        const options = result.map(row => { return { value: row.id, label: row.name } })
        setPrimarySelectOptions(options)
      })
    }, [])
    return primarySelectOptions
  }

  function secondaryOptions () {
    useEffect(() => {
      window.Data.secondarySelectData(currentSection).then((result) => {
        if (result) {
          const options = result.map(row => {
            const id = row.id ? row.id : null
            return { id, label: row.name, value: row.name }
          })
          setSecondarySelectOptions(options)
        }
      })
    }, [])
    return secondarySelectOptions
  }

  return { primaryOptions, secondaryOptions }
}

export default useGetPrimarySelectData
