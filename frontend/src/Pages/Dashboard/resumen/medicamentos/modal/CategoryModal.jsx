import React, { useEffect } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import "./category.scss";
import { useState } from "react";
import InformacionModal from "./InformacionModal";
import { Link } from "react-router-dom";
import { useGetAllCategoriesQuery } from "../../../../../services/ApiServices";
import moment from "moment";
import Alert from "../../../../../Components/alert/Alert";
function CategoryModal({ show, handleClose }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [catID, setCatID] = useState();
  const [dltmodal, setDltmodal] = useState(false);
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

  const handleClosedltModal = () => {
    setDltmodal(false);
    categoryList.refetch();
  };
  const handleCloses = () => {
    setOpen(false);
    categoryList.refetch();
  };
  const handleOpen = () => setOpen(true);
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
                              setDltmodal(true);
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
      <InformacionModal show={open} id={catID} handleClose={handleCloses} />
      <Alert show={dltmodal} onHide={handleClosedltModal} msg={"¿Seguro de completar esta operación?"} />
    </>
  );
}

export default CategoryModal;
