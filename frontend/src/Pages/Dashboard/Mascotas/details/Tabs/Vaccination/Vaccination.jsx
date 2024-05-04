import React, { useEffect, useState } from "react";
import "./vaccination.scss";
import { Link } from "react-router-dom";
import EditVaccinModal from "../../../modal/EditVaccinModal";
import Alert from "../../../../../../Components/alert/Alert";
import { Button } from "react-bootstrap";
import AddVacunaModal from "../../../modal/AddVacunaModal";
import UpdVacunaStat from "../../../modal/UpdVacunaStat";
import moment from "moment";
import { useGetSinglePetVaccinationDetailsQuery, useRemoveVaccinationMutation } from "../../../../../../services/ApiServices";
import Loader from "../../../../../../Components/loader/Loader";
import DeleteVerifyModal from "../../../../../../Components/alert/VerifyModal/DeleteVerifyModal";
import { failer, success } from "../../../../../../Components/alert/success";
import Error from "../../../../../../Components/error/Error";

const Vaccination = ({ id, email }) => {
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [addVacuna, setAddVacuna] = useState(false);
  const [updStat, setUpdStat] = useState(false);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [vaccineId, setVaccineId] = useState();
  const [openform, setOpenform] = useState(false);
  const [dltVaccination, response] = useRemoveVaccinationMutation();
  const [dltData, setDltData] = useState({
    id: "",
    pass: "",
    email: email,
  });

  const vaccinationList = useGetSinglePetVaccinationDetailsQuery(id, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (!vaccinationList.isLoading) {
      setData(vaccinationList?.data?.vaccinations);
      setLoading(false);
    } else if (vaccinationList.isError) {
      setLoading(false);
      setError(true);
    }
  }, [vaccinationList]);

  const handleUpdStatclose = () => {
    setUpdStat(false);
    setVaccineId(undefined)
    vaccinationList.refetch()
  };
  const handleCloseEdit = () => {
    setShow(false);
    setVaccineId(undefined)
    vaccinationList.refetch()
  };
  const handleCloseVacuna = () => {
    setAddVacuna(false);
  };

  const handleConfirmDelete = () => {
    // Close the alert modal
    setModalShow(false);

    // Set the appointment ID in dltData
    setDltData({
      ...dltData,
      id: vaccineId,
      email: email,
    });

    // Open the DeleteVerifyModal
    setOpenform(true);
  };

  const handleDeleteVerify = async (enteredPassword) => {
    if (enteredPassword !== "" || null) {
      // Close the DeleteVerifyModal
      setOpenform(false);

      // Use the callback function provided by setDltData
      const body = {
        id: dltData.id,
        email: dltData.email,
        pass: enteredPassword,
      };

      // Now you can use the updated state

      // Call the dltVaccination API
      await dltVaccination(body);
    } else {
      failer("Contraseña invalida");
    }
  };
  useEffect(() => {
    if (!response.isLoading && response.status === "fulfilled") {
      success();
      setDltData({
        id: "",
        pass: "",
        email: "",
      });
      // Refetch or update data if needed
      vaccinationList.refetch();
    } else if (response.isError) {
      failer(response?.error?.data?.message);
      // dispatch(showToast(response?.error?.data?.message, "FAIL_TOAST"));
      // console.log(response.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error message={vaccinationList?.isError ? vaccinationList?.error?.data?.message : "Error Interno del Servidor"} />
      ) : (
        <section className="vaccination-section">
          <div className="vaccination-second">
            <div className="vaccination-table-container">
              <div className="vaccination-filter-container-main">
                <div className="filter-box">
                  <h1>Vacunación</h1>
                </div>
                <div className="vaccination-record-box">
                  <Button
                    onClick={() => {
                      setAddVacuna(true);
                    }}
                  >
                    +Agregar Vacuna
                  </Button>
                </div>
              </div>
            </div>
            <div className="vaccination-table">
              <table>
                <thead>
                  <tr>
                    <th>COD.</th>
                    <th>TIPO</th>
                    <th>EXPLORACIÓN</th>
                    <th>F. VACUNACIÓN</th>
                    <th>F. VALIDEZ</th>
                    <th>ESTADO</th>
                    <th className="text-end">EDITAR</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.length > 0 ? (
                    data.map(({ id, vaccine, exploration, F_vaccination, validity, status }, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{vaccine ? vaccine : "-"}</td>
                        <td className={`${exploration === "APTO" ? "textSuccess" : "textDanger"}`}>{exploration}</td>
                        <td>{F_vaccination !== null ? moment(F_vaccination).format("DD MMM YYYY") : "-"}</td>
                        <td>{validity !== null ? moment(validity).format("DD MMM YYYY") : "-"}</td>
                        <td>
                          <div
                            className={
                              status === "vaccinated"
                                ? "badge badge-light-primary text-primary"
                                : status === "rejected"
                                  ? "badge badge-light-danger text-danger"
                                  : "badge badge-light-warning text-warning "
                            }
                          >
                            <p className="status-p mb-0">
                              {status === "vaccinated" ? "Vacunado" : status === "rejected" ? "Rechazada" : "Pendiente"}
                            </p>
                          </div>
                        </td>
                        <td className="text-end">
                          <div className="d-flex align-items-center justify-content-end">
                            <Link
                              to={"#"}
                              className="btn btn-sm btn-light btn-active-light-primary mx-2"
                              data-kt-menu-trigger="click"
                              data-kt-menu-placement="bottom-end"
                              onClick={() => {
                                setUpdStat(true);
                                setVaccineId(id);
                              }}
                            >
                              <i className="fa-solid fa-pen"></i>
                            </Link>
                            {status !== "pending" && status !== "rejected" ? (
                              <Link
                                className="btn btn-sm btn-light btn-active-light-primary mx-2"
                                data-kt-menu-trigger="click"
                                data-kt-menu-placement="bottom-end"
                                onClick={() => {
                                  setShow(true);
                                  setVaccineId(id);
                                }}
                              >
                                <i className="bi bi-calendar-event"></i>
                              </Link>
                            ) : (
                              <Link
                                className="btn dateBtn btn-sm btn-light btn-active-light-primary mx-2 "
                                data-kt-menu-trigger="click"
                                data-kt-menu-placement="bottom-end"
                              >
                                <i className="bi bi-calendar-event"></i>
                              </Link>
                            )}
                            <Link
                              onClick={() => {
                                setModalShow(true);
                                setVaccineId(id);
                              }}
                              className="btn btn-sm btn-light btn-active-light-primary mx-2"
                            >
                              <i className="fa-solid fa-trash"></i>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
      <UpdVacunaStat show={updStat} handleClose={handleUpdStatclose} vaccineId={vaccineId} filter={vaccinationList} />
      <EditVaccinModal show={show} handleClose={handleCloseEdit} vaccineId={vaccineId} filter={vaccinationList} />
      <AddVacunaModal show={addVacuna} handleClose={handleCloseVacuna} filter={vaccinationList} />
      <Alert show={modalShow} onHide={() => setModalShow(false)} msg={"¿Seguro de completar esta operación?"} opendltModal={handleConfirmDelete} />
      <DeleteVerifyModal
        show={openform}
        onHide={() => {
          setOpenform(false);
          setDltData({
            id: "",
            pass: "",
            email: "",
          });
        }}
        onDelete={handleDeleteVerify}
      />
    </>
  );
};

export default Vaccination;
