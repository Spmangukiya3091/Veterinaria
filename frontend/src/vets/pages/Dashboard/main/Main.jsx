import React, { useEffect, useState } from "react";
import "./main.scss";
import { Spinner } from "react-bootstrap";
import { useCookies } from "react-cookie";
import Resumen from "../resumen/Resumen";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Citas from "../citas/Citas";
import Footer from "../../../components/footer/Footer";
import CitasDetail from "../citas/citas-view-detaill/CitasDetail";
import Calendario from "../calendario/Calendario";
import Mascotas from "../Mascotas/Mascotas";
import MascotasDetails from "../Mascotas/details/MascotasDetails";
import Propietarios from "../Propietarios/Propietarios";
import PropietariosDetails from "../Propietarios/details/PropietariosDetails";
import Inventory from "../Inventory/Inventory";
import InventoryDetails from "../Inventory/Details/InventoryDetails";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbars from "../../../components/navbar/Navbars";
// import Desktop from "../desktop/Desktop";
import { useGetSingleVeterinQuery } from "../../../../services/ApiServices";
import { Helmet } from "react-helmet";
import Loader from "../../../components/loader/Loader";

function Main() {
  const navigate = useNavigate();
  const location = useLocation();

  const [cookies] = useCookies(["user"]);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const paths = location.pathname.split("/").filter((path) => path !== "");
  const totalpaths = paths.length;
  const title =
    paths[totalpaths - 1] === undefined
      ? "Dashboard"
      : totalpaths > 2
      ? `${paths[totalpaths - 2] + " " + paths[totalpaths - 1]}`
      : paths[totalpaths - 1];
  const capitalize = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  useEffect(() => {
    const token = cookies.user;
    if (!token) {
      navigate("/");
    }
  }, [cookies.user, navigate]);

  const response = useGetSingleVeterinQuery(cookies.user);

  useEffect(() => {
    if (response.isLoading) {
      setLoading(true);
    } else if (response.isError) {
      setError(true);
      setLoading(false);
    } else {
      setLoading(false);
      setData(response?.data?.veterinarianData);
    }
  }, [response]);

  return (
    <>
      <Helmet>
        <title>{capitalize(title)} : - Veterinaria Panel</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : error ? (
        "error"
      ) : (
        <div className="main-section-veterine">
          <Sidebar />

          <div id="main" className="main">
            <Navbars user={data} />
            <Routes>
              <Route path="/resumen" element={<Resumen id={data?.id} />} />
              <Route path="/citas" element={<Citas id={data?.id} />} />
              <Route path="/calendario" element={<Calendario id={data?.id} />} />
              <Route path="/citas-view/:id" element={<CitasDetail />} />
              <Route path="/mascotas" element={<Mascotas id={data?.id} />} />
              <Route path="/mascotas/details/:id" element={<MascotasDetails />} />
              <Route path="/propietarios" element={<Propietarios id={data?.id} />} />
              <Route path="/propietarios/details/:id" element={<PropietariosDetails />} />
              <Route path="/inventario" element={<Inventory />} />
              <Route path="/Inventario/details/:id" element={<InventoryDetails />} />
              {/* <Route path="/desktop" element={<Desktop />} /> */}
            </Routes>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}

export default Main;
