import React from "react";
import "./sidebar.scss";
import { Link, useLocation } from "react-router-dom";
import { links } from "./sidebarLink";

function Sidebar() {
  const location = useLocation();

  return (
    <div className="sidebar">
      <aside id="sidebar" className="toggle-sidebar sidebar">
        <Link to="/veterine/resumen">
          {" "}
          <img src="../images/vets.svg" alt="vets" />
        </Link>

        <p className="sidebar-title">MENU</p>
        <ul className="sidebar-nav" id="sidebar-nav">
          {links.map(({ title, path, icon }, index) => {
            const isActive = location.pathname.startsWith(path);
            return (
              <li className="nav-item" key={index}>
                <Link className={`nav-link ${!isActive ? "collapsed" : ""}`} to={path}>
                  <img src={icon} alt={icon} />

                  <span>{title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
}

export default Sidebar;
