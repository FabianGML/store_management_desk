import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../app/AppContext";
import getRowContents from "../helpers/rowContents";

function Row(props) {
  const { currentSection } = React.useContext(AppContext);
  const navigate = useNavigate()
  const currentPath = useLocation().pathname;

  // section is where the rows info came
  let sectionColumns =  props.individualColumns
   if(!props.isIndividual) {
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
      default:
        return <td key={column}>{value}</td>;
    }
  };

  function handleClick() {
    navigate(`${currentPath}/${props['id']}`)
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
            return renderCell(column, value);
          })}
      </tr>
  );
}

export default Row;
