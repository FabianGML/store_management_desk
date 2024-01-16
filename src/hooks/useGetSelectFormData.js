import { useState, useEffect } from 'react'

export default function useGetSelectFormData (section) {
  const [options, setOptions] = useState([])
  const [products, setProducts] = useState([])
  const [thirdOption, setThirdOption] = useState([])

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
    return options
  }

  const getProductsSelectData = () => {
    useEffect(() => {
      window.Data.secondarySelectData(section)
        .then(res => {
          const options = res.map(item => {
            return {
              value: item.id,
              label: item.name
            }
          })
          setProducts(options)
        })
    }, [])
    return products
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
    return thirdOption
  }
  return { getPrimarySelectData, getProductsSelectData, getThirdSelectData }
}
