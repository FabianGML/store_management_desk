import { useEffect, useContext } from 'react'
import SearchButton from '../Buttons/SearchButton'
import Input from '../GeneralComponents/Input'
import displayedInfoFunction from '../../helpers/displayedInfo'
import TableInfo from './TableInfo'
import { AppContext } from '../../app/AppContext'
import getRowContents from '../../helpers/rowContents'

function Content () {
  const { searchValue, setSearchValue, info, currentSection, setDisplayedInfo } = useContext(AppContext)
  const rowContents = getRowContents(currentSection)[0]

  const onSearchValueChange = (event) => {
    setSearchValue(event.target.value)
  }
  useEffect(() => {
    displayedInfoFunction(searchValue, info, currentSection, setDisplayedInfo)
  }, [searchValue])

  return (
    <>
      <Input
        searchValue={searchValue}
        onSearchValueChange={onSearchValueChange}
        width='w-3/4'
        margin='mb-10'
      />
      <SearchButton />
      <TableInfo rowContents={rowContents} />

    </>
  )
}

export default Content
