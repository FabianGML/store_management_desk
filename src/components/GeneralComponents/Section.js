import React from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../app/AppContext";

function Section({ svg, text, path }) {
  const {
    setCurrentSection,
    setForm,
    setConfirmation,
    setFormState,
    setModal,
  } = React.useContext(AppContext);

  const changeSection = () => {
    //Path is the section we currently are, depends on the button we click on
    setCurrentSection(path);
    setForm({});
    setConfirmation("");
    setFormState({
      loading: false,
      response: {},
    });
    setModal(false);
  };
  return (
    <li>
      <NavLink
        to={path === "Caja" ? "/" : path.toLowerCase()}
        style={({ isActive }) => ({
          backgroundColor: isActive ? "rgb(51 65 85)" : undefined,
        })}
        className="m-7 flex cursor-pointer hover:bg-slate-700 p-4 rounded-lg"
        onClick={changeSection}
      >
        <img src={svg} className="w-11 pr-5"></img>
        <span className="text-white">{text}</span>
      </NavLink>
    </li>
  );
}

export default Section;
