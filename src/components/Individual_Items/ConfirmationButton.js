import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../app/AppContext"

function ConfirmationButton({ id }) {
    const { currentSection, setConfirmation } = useContext(AppContext)
    const navigate = useNavigate()

    async function handleDelete(){
        await window.Data.deleteEntrance(currentSection, id).then((result) => {
            setConfirmation(result)
          });
          navigate(`/${currentSection}`)
    }

    return <button className="h-12 w-24 bg-slate-900 text-white" onClick={handleDelete}>Si</button>
}

export default ConfirmationButton