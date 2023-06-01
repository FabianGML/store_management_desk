/*
    Function that is used for display the information wheter the user has typed or not a search
    depends on the section wr currently are
*/
function displayedInfoFunction (searchValue, info, section, setDisplayedInfo) {
  if (searchValue.length > 0) {
    // eslint-disable-next-line array-callback-return
    const searchedValues = info.filter(value => {
      const searchedText = searchValue.toLowerCase()

      let rowName
      if (section === 'Pedidos') {
        rowName = value['provider.name'].toLowerCase()
        return displayOrders(searchedText, rowName, value)
      } else {
        rowName = value.name.toLowerCase()
      }
      if (section === 'Productos') {
        return displayProducts(searchedText, rowName, value)
      }
      if (section === 'Proveedores') {
        return displayProviders(searchedText, rowName, value)
      }
      if (section === 'Laboratorios') {
        return displayLabs(searchedText, rowName, value)
      }
    })
    setDisplayedInfo(searchedValues)
  } else {
    setDisplayedInfo(info)
  }
}

function displayProducts (searchedText, rowName, value) {
  if (value.ingredients === null) {
    value.ingredients = 'sin Ingredientes'
  }
  const rowIngredients = value.ingredients.toLowerCase()
  const rowLab = value['lab.name'].toLowerCase()
  if (rowName.includes(searchedText) || rowIngredients.includes(searchedText) || rowLab.includes(searchedText)) {
    return value
  }
}

function displayOrders (searchedText, rowName, value) {
  const orderArrive = value.orderArrive.toLowerCase()
  if (rowName.includes(searchedText) || orderArrive.includes(searchedText)) {
    return value
  }
}

function displayProviders (searchedText, rowName, value) {
  const rowPhone = value.phone
  if (rowName.includes(searchedText) || rowPhone.includes(searchedText)) {
    return value
  }
}

function displayLabs (searchedText, rowName, value) {
  if (rowName.includes(searchedText)) {
    return value
  }
}
export default displayedInfoFunction
