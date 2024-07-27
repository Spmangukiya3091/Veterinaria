import React, { useState } from "react";
import { Link } from "react-router-dom";
import CategoryModal from "./modal/CategoryModal";
import moment from "moment";
function Medicamentos({ data, filter }) {
  const [showCategory, setShowCategory] = useState(false);
  const handleCloseCategory = () => {
    setShowCategory(false);
    filter.refetch();
  };
  const handleShowCategory = () => setShowCategory(true);
  return (
    <>
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
                <th>OPCIONES</th>
              </tr>
            </thead>
            <tbody style={{ overflowY: "auto" }}>
              {data?.categories.map((category, i) => (
                <tr key={i}>
                  <td>{category.category}</td>
                  <td>{category.productCount}</td>
                  <td>{moment(category.createdAt).format("DD MMM YYYY")}</td>
                  <td>
                    <Link
                      to="#"
                      onClick={() => {
                        handleShowCategory();
                      }}
                      className="btn btn-bg-light btn-active-color-primary btn-sm"
                    >
                      <i className="fa-solid fa-pen"></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <CategoryModal show={showCategory} handleClose={handleCloseCategory} />
    </>
  );
}

export default Medicamentos;
