import { useEffect, useContext } from 'react'
import SearchButton from '../Buttons/SearchButton'
import Input from '../GeneralComponents/Input'
import displayedInfoFunction from '../../helpers/displayedInfo'
import TableInfo from './TableInfo'
import { AppContext } from '../../app/AppContext'
import getRowContents from '../../helpers/rowContents'
import NewEntrance from '../FormComponents/NewEntrance'

function Content () {
  const { searchValue, setSearchValue, info, currentSection, setDisplayedInfo, confirmation } = useContext(AppContext)
  const rowContents = getRowContents(currentSection)[0]

  const onSearchValueChange = (event) => {
    setSearchValue(event.target.value)
  }
  useEffect(() => {
    displayedInfoFunction(searchValue, info, currentSection, setDisplayedInfo)
  }, [searchValue])

  return (
    <>
      {confirmation && <NewEntrance text={confirmation} />}
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
