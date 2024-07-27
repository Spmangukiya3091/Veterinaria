import React, { useEffect, useState } from "react";
import "./inventoryDetail.scss";
import { Button, ButtonGroup, Col, Collapse, Dropdown, Row } from "react-bootstrap";
import MainTab from "../Tabs/MainTab";
import { useLocation, useNavigate } from "react-router-dom";

import Alert from "../../../../Components/alert/Alert";
import ActualizerModal from "../modal/ActualizerModal";
import InventoryModal from "../modal/InventoryModal";
import { useGetAllCategoriesQuery, useGetProductHistoryQuery, useGetSingleProductQuery, useRemoveProductMutation } from "../../../../../services/ApiServices";
import moment from "moment";
import { failer, success } from "../../../../Components/alert/success";
import DeleteVerifyModal from "../../../../Components/alert/VerifyModal/DeleteVerifyModal";
import Loader from "../../../../Components/loader/Loader";
import Error from "../../../../Components/error/Error";

const InventoryDetails = ({ email }) => {
  const location = useLocation();
  const id = location.pathname.split("/")[4];
  console.log(id)
  const navigate = useNavigate();

  const [show, setShow] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [prodShow, setProdShow] = useState(false);
  const [data, setData] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const productDetails = useGetSingleProductQuery(id, { refetchOnMountOrArgChange: true });
  const productHistory = useGetProductHistoryQuery(id, { refetchOnMountOrArgChange: true });
  const categories = useGetAllCategoriesQuery({ refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (!productDetails.isLoading && !productHistory.isLoading && !categories.isLoading) {
      setData(productDetails?.data?.product[0]);
      setHistoryData(productHistory.data);
      setLoading(false);
    } else if (productDetails.isError || productHistory.isError) {
      setError(true);
      setLoading(false);
    }
  }, [productDetails, productHistory, categories]);

  const [open, setOpen] = useState(false);
  const handleProdClose = () => {
    setProdShow(false);
    productDetails.refetch();
    productHistory.refetch();
  };
  const handleClose = () => {
    setOpen(false);
    productDetails.refetch();
    productHistory.refetch()
  };
  const handleShow = () => setOpen(true);
  const [openform, setOpenform] = useState(false);
  const [dltProduct, response] = useRemoveProductMutation();
  const [dltData, setDltData] = useState({
    id: "",
    pass: "",
    email: email,
  });

  const handleConfirmDelete = () => {
    // Close the alert modal
    setModalShow(false);
    // Set the appointment ID in dltData
    setDltData({
      ...dltData,
      id: id,
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

      // Call the dltProduct API
      // console.log(body);
      await dltProduct(body);
    } else {
      failer("Contraseña invalida");
    }
  };
  useEffect(() => {
    if (!response.isLoading && response.status === "fulfilled") {
      setDltData({
        id: "",
        pass: "",
        email: "",
      });
      success();
      navigate("/customerservice/inventario");
    } else if (response.isError) {
      // console.log(response.error);
      // failer(response?.error?.data?.message);
      failer("Contraseña incorrecta");
      // dispatch(showToast(response.error.message, "FAIL_TOAST"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error message={productDetails?.isError ? productDetails?.error?.data?.message : productHistory.isError ? productHistory.error?.data.message : "Error Interno del Servidor"} />

      ) : (
        <section className="inventorydetails-section">
          <div className="heading">
            <h1>{data?.product}</h1>
            <p>Inventario Productos » {data?.product}</p>
          </div>

          <Row className="flex-column flex-lg-row">
            <Col lg={2} xl={3} className="w-lg-250px w-xl-350px">
              <div className="head container-sm">
                <div className="img mb-7">
                  <i className="bi bi-capsule-pill"></i>
                </div>
                <p className="fs-3 text-gray-800 text-hover-primary fw-bold mb-3">{data?.product || "-"}</p>
                <div className={`mb-9 fs-6 ${data?.status === "active" ? "badge badge-light-primary" : "badge badge-light-danger"}`}>
                  {data?.status === "active" ? "Activo" : "Inactivo"}
                </div>

                <div className="information">
                  <div className="d-flex  text-center flex-center">
                    <div className="border border-gray-300 border-dashed rounded py-3 px-3 mb-3">
                      <div className="fs-5 fw-bold text-gray-700">
                        <span className="w-75px">S/  {data?.price + ".00" || "-"}</span>
                      </div>
                      <div className="fw-semibold text-muted">Precio</div>
                    </div>

                    <div className="border border-gray-300 border-dashed rounded py-3 px-3 mx-4 mb-3">
                      <div className="fs-5 fw-bold text-gray-700">
                        <span className="w-50px">{data?.stock || "-"}</span>
                      </div>
                      <div className="fw-semibold text-muted">Stock</div>
                    </div>
                  </div>

                  <div className="fs-6 pb-5">
                    <div className="information">
                      <div className="d-flex flex-stack fs-4 py-3">
                        <div
                          className="fw-bold rotate collapsible collapsed"
                          data-bs-toggle="collapse"
                          href="#kt_user_view_details"
                          role="button"
                          aria-expanded="false"
                          aria-controls="kt_user_view_details"
                          onClick={() => {
                            setShow(!show);
                          }}
                        >
                          Details
                          <span className="ms-2 rotate-180">
                            <i className={`fa-solid fa-chevron-${show ? "up" : "down"} fs-8`}></i>
                          </span>
                        </div>
                      </div>
                      <div className="separator"></div>
                      <Collapse in={show}>
                        <div id="kt_user_view_details" className="pb-5 fs-6">
                          <div className="fw-bold mt-5">Presentación</div>
                          <div className="text-gray-600">{data?.presentation || "-"}</div>

                          <div className="fw-bold mt-5">Fecha creación</div>
                          <div className="text-gray-600">{moment(data?.createdAt).format("DD MMM YYYY, hh:mm A") || "-"}</div>

                          <div className="fw-bold mt-5">Última actualización</div>
                          <div className="text-gray-600">{moment(data?.updatedAt).format("DD MMM YYYY, hh:mm A") || "-"}</div>
                        </div>
                      </Collapse>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col className="ms-lg-15">
              <Button onClick={handleShow} className="actualizer-btn btn btn-sm fw-bold btn-primary" style={{ zIndex: 99 }}>
                Actualizar Producto
              </Button>
              <div className="drop-down" style={{ zIndex: 99 }}>
                <Dropdown as={ButtonGroup}>
                  <Dropdown.Toggle className="dropdown-toggle btn btn-sm  btn-flex btn-center" id="dropdown-basic">
                    Accion
                    <i className="fa-solid fa-chevron-down"></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-4">
                    <Dropdown.Item className="menu-item px-3">
                      <div
                        className="menu-link px-3"
                        onClick={() => {
                          setProdShow(true);
                        }}
                      >
                        Editar
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item className="menu-item px-3">
                      <div onClick={() => setModalShow(true)} className="menu-link px-3 delete">
                        Eliminar producto
                      </div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="second ">
                <MainTab data={data} historyData={historyData} />
              </div>
            </Col>
          </Row>
          <InventoryModal show={prodShow} onHide={handleProdClose} id={data?.id} categories={categories} />
          <ActualizerModal show={open} handleClose={handleClose} id={data?.id} status={data?.status} />
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
        </section>
      )}
    </>
  );
};

export default InventoryDetails;
