import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
function Medicamentos({ data }) {
  return (
    <div>
      <div className="calendar-card-wrapper-medicamentos">
        <div className="main-table-title">
          <p>Categorías de Productos</p>
        </div>
        <div className="tableFixHead">
          <table>
            <thead style={{ zIndex: 9 }}>
              <tr>
                <th>CATEGORÍA</th>
                <th>PRODUCTOS</th>
                <th>F. DE CREACIÓN</th>
                {/* <th>OPCIONES</th> */}
              </tr>
            </thead>
            <tbody style={{ overflowY: "auto" }}>
              {data?.map((category, i) => (
                <tr key={i}>
                  <td>{category.category}</td>
                  <td>{category.productCount}</td>
                  <td>{moment(category.createdAt).format("DD MMM YYYY")}</td>
                  {/* <td>
                    <Link to="#" className="btn btn-bg-light btn-active-color-primary btn-sm">
                      Ver Detalles
                    </Link>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Medicamentos;
