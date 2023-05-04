import { useNavigate } from "react-router-dom";
import svg from "../../svg/back-svgrepo-com.svg";
function GoBackButton() {
  const navigate = useNavigate();

  function goBack(){
    navigate(-1)
  }
  return (
    <button
      className="h-12 w-12 cursor-pointer bg-slate-900 rounded-md mb-6 hover:bg-slate-700 self-start justify-self-start"
      onClick={goBack}
    >
      <img src={svg} className="invert"></img>
    </button>
  );
}

export default GoBackButton;
