import React, { useEffect, useState } from "react";
import "./main.scss";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import Sidebar from "../../../Components/sidebar/Sidebar";
import Navbars from "../../../Components/navbar/Navbars";
import Resumen from "../resumen/Resumen";
import Citas from "../citas/Citas";
import Calendario from "../calendario/Calendario";
import CitasDetail from "../citas/citas-view-detaill/CitasDetail";
import Mascotas from "../Mascotas/Mascotas";
import MascotasDetails from "../Mascotas/details/MascotasDetails";
import Propietarios from "../Propietarios/Propietarios";
import PropietariosDetails from "../Propietarios/details/PropietariosDetails";
import Inventory from "../Inventory/Inventory";
import InventoryDetails from "../Inventory/Details/InventoryDetails";
import Vacunas from "../Vacunas/Vacunas";
import VacunasDetails from "../Vacunas/Details/vacunasDetails";
import Pagos from "../Pagos/Pagos";
import PagosDetails from "../Pagos/Details/PagosDetails";
import Roles from "../Roles/Roles";
import Veterinarios from "../Veterinarios/Veterinarios";
import VeterinaProfileDetails from "../Veterinarios/details/VeterinaProfileDetails";
import Footer from "../../../Components/footer/Footer";
import { useGetLoginUserDetailsQuery } from "../../../services/ApiServices";
import { Helmet } from "react-helmet";
import Loader from "../../../Components/loader/Loader";

const AdminMain = () => {
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

  const response = useGetLoginUserDetailsQuery(cookies.user);

  useEffect(() => {
    if (response.isLoading) {
      setLoading(true);
    } else if (response.isError) {
      setError(true);
      setLoading(false);
    } else {
      setLoading(false);
      setData(response.data);
    }
  }, [response]);
  return (
    <>
      <Helmet>
        <title>{capitalize(title)} : - Veterinaria Admin Panel</title>
      </Helmet>
      {loading !== false ? (
        <Loader />
      ) : error !== false ? (
        "error"
      ) : (
        <div className="main-section-admin ">
          <Sidebar />
          <div id="main" className="main">
            <Navbars user={data} />
            <Routes>
              <Route path="/resumen" element={<Resumen />} />
              <Route path="/citas" element={<Citas email={data?.user?.email} />} />
              <Route path="/calendario" element={<Calendario />} />
              <Route path="/citas-view/:id" element={<CitasDetail email={data?.user?.email} />} />
              <Route path="/mascotas" element={<Mascotas email={data?.user?.email} />} />
              <Route path="/mascotas/details/:id" element={<MascotasDetails email={data?.user?.email} />} />
              <Route path="/propietarios" element={<Propietarios email={data?.user?.email} />} />
              <Route path="/propietarios/details/:id" element={<PropietariosDetails email={data?.user?.email} />} />
              <Route path="/inventario" element={<Inventory email={data?.user?.email} />} />
              <Route path="/Inventario/details/:id" element={<InventoryDetails email={data?.user?.email} />} />
              <Route path="/vacunas" element={<Vacunas email={data?.user?.email} />} />
              <Route path="/vacunas/vacunas-details/:id" element={<VacunasDetails email={data?.user?.email} />} />
              <Route path="/pagos" element={<Pagos email={data?.user?.email} />} />
              <Route path="/pagos/pagos-details/:id" element={<PagosDetails email={data?.user?.email} />} />
              <Route path="/roles" element={<Roles email={data?.user?.email} />} />
              <Route path="/veterinarios" element={<Veterinarios email={data?.user?.email} />} />
              <Route path="/veterinarios/details/:id" element={<VeterinaProfileDetails email={data?.user?.email} />} />
            </Routes>
            <Footer />
          </div>
        </div>
      )}
    </>
  );
};

export default AdminMain;
