import { Fragment, useContext, useEffect, useState } from "react";
import { AppContext } from "../../../app/AppContext";
import Row from "../../Row";

function IndividualDataTable({ individualData, total, columns }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (individualData) {
      setIsLoaded(true);
    }
  }, []);
  console.log(columns)

  return (
    <table className=" w-full border border-slate-300">
      {isLoaded && (
        <Fragment>
          <thead>
            <tr className="h-14 bg-slate-800">
              {columns[0].map((column, index) => (
                <th key={index} className="text-white">{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {individualData.map((data, index) => (
              <Row
                key={index}
                row={index}
                {...data}
                isIndividual={true}
                individualColumns={columns[1]}
              />
            ))}
            {total && (
              <tr className="h-14 bg-slate-800 text-white">
                <td></td>
                <td></td>
                <td></td>
                <td className="text-2xl">{`Total: $${total}`}</td>
              </tr>
            )}
          </tbody>
        </Fragment>
      )}
    </table>
  );
}

export default IndividualDataTable;
