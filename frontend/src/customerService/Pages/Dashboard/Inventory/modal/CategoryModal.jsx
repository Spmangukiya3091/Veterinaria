import React, { useEffect } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import "./category.scss";
import { useState } from "react";
import InformacionModal from "./InformacionModal";
import { Link } from "react-router-dom";
import { useGetCategoryWithProductsQuery, useRemoveCategoryMutation } from "../../../../../services/ApiServices";
import moment from "moment";
import Alert from "../../../../Components/alert/Alert";
import DeleteVerifyModal from "../../../../Components/alert/VerifyModal/DeleteVerifyModal";
import { failer, success } from "../../../../Components/alert/success";

function CategoryModal({ show, handleClose, email }) {
  const [open, setOpen] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [catId, setCatId] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const categories = useGetCategoryWithProductsQuery(null, { refetchOnMountOrArgChange: true });
  const [openform, setOpenform] = useState(false);
  const [dltData, setDltData] = useState({
    id: "",
    pass: "",
    email: email,
  });

  const [dltCategory, response] = useRemoveCategoryMutation();
  const handleConfirmDelete = () => {
    // Close the alert modal
    setModalShow(false);

    // Set the appointment ID in dltData
    setDltData({
      ...dltData,
      id: catId,
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

      // Call the dltCategory API
      await dltCategory(body);
    } else {
      failer("Invalid Password ");
    }
  };
  useEffect(() => {
    if (!categories.isLoading) {
      setLoading(false);
      setData(categories.data);
    } else if (categories.isError) {
      setLoading(false);
      setError(true);
    }
  }, [categories]);

  const handleModalClose = () => {
    setOpen(false);
    setCatId();
    categories.refetch();
  };
  const handleOpen = () => setOpen(true);

  useEffect(() => {
    if (!response.isLoading && response.status === "fulfilled") {
      success();
      setDltData({
        id: "",
        pass: "",
        email: "",
      });
      // Refetch or update data if needed
      categories.refetch();
    } else if (response.isError) {
      // console.log(response.error);
      failer(response?.error?.data?.message);

      // dispatch(showToast(response.error.message, "FAIL_TOAST"));
    }
    // }, [dispatch, response]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  return (
    <>
      {loading === true ? (
        <Spinner animation="border" variant="primary" />
      ) : error === true ? (
        "Some Error Occured"
      ) : (
        <>
          <Modal className="category-modal" show={show} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Categorías de Productos</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="modal-top-container">
                <Button
                  onClick={() => {
                    handleOpen();
                    handleClose();
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
                      {data?.categories.length > 0 ? (
                        data?.categories.map(({ id, category, productCount, createdAt }, i) => (
                          <tr key={i}>
                            <td>{category}</td>
                            <td>{productCount}</td>
                            <td>{moment(createdAt).format("DD MMM YYYY")}</td>
                            <td>
                              <Link
                                onClick={() => {
                                  handleOpen();
                                  handleClose();
                                  setCatId(id);
                                }}
                                className="btn btn-bg-light btn-active-color-primary btn-sm mx-3"
                              >
                                <i className="fa-solid fa-pen"></i>
                              </Link>
                              <Link
                                onClick={() => {
                                  setModalShow(true);
                                  setCatId(id);
                                  handleClose();
                                }}
                                className="btn btn-bg-light btn-active-color-primary btn-sm"
                              >
                                <i className="fa-solid fa-trash"></i>
                              </Link>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="text-center">
                            No data available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </Modal.Body>
          </Modal>
          <Alert
            show={modalShow}
            onHide={() => setModalShow(false)}
            msg={"¿Seguro de completar esta operación?"}
            opendltModal={handleConfirmDelete}
          />
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
          <InformacionModal show={open} handleClose={handleModalClose} id={catId} />
        </>
      )}
    </>
  );
}

export default CategoryModal;
