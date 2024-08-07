import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Authentication/login/Login";
import ForgetPassword from "./Pages/Authentication/forgetPassword/forgetpass/ForgetPassword";
import Verification from "./Pages/Authentication/forgetPassword/verification/Verification";
import UpdatePassword from "./Pages/Authentication/forgetPassword/updatePassword/UpdatePassword";
import Main from "./Pages/Dashboard/main/Main";
import VeterineMain from "./vets/pages/Dashboard/main/Main.jsx";
import CustomerServiceMain from "./customerService/Pages/Dashboard/main/Main.jsx";
import { ToastifyContainer } from "./store/tostify";
import { CookiesProvider } from "react-cookie";
import Dialog from "./vets/pages/Dashboard/resumen/dialog/Dialog.jsx";
import ProtectedRoute from "./ProectedRoute.js";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CookiesProvider>
          <ToastifyContainer />
          <Routes>
            <Route path="/veterine/dialog" element={<Dialog />} />
            <Route path="/" element={<Login />} />
            <Route path="/forget" element={<ForgetPassword />} />
            <Route path="/verification/:email" element={<Verification />} />
            <Route path="/updatePassword" element={<UpdatePassword />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard/*" element={<Main />} />
              <Route path="/veterine/*" element={<VeterineMain />} />
              <Route path="/customerservice/*" element={<CustomerServiceMain />} />
            </Route>
          </Routes>
        </CookiesProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
