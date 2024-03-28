import React, { useEffect } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import "./category.scss";
import { useState } from "react";
import InformacionModal from "./InformacionModal";
import { Link } from "react-router-dom";
import { useGetAllCategoriesQuery, useRemoveCategoryMutation } from "../../../../../services/ApiServices";
import moment from "moment";
import Alert from "../../../../../Components/alert/Alert";
import { failer, success } from "../../../../../Components/alert/success";
import DeleteVerifyModal from "../../../../../Components/alert/VerifyModal/DeleteVerifyModal";

function CategoryModal({ show, handleClose, email }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [catID, setCatID] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [openform, setOpenform] = useState(false);
  const [dltVaccine, response] = useRemoveCategoryMutation();
  const [dltData, setDltData] = useState({
    id: "",
    pass: "",
    email: email,
  });

  const categoryList = useGetAllCategoriesQuery(null, { refetchOnMountOrArgChange: true });
  useEffect(() => {
    if (!categoryList.isLoading) {
      setLoading(false);
      setError(false);
      setData(categoryList.data);
    } else if (categoryList.isError) {
      setLoading(false);
      setError(true);
    }
  }, [categoryList]);

  const handleCloses = () => {
    setOpen(false);
    setCatID();
  };
  const handleOpen = () => setOpen(true);

  const handleConfirmDelete = () => {
    // Close the alert modal
    setModalShow(false);

    // Set the appointment ID in dltData
    setDltData({
      ...dltData,
      id: catID,
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

      // Call the dltVaccine API
      await dltVaccine(body);
    } else {
      failer("Invalid Password ");
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
      categoryList.refetch();
    } else if (response.isError) {
      // console.log(response.error);
      failer(response?.error?.data?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  return (
    <>
      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : error ? (
        "Some Error Occured"
      ) : (
        <Modal className="category-modal" size="lg" show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Categorías de Productos</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modal-top-container">
              <Button
                onClick={() => {
                  handleOpen();
                }}
                className="new-btn"
              >
                + Crear categoría
              </Button>
            </div>
            <div className="modal-bottom-container">
              <div className="calendar-card-wrapper-medicamentos">
                <table>
                  <thead>
                    <tr>
                      <th>CATEGORÍA</th>
                      <th>PRODUCTOS</th>
                      <th>F. DE CREACIÓN</th>
                      <th>OPCIONES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.categoryList.map((category, i) => (
                      <tr key={i}>
                        <td>{category.category}</td>
                        <td>{category.productCount}</td>
                        <td>{moment(category.createdAt).format("DD MMM YYYY")}</td>
                        <td>
                          <Link
                            to="#"
                            onClick={() => {
                              handleOpen();
                              setCatID(category.id);
                            }}
                            className="btn btn-bg-light btn-active-color-primary btn-sm me-4"
                          >
                            <i className="fa-solid fa-pen"></i>
                          </Link>
                          <Link
                            to="#"
                            onClick={() => {
                              setModalShow(true);
                              setCatID(category.id);
                            }}
                            className="btn btn-bg-light btn-active-color-primary btn-sm"
                          >
                            <i className="fa-solid fa-trash"></i>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
      <InformacionModal show={open} id={catID} handleClose={handleCloses} filter={categoryList} />
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
}

export default CategoryModal;
