import { useContext, useEffect } from 'react'
import { AppContext } from '../app/AppContext'

export default function useGetSelectFormData (section) {
  const { setOptions, setProducts, setThirdOption } = useContext(AppContext)

  const getPrimarySelectData = () => {
    useEffect(() => {
      window.Data.primarySelectData(section)
        .then(res => {
          const options = res.map(item => {
            return {
              value: item.id,
              label: item.name
            }
          })
          setOptions(options)
        })
    }, [])
  }

  const getProductsSelectData = () => {
    useEffect(() => {
      window.Data.secondarySelectData(section)
        .then(res => {
          const options = res.map(item => {
            return {
              value: item.name,
              label: item.name
            }
          })
          setProducts(options)
        })
    }, [])
  }

  const getThirdSelectData = () => {
    useEffect(() => {
      window.Data.thirdSelectData(section)
        .then(res => {
          const options = res.map(item => {
            return {
              value: item.id,
              label: item.name
            }
          })
          setThirdOption(options)
        })
    }, [])
  }
  return { getPrimarySelectData, getProductsSelectData, getThirdSelectData }
}
