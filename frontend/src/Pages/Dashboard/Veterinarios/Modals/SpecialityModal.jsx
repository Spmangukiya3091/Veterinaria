import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "./veterinamodal.scss";
import EspecialidadModal from "./EspecialidadModal";
import { failer, success } from "../../../../Components/alert/success";
import { useRemoveSpecialityMutation } from "../../../../services/ApiServices";
import moment from "moment";
import Loader from "../../../../Components/loader/Loader";
import Alert from "../../../../Components/alert/Alert";
import DeleteVerifyModal from "../../../../Components/alert/VerifyModal/DeleteVerifyModal";
import { Link } from "react-router-dom";

const SpecialityModal = (props) => {

  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [spid, setSpid] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [openform, setOpenform] = useState(false);
  const [dltSpeciality, response] = useRemoveSpecialityMutation();
  const [dltData, setDltData] = useState({
    id: "",
    pass: "",
    email: props.email,
  });
  const specialityList = props.specialityList

  useEffect(() => {
    if (!specialityList.isLoading) {
      setLoading(false);
      setData(specialityList?.data?.specialities);
    } else if (specialityList.isError) {
      setError(true);
      setLoading(false);
    }
  }, [specialityList, props.show, props.openModal]);

  const handleOpen = () => setOpen(true);
  const handleCloses = () => {
    setOpen(false);
    setSpid(undefined)
    specialityList.refetch();
  };

  const handleConfirmDelete = () => {
    // Close the alert modal
    setModalShow(false);
    // Set the appointment ID in dltData
    setDltData({
      ...dltData,
      id: spid,
      email: props.email,
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

      // Call the dltVaccine API
      await dltSpeciality(body);
    } else {
      failer("Contraseña invalida");
    }
  };

  useEffect(() => {
    if (!response.isLoading && response.isSuccess) {
      setDltData({
        id: "",
        pass: "",
        email: "",
      });
      setSpid()
      setOpenform(false);
      specialityList.refetch();
      // Refetch or update data if needed
      success();
    } else if (response.isError) {
      // console.log(response.error);
      // failer(response?.error?.data?.message);
      failer("Contraseña incorrecta");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

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
                  <Loader />
                ) : error ? (
                  "Some Error Occured"
                ) : (
                  <>
                    {
                      data?.length > 0 ?
                        data.map((data, i) => (
                          <tr key={i}>
                            <td className="text-start">{data.speciality}</td>
                            <td className="text-start">{data.veterinarianCount}</td>
                            <td className="text-start">{moment(data.createdAt).format("DD MMM YYYY")}</td>
                            <td className="text-end">
                              <Link
                                onClick={() => {
                                  handleOpen();
                                  setSpid(data.id);
                                }}
                                className={` btn px-4 btn-secondary btn-center mx-2`}
                                id="dropdown-basic"
                              >
                                <i className="fa-solid fa-pen"></i>
                              </Link>
                              <Link
                                onClick={() => {
                                  setModalShow(true);
                                  setSpid(data.id);
                                }}
                                className={` btn px-4 btn-secondary btn-center`}
                                id="dropdown-basic"
                              >
                                <i className="fa-solid fa-trash"></i>
                              </Link>
                            </td>
                          </tr>
                        ))
                        : ""
                    }
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
      <EspecialidadModal show={open} id={spid} handleClose={handleCloses} filter={specialityList} />
      <Alert show={modalShow} onHide={() => {
        setModalShow(false)
        setSpid()
        specialityList.refetch();
        setDltData({
          id: "",
          pass: "",
          email: "",
        });
      }} msg={"¿Seguro de completar esta operación?"} opendltModal={handleConfirmDelete} />
      <DeleteVerifyModal
        show={openform}
        onHide={() => {
          setSpid()
          setOpenform(false);
          setDltData({
            id: "",
            pass: "",
            email: "",
          });
          specialityList.refetch();
        }}
        onDelete={handleDeleteVerify}
      />
    </>
  );
};

export default SpecialityModal;
