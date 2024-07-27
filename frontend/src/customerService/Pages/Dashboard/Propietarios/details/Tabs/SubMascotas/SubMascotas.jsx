import React from "react";
import "./submascotas.scss";
import { Link } from "react-router-dom";

const SubMascotas = ({ data }) => {
  return (
    <>
      <section className="submascotas-section">
        <div className="submascotas-second">
          <div className="submascotas-table-container">
            <div className="submascotas-filter-container-main">
              <div className="filter-box">
                <h1>Mascotas</h1>
              </div>
              {/* <p className="text-gray-400 fw-bolder fs-5">{data.pets.length} Mascotas</p> */}
            </div>
          </div>
          <div className="submascotas-table">
            <table>
              <thead>
                <tr>
                  <th>COD.</th>
                  <th>NOMBRE</th>
                  <th>ESPECIE</th>
                  <th>SEXO</th>
                  <th>EDAD</th>
                  <th>DETALLES</th>
                </tr>
              </thead>
              <tbody>
                {data.pets.length > 0 ? (
                  data.pets.map(({ id, name, Species, sex, age }, i) => (
                    <tr key={i}>
                      <td>{i + 1 }</td>
                      <td>{name ? name : "-"}</td>
                      <td>{Species ? Species : "-"}</td>
                      <td>{sex ? sex : "-"}</td>
                      <td>{age ? age : "-"}</td>
                      <td>
                        <Link
                          to={`/customerservice/mascotas/details/${id}`}
                          className="btn btn-sm btn-light btn-active-light-primary"
                          data-kt-menu-trigger="click"
                          data-kt-menu-placement="bottom-end"
                        >
                          {"Ver detalles"}
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      Datos no disponibles
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default SubMascotas;
