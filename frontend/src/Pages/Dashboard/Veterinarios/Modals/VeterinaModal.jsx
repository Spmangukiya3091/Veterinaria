import React, { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import "./veterinamodal.scss";
import EspecialidadModal from "./EspecialidadModal";
import { success } from "../../../../Components/alert/success";
import { useGetSpecialityListQuery } from "../../../../services/ApiServices";
import moment from "moment";

const VeterinaModal = (props) => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [spid, setSpid] = useState();
  const specialityList = useGetSpecialityListQuery(null, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (!specialityList.isLoading) {
      setLoading(false);
      setData(specialityList.data);
    } else if (specialityList.isError) {
      setError(true);
      setLoading(false);
    }
  }, [specialityList]);

  const handleOpen = () => setOpen(true);
  const handleCloses = () => {
    setOpen(false);
    specialityList.refetch();
  };
  return (
    <>
      <Modal show={props.show} onHide={props.onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Especialidades de Doctores</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-9">
          <div className="button">
            <Button
              variant="primary"
              onClick={() => {
                props.onHide();
                handleOpen();
              }}
            >
              + Crear Especialidad
            </Button>
          </div>
          <div className="modal-table">
            <table className="table align-middle table-bordered table-row-bordered p-2 fs-6 g-5" id="kt_ecommerce_products_table">
              <thead>
                <tr className="text-start text-gray-400 fw-bolder fs-7 text-uppercase gs-0">
                  <th className="">ESPECIALIDAD</th>
                  <th className="text-start ">DOCTORES</th>
                  <th className="text-start ">F. DE CREACIÓN</th>
                  <th className="text-end ">OPCIONES</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <Spinner animation="border" variant="primary" />
                ) : error ? (
                  "Some Error Occured"
                ) : (
                  <>
                    {data.specialities.map((data, i) => (
                      <tr key={i}>
                        <td className="text-start">{data.speciality}</td>
                        <td className="text-start">{data.veterinarianCount}</td>
                        <td className="text-start">{moment(data.createdAt).format("DD MMM YYYY")}</td>
                        <td className="text-end">
                          <Button
                            onClick={() => {
                              props.onHide();
                              handleOpen();
                              setSpid(data.id);
                            }}
                            className={` btn px-4 btn-secondary btn-center`}
                            id="dropdown-basic"
                          >
                            <i className="fa-solid fa-pen"></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} className="footer-btn btn btn-secondary">
            Cancelar
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              props.onHide();
              success();
            }}
            className="footer-btn btn btn-primary"
          >
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
      <EspecialidadModal show={open} id={spid} handleClose={handleCloses} />
    </>
  );
};

export default VeterinaModal;
