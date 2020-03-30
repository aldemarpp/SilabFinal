import React from "react";
import ReactDOM from "react-dom";
import "../css/app.css";
import AppNavBar from "./components/layout/AppNavbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme/theme";
import Grid from "@material-ui/core/Grid";
import Estudiantes from "./components/seguridad/personas/estudiantes/Estudiantes";
import UpdateEstudiante from "./components/seguridad/personas/estudiantes/UpdateEstudiante";
import PerfilUsuario from "./components/seguridad/usuarios/PerfilUsuario";
import Usuarios from "./components/seguridad/usuarios/Usuarios";
import Usuario from "./components/seguridad/usuarios/Usuario";
import DetallesUsuario from "./components/seguridad/usuarios/DetallesUsuario";
import UsuarioEditar from "./components/seguridad/usuarios/UsuarioEditar";
import Prestamos from "./components/vistas/bitacora/prestamos/Prestamos";
import Prestamo from "./components/vistas/bitacora/prestamos/Prestamo";
import DetallesPrestamo from "./components/vistas/bitacora/prestamos/DetallesPrestamo";
import PrestamoEditar from "./components/vistas/bitacora/prestamos/PrestamoEditar";
import Laboratorios from "./components/vistas/almacen/laboratorios/Laboratorios";
import Laboratorio from "./components/vistas/almacen/laboratorios/Laboratorio";
import DetallesLaboratorio from "./components/vistas/almacen/laboratorios/DetallesLaboratorio";
import LaboratorioEditar from "./components/vistas/almacen/laboratorios/LaboratorioEditar";
//import RegistrarUsuario from "./components/seguridad/usuarios/RegistrarUsuario";
import Login from "./components/seguridad/Login";
import NuevoElemento from "./components/vistas/almacen/elementos/NuevoElemento";
import EditarElemento from "./components/vistas/almacen/elementos/EditarElemento";
import Elementos from "./components/vistas/almacen/elementos/Elementos";
import Mantenimientos from "./components/vistas/bitacora/mantenimientos/Mantenimientos";
import NuevoMantenimiento from "./components/vistas/bitacora/mantenimientos/NuevoMantenimiento";
//import EditarMantenimiento from "./components/vistas/bitacora/mantenimientos/EditarMantenimiento";
import Trabajos from "./components/vistas/bitacora/trabajos/Trabajos";
import NuevoTrabajo from "./components/vistas/bitacora/trabajos/NuevoTrabajo";
//import EditarTrabajo from "./components/vistas/bitacora/trabajos/EditarTrabajo";
//import countries from "./countries";
//import AutoCompleteText from "./AutoCompleteText";
//import Search from "../src/Search";
//import "../src/Search/style.css";

function App(props) {
  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <AppNavBar />

        <Grid container>
          <Switch>
            <Route path="/elementos" exact component={Elementos}></Route>
            <Route
              path="/elemento/nuevo"
              exact
              component={NuevoElemento}
            ></Route>
            <Route
              path="/elemento/editar"
              exact
              component={EditarElemento}
            ></Route>

            <Route path="/prestamos" exact component={Prestamos}></Route>
            <Route path="/prestamo/nuevo" exact component={Prestamo}></Route>
            <Route
              path="/prestamo/detalles"
              exact
              component={DetallesPrestamo}
            ></Route>
            <Route
              path="/prestamo/editar"
              exact
              component={PrestamoEditar}
            ></Route>
            <Route path="/auth/login" exact component={Login}></Route>
            <Route path="/auth/perfil" exact component={PerfilUsuario}></Route>
            <Route path="/usuarios" exact component={Usuarios}></Route>
            <Route path="/usuario/nuevo" exact component={Usuario}></Route>
            <Route
              path="/usuario/detalles"
              exact
              component={DetallesUsuario}
            ></Route>
            <Route
              path="/usuario/editar"
              exact
              component={UsuarioEditar}
            ></Route>
            <Route path="/estudiantes" exact component={Estudiantes}></Route>
            <Route
              path="/estudiante/update"
              exact
              component={UpdateEstudiante}
            ></Route>
            <Route path="/laboratorios" exact component={Laboratorios}></Route>
            <Route
              path="/laboratorio/nuevo"
              exact
              component={Laboratorio}
            ></Route>
            <Route
              path="/laboratorio/detalles"
              exact
              component={DetallesLaboratorio}
            ></Route>
            <Route
              path="/laboratorio/editar"
              exact
              component={LaboratorioEditar}
            ></Route>
            <Route
              path="/mantenimientos"
              exact
              component={Mantenimientos}
            ></Route>
            <Route
              path="/mantenimiento/nuevo"
              exact
              component={NuevoMantenimiento}
            ></Route>

            <Route path="/trabajos" exact component={Trabajos}></Route>
            <Route path="/trabajo/nuevo" exact component={NuevoTrabajo}></Route>
          </Switch>
        </Grid>
      </MuiThemeProvider>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
