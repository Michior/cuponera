import AuthProvider from "./context/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router";
import Header from "./components/header/Header";
import { Ofertas } from "./cuponsviewers/Ofertas";
import { Cupones } from "./cuponsviewers/Cupones";
import OfferDetails from "./cuponsviewers/OffersDetails";
import PasarelaPago from "./cuponsviewers/PasarelaPago";
import CuponAdquirido from "./cuponsviewers/CuponAdquirido";
import CuponDetails from "./cuponsviewers/CuponDetails";
import { IniciarSesion } from "./user/Iniciarsesion";
import { Registro } from "./user/Registro";
import MiPerfil from "./user/MiPerfil";
import CuponValid from "./cuponsviewers/CuponValid";
import { CuponesValidos } from "./cuponsviewers/CuponesValidos";
import { CuponesReclamados } from "./cuponsviewers/CuponesReclamados";
import CuponExpired from "./cuponsviewers/CuponExpired";

function App() {

  return(
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Header/>}>
            <Route index element={<Ofertas/>}/>
            <Route path="ofertas" element={<Ofertas/>}/>
            <Route path="misCupones" element={<Cupones/>}/>

            <Route path="cliente">
              <Route path="login" element={<IniciarSesion/>}/>
              <Route path="registro" element={<Registro/>}/>
              <Route path="perfil" element={<MiPerfil/>}/>
            </Route>

            <Route path="detalleOferta">
              <Route path=":offerId" element={<OfferDetails/>}/>
              <Route path=":offerId/buy" element={<PasarelaPago />} />
            </Route>

            <Route path='/detalleCupon'>
                <Route path=':couponCode' element={<CuponAdquirido/>} />
                <Route path=':couponCode/detalle' element={<CuponDetails/>} />
                <Route path='detalle/valido' element={<CuponesValidos/>} />
                <Route path='detalle/reclamado' element={<CuponesReclamados/>} />
                <Route path='detalle/vencidos' element={<CuponExpired/>} />
            </Route>


          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
