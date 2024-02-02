import React, { useEffect, useState } from "react";
import "./vaccination.scss";
import { Link } from "react-router-dom";
import EditVaccinModal from "../../../modal/EditVaccinModal";
import Alert from "../../../../../../Components/alert/Alert";
import { Button, Spinner } from "react-bootstrap";
import AddVacunaModal from "../../../modal/AddVacunaModal";
import UpdVacunaStat from "../../../modal/UpdVacunaStat";
import moment from "moment";
import { useGetSinglePetVaccinationDetailsQuery } from "../../../../../../services/ApiServices";
import Loader from "../../../../../../Components/loader/Loader";

const Vaccination = ({ id }) => {
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [addVacuna, setAddVacuna] = useState(false);
  const [updStat, setUpdStat] = useState(false);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [vaccineId, setVaccineId] = useState();

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

  const handleHide = () => {
    setModalShow(false);
  };
  const handleUpdStatclose = () => {
    setUpdStat(false);
    vaccinationList.refetch();
  };
  const handleCloseEdit = () => {
    setShow(false);
    vaccinationList.refetch();
  };
  const handleCloseVacuna = () => {
    setAddVacuna(false);
    vaccinationList.refetch();
  };

  return (
    <>
      {loading === true ? (
        <Loader />
      ) : error === true ? (
        "Some Error Occured"
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
                        <td>{vaccine}</td>
                        <td className={`${exploration === "APTO" ? "textSuccess" : "textDanger"}`}>{exploration}</td>
                        <td>{F_vaccination === null ? "-" : moment(F_vaccination).format("DD MMM YYYY")}</td>
                        <td>{validity === null ? "-" : moment(validity).format("DD MMM YYYY")}</td>
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
      <UpdVacunaStat show={updStat} handleClose={handleUpdStatclose} vaccineId={vaccineId} />
      <EditVaccinModal show={show} handleClose={handleCloseEdit} vaccineId={vaccineId} />
      <AddVacunaModal show={addVacuna} handleClose={handleCloseVacuna} />
      <Alert show={modalShow} onHide={handleHide} msg={"¿Seguro de completar esta operación?"} vaccineId={vaccineId} />
    </>
  );
};

export default Vaccination;
