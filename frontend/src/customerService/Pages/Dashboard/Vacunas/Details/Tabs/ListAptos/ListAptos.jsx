import React, { useEffect, useState } from "react";
import "./listaptos.scss";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import AptosModal from "../AptosModal/AptosModal";
import CitasPagination from "../../../../../../Components/pagination/citas-pagination/Citas-Pagination";

import Loader from "../../../../../../Components/loader/Loader";
import { useGetVaccinationbyVaccineIdQuery } from "../../../../../../../services/ApiServices";

const ListAptos = ({ id, vaccineData }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [recordId, setRecordId] = useState("")
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [ownerId, setOwnerId] = useState("")
  const [petId, setPetId] = useState("")
  const [petName, setPetName] = useState("")
  const [ownerName, setOwnerName] = useState("")
  const vaccinationList = useGetVaccinationbyVaccineIdQuery(id, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (!vaccinationList.isLoading) {
      setLoading(false);
      setData(vaccinationList?.data?.vaccination);

    } else if (vaccinationList.isError) {
      setError(true);
      setLoading(false);
    }
  }, [vaccinationList]);

  const postsPerPage = 10;
  const handleClose = () => {
    setShow(false);
    setOwnerId("")
    setPetId("")
    setRecordId("")
    setPetName("")
    setOwnerName("")
  };

  const indexOfLastPost = currentPage * postsPerPage;

  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const adjustedIndexOfFirstPost = Math.max(0, indexOfFirstPost);

  const currentPosts = data.slice(adjustedIndexOfFirstPost, indexOfLastPost);
  return (
    <>
      {loading === true ? (
        <Loader />
      ) : error === true ? (
        "Some Error Occured"
      ) : (
        <>
          <div className="listaptos-table-container">
            <div className="card card-flush">
              <div className="card-header align-items-center py-5 gap-2 gap-md-5 gap-2 gap-md-5">
                <div className="card-title">
                  <p className="title">Lista de aptos</p>
                </div>

                <Button onClick={() => setShow(true)}>+ Agregar Aptos</Button>
              </div>
              <div className="card-body pt-0">
                <table className="table align-middle table-row-dashed fs-6 gy-5" id="kt_ecommerce_products_table">
                  <thead>
                    <tr className="text-start text-gray-400 fw-bolder fs-7 text-uppercase gs-0">
                      <th className="">COD</th>
                      <th className="text-start ">NOMBRE</th>
                      <th className="text-start ">PROPIETARIO</th>
                      <th className="text-start ">ESPECIE</th>
                      <th className="text-start ">ESTADO</th>
                      <th className="text-end ">DETALLES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPosts.length > 0 ? (
                      currentPosts.map(({ id, owner, petId, petVaccinationData, status, ownerId }, i) => (
                        <tr key={i}>
                          <td className="text-start pe-0">
                            <span className=" text-gray-600 ">{i + 1}</span>
                          </td>
                          <td className="text-start pe-0">{petVaccinationData?.name || "-"}</td>

                          <td className="text-start pe-0" data-order="16">
                            {owner || "-"}
                          </td>
                          <td className="text-start pe-0">
                            <div className=" fecha">{petVaccinationData?.Species || "-"}</div>
                          </td>
                          <td>
                            <div className="status-wrapper">
                              <div
                                className={status === "pending" ? "badge badge-light-warning text-warning" : "badge badge-light-primary text-primary"}
                              >
                                <p className="status-p mb-0">{status === "pending" ? "Pendiente" : "Vacunado"}</p>
                              </div>
                            </div>
                          </td>
                          <td className="text-end">
                            <div className="d-flex align-items-center">
                              <Link
                                to={`/dashboard/mascotas/details/${petId}?tab=vacunas`}
                                className="btn btn-sm btn-light btn-active-light-primary mx-2"
                                data-kt-menu-trigger="click"
                                data-kt-menu-placement="bottom-end"
                              >
                                <i className="bi bi-eye-fill"></i>
                              </Link>

                              <Link onClick={() => {
                                setShow(true)
                                setOwnerId(ownerId)
                                setPetId(petId)
                                setRecordId(id)
                                setPetName(petVaccinationData?.name)
                                setOwnerName(owner)
                              }} className="btn btn-sm btn-light btn-active-light-primary mx-2">
                                <i className="fa-solid fa-pen"></i>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7">No data available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <AptosModal show={show} onHide={handleClose} vaccineName={vaccineData.vaccine.name} ownerName={ownerName} petName={petName} id={recordId} vaccineId={id} filter={vaccinationList} owner={ownerId} petId={petId} />
          <CitasPagination current={currentPage} total={Math.ceil(data.length / postsPerPage)} onPageChange={setCurrentPage} />
        </>
      )}
    </>
  );
};

export default ListAptos;
