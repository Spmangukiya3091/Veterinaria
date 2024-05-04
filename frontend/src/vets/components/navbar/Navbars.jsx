import React, { useState } from "react";
import { Badge, Button, Dropdown, Navbar } from "react-bootstrap";
import "./navbar.scss";
import Avatars from "../avatar/Avatar";
import Notification from "../notification/Notification";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { showToast } from "../../../store/tostify";

function Navbars({ user }) {
  const [show, setShow] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [cookies, , removeCookie] = useCookies(["user"]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    // Remove cookies
    removeCookie("user");
    removeCookie("authToken");

    // Navigate to the home page
    navigate("/");

    // Show logout success toast
    dispatch(showToast("Cerrar sesión exitosamente", "INFO_TOAST"));
  };

  return (
    <div className="navbars bg-white">
      <Navbar>
        <p className="nav-title">Bienvenido, {user?.name + " " + user?.surname}</p>
        <div className="notification-box">
          <Button onClick={handleShow} className="notification-btn">
            <i className="fa-regular fa-bell"></i> <i className="fa-solid fa-chevron-down"></i>
            <Badge bg="secondary">9</Badge>
          </Button>
        </div>
        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic">
            <div className="avatar-box">
              <Avatars name={user?.name + " " + user?.surname} />
              <div className="avatar-title-box">
                <p className="avatar-main-title">{user?.name + " " + user?.surname}</p>
                <p className="avatar-sub-title">Veterinarian</p>
                {/* <p className="avatar-sub-title">{user?.role}</p> */}
                {/* <p className="avatar-main-title">{user?.user?.name}</p>
                <p className="avatar-sub-title">{user?.user?.role}</p> */}
              </div>
              <i className="fa-solid fa-chevron-down"></i>
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <div className="profile-avatar-box">
              <Avatars name={user?.name + " " + user?.surname} />
              <div className="profile-avatar-title-box">
                <p className="avatar-main-title">{user?.name + " " + user?.surname}</p>
                <p className="profile-avatar-sub-title"> {user?.email}</p>
                {/* <p className="profile-avatar-main-title">{user?.user?.name}</p>
                <p className="profile-avatar-sub-title"> {user?.user?.email}</p> */}
              </div>
            </div>
            <Button
              onClick={() => {
                handleLogout();
              }}
              className="logout-btn"
            >
              <i className="bi bi-box-arrow-left fs-2"></i> <p>Cerrar Sesión</p>
            </Button>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar>
      <Notification handleClose={handleClose} show={show} />
    </div>
  );
}

export default Navbars;
