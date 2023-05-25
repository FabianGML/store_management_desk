import { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../../app/AppContext";
import getRowContents from "../../helpers/rowContents";
import trashSvg from "../../svg/trash-full-svgrepo-com.svg";
import updateSvg from "../../svg/update-page-svgrepo-com.svg"

function Row(props) {
  const { currentSection, shoppingCart, modal, setModal } =
    useContext(AppContext);
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;

  const openDeleteModal = (id, name) => {
    setModal({
      showModal:true,
      modalType: 'delete',
      id,
      name
    })
  }
  const openUpdateModal = (id, amount) => {
    setModal({
      showModal:true,
      modalType: 'update',
      id,
      amount
    })
  }
  // section is where the rows info came
  let sectionColumns = props.individualColumns;
  if (!props.isIndividual) {
    sectionColumns = getRowContents(currentSection)[1];
  }

  const renderCell = (column, value) => {
    switch (column) {
      case "isPayed":
        const className = value ? "text-green-600" : "text-red-600";
        const displayValue = value ? "Pagada" : "No Pagada";
        return (
          <td key={column} className={className}>
            {displayValue}
          </td>
        );
      case "price":
      case "unitPrice":
      case "total":
        return <td key={column}>${value}</td>;
      case "providers":
        return (
          <td key={column}>
            <ul>
              {value &&
                value.map((provider, index) => <li key={index}>{provider}</li>)}
            </ul>
          </td>
        );
      case "delete":
        return (
          <td key={column} className="flex gap-3 justify-center">
            <img
              src={updateSvg}
              className="bg-green-700 max-h-9 mt-2 rounded-lg"
              title="Editar cantidad"
              onClick={() =>
                openUpdateModal(props.id, props.amount)
              }
            ></img>
            <img
              src={trashSvg}
              className="bg-red-700 max-h-9 mt-2 rounded-lg"
              title="Eliminar"
              onClick={() =>
                openDeleteModal(props.id, props.name)
              }
            ></img>
            
          </td>
        );
      default:
        return <td key={column}>{value}</td>;
    }
  };

  function handleClick() {
    if (!props.isIndividual) navigate(`${currentPath}/${props["id"]}`);
  }
  return (
    <tr
      className={`${
        props.row % 2 !== 0
          ? "bg-zinc-200 hover:bg-zinc-400 cursor-pointer"
          : "bg-white hover:bg-zinc-400 cursor-pointer"
      } h-14 text-lg text-center`}
      onClick={handleClick}
    >
      {sectionColumns &&
        sectionColumns.map((column) => {
          const value = props[column];
          return renderCell(column, value, shoppingCart);
        })}
    </tr>
  );
}

export default Row;
