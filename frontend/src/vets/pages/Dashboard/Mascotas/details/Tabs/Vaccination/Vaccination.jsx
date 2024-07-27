import React, { useEffect, useState } from "react";
import "./vaccination.scss";
import { useGetSinglePetVaccinationDetailsQuery } from "../../../../../../../services/ApiServices";
import moment from "moment";
import Loader from "../../../../../../components/loader/Loader";
import Error from "../../../../../../components/error/Error";

const Vaccination = ({ id }) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error message={vaccinationList?.isError ? vaccinationList?.error?.data?.message : "Error Interno del Servidor"} />
      ) : (
        <div className="historical-table-container">
          <div className="card card-flush">
            <div className="card-header align-items-center py-5 gap-2 gap-md-5">
              <div className="card-title">
                <h1>Vacunación</h1>
              </div>
              <p className="text-gray-400 fw-bolder fs-5">{data?.length} Vacunas</p>
            </div>
            <div className="card-body pt-0">
              <table className="table align-middle table-row-dashed fs-6 gy-5" id="kt_ecommerce_products_table">
                <thead>
                  <tr className="text-start text-gray-400 fw-bolder fs-7 text-uppercase gs-0">
                    <th className="">COD.</th>
                    <th className="text-start ">TIPO</th>
                    <th className="text-start ">EXPLORACIÓN</th>
                    <th className="text-start ">F. VACUNACIÓN</th>
                    <th className="text-start ">F. VALIDEZ</th>
                    <th className="text-end ">ESTADO</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.length > 0 ? (
                    data.map(({ id, vaccine, exploration, F_vaccination, validity, status }, i) => (
                      <tr key={i}>
                        <td>{i + 1 }</td>
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
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7">Datos no disponibles</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Vaccination;
