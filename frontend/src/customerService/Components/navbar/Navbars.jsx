import React, { useState } from "react";
import { Badge, Button, ButtonGroup, Dropdown, Navbar } from "react-bootstrap";
import "./navbar.scss";
import Avatars from "../avatar/Avatar";
import Notification from "../notification/Notification";
import { useNavigate } from "react-router-dom";
import CitaModal from "./Modals/CitaModal";
import MascotaModal from "./Modals/MascotaModal";
import PropietarioModal from "./Modals/PropietarioModal";
import PagoModal from "./Modals/PagoModal";
import ProductoModal from "./Modals/ProductoModal";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { showToast } from "../../../store/tostify";

function Navbars({ user }) {
  const [show, setShow] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [cookies, , removeCookie] = useCookies(["user"]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const closeDropdown = () => {
    setDropdownOpen(false);
  };
  const [modalShow, setModalShow] = useState(false);
  const openModal = (modalId) => {
    setModalShow(modalId);
  };

  const handleModalClose = () => setModalShow(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleLogout = () => {
    console.log("logout");
    removeCookie("user");
    navigate("/");
    dispatch(showToast("Cerrar sesión exitosamente", "INFO_TOAST"));
  };

  return (
    <>
      <div className="navbars bg-white">
        <Navbar>
          <p className="nav-title">Bienvenido, Nombre de Administrador</p>
          <div className="notification-box d-flex align-content-center">
            <Dropdown as={ButtonGroup} show={isDropdownOpen} onClose={closeDropdown} onToggle={toggleDropdown} align={"end"}>
              <Dropdown.Toggle id="dropdown-basic" className="nueva-btn btn btn-primary">
                <i className="bi bi-plus-circle text-dark me-2"></i>

                <i className={`fa-solid fa-chevron-${isDropdownOpen ? "up" : "down"}`}></i>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => openModal(1)}>Nueva Cita</Dropdown.Item>
                <Dropdown.Item onClick={() => openModal(2)}>Nueva Mascota</Dropdown.Item>
                <Dropdown.Item onClick={() => openModal(3)}>Nuevo Propietario</Dropdown.Item>
                <Dropdown.Item onClick={() => openModal(4)}>Nuevo Pago</Dropdown.Item>
                <Dropdown.Item onClick={() => openModal(5)}>Nuevo Producto</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Button onClick={handleShow} className="notification-btn">
              <i className="fa-regular fa-bell"></i>
              <i className="fa-solid fa-chevron-down"></i>
              <Badge bg="secondary">9</Badge>
            </Button>
          </div>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
              <div className="avatar-box">
                <Avatars name={user?.user?.name} />
                <div className="avatar-title-box">
                  <p className="avatar-main-title">{user?.user?.name}</p>
                  <p className="avatar-sub-title">{user?.user?.role}</p>
                </div>
                <i className="fa-solid fa-chevron-down"></i>
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <div className="profile-avatar-box mt-6">
                <Avatars name={user?.user?.name} />
                <div className="profile-avatar-title-box">
                  <p className="profile-avatar-main-title">{user?.user?.name}</p>
                  <p className="profile-avatar-sub-title"> {user?.user?.email}</p>
                </div>
              </div>
              <Button onClick={() => handleLogout()} className="logout-btn">
                <i className="fa-solid fa-arrow-right-from-bracket"></i> <p>Cerrar Sesión</p>
              </Button>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar>
        <Notification handleClose={handleClose} show={show} />
        <CitaModal show={modalShow === 1} onHide={handleModalClose} />
        <MascotaModal show={modalShow === 2} onHide={handleModalClose} />
        <PropietarioModal show={modalShow === 3} onHide={handleModalClose} />
        <PagoModal show={modalShow === 4} onHide={handleModalClose} />
        <ProductoModal show={modalShow === 5} onHide={handleModalClose} />
      </div>
    </>
  );
}

export default Navbars;
