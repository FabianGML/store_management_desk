import { Fragment, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../../app/AppContext";
import IndividualProduct from "./IndividualProduct";
import IndividualOrder from "./IndividualOrder";
import LoadingSpinner from "../../LoadingSpinner";
import IndividualProvider from "./IndividualProvider";
import IndividualLab from "./IndividualLab";

function IndividualSection() {
  const {
    currentSection,
    individualInfo,
    setIndividualInfo,
    form,
    confirmation,
    setConfirmation,
    setFormState,
    setModal,
  } = useContext(AppContext);

  const { id } = useParams();
  const navigate = useNavigate();

  async function getIndividualData() {
    await window.Data.individualData(currentSection, id).then((result) => {
      setIndividualInfo(result);
    });
  }

  useEffect(() => {
    getIndividualData();
  }, [currentSection, confirmation]);

  async function handleUpdate() {
    try {
      await window.Data.updateEntrance(currentSection, id, form).then(
        (result) => {
          setConfirmation(result);
        }
      );
      navigate(`/${currentSection}/${id}`);
      setModal({
        showModal: false,
        modalType: "",
      });
      setFormState({
        loading: false,
        response: {},
      });
    } catch (error) {
      console.log(error);
    }
  }

  const memorizedIndividualInfo = useMemo(
    () => individualInfo,
    [individualInfo]
  );

  if (!individualInfo) {
    return <LoadingSpinner />;
  }

  return (
    <Fragment>
      {currentSection === "Productos" && (
        <IndividualProduct
          id={id}
          handleUpdate={handleUpdate}
          individualInfo={memorizedIndividualInfo}
        />
      )}
      {currentSection === "Pedidos" && (
        <IndividualOrder
          id={id}
          handleUpdate={handleUpdate}
          individualInfo={memorizedIndividualInfo}
        />
      )}
      {currentSection === "Proveedores" && (
        <IndividualProvider
          id={id}
          handleUpdate={handleUpdate}
          individualInfo={memorizedIndividualInfo}
        />
      )}
      {currentSection === "Laboratorios" && (
        <IndividualLab
          id={id}
          handleUpdate={handleUpdate}
          individualInfo={memorizedIndividualInfo}
        />
      )}
    </Fragment>
  );
}

export default IndividualSection;
