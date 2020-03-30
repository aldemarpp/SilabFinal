import React, { useState, Fragment } from "react";
import {
  Container,
  Paper,
  Grid,
  Breadcrumbs,
  Link,
  IconButton,
  Collapse,
  Typography,
  TextField
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import { Alert } from "@material-ui/lab";
import { Close as CloseIcon } from "@material-ui/icons";
//import fotoUsuarioTemp from "../../../../logo.svg";
//import ImageUploader from "react-images-upload";
//import { v4 as uuidv4 } from "uuid";

import TablaPrestamo from "./TablaPrestamo";

const style = {
  container: {
    paddingTop: "20px"
  },
  paper: {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#f5f5f5"
  },
  link: {
    display: "flex"
  },
  homeIcon: {
    width: 20,
    height: 20,
    marginRight: "4px"
  },
  form: {
    width: "100%",
    marginTop: 20
  },
  submit: {
    marginBottom: 20
  },
  foto: {
    height: "100px"
  },
  avatar: {
    margin: 25,
    backgroundColor: "#e53935"
  },
  error: {
    marginTop: 20
  }
};

const DetallesPrestamo = props => {
  //crear state de prestamo
  const [prestamo, cambiarPrestamo] = useState({
    estudiante: "",
    usuario: "",
    asignatura: "",
    observacion: ""
  });

  //crear state de error
  const [error, actualizarError] = useState(false);

  //funcion para cuando el usuario escribe en los inputs
  const cambiarDato = e => {
    const { name, value } = e.target;
    cambiarPrestamo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  //Extraer los valores de los inputs
  const { estudiante, usuario, asignatura, observacion } = prestamo;

  //funcion para cuando el usuario envia la informacion
  const submitPrestamo = e => {
    e.preventDefault();

    //Validar
    if (
      estudiante === "" ||
      usuario === "" ||
      asignatura === "" ||
      observacion === ""
    ) {
      actualizarError(true);
      return;
    }

    //Eliminar el msj previo
    actualizarError(false);

    //Agregar Usuario o Actualizar

    //Reiniciar el form
    cambiarPrestamo({
      estudiante: "",
      usuario: "",
      asignatura: "",
      observacion: ""
    });
  };

  return (
    <Fragment>
      <Container
        style={style.container}
        component="main"
        maxWidth="lg"
        justify="center"
      >
        <Paper style={style.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" style={style.link} href="/prestamos">
                  <HomeIcon style={style.homeIcon} />
                  Préstamos
                </Link>
                <Typography color="textPrimary">Detalles Préstamo</Typography>
              </Breadcrumbs>
            </Grid>
          </Grid>

          <Collapse in={error} style={style.error}>
            <Alert
              variant="filled"
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  onClick={() => {
                    actualizarError(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              ¡Tiene que llenar todos los campos!
            </Alert>
          </Collapse>

          <form style={style.form} onSubmit={submitPrestamo}>
            <Grid container spacing={2}>
              <Grid item md={6} xs={6}>
                <TextField
                  name="asignatura"
                  value={asignatura}
                  onChange={cambiarDato}
                  fullWidth
                  disabled={true}
                  label="Asignatura"
                />
              </Grid>
              <Grid item md={6} xs={6}>
                <TextField
                  name="estudiante"
                  value={estudiante}
                  onChange={cambiarDato}
                  fullWidth
                  disabled={true}
                  label="Estudiante"
                />
              </Grid>
              <Grid item md={6} xs={6}>
                <TextField
                  name="usuario"
                  value={usuario}
                  onChange={cambiarDato}
                  fullWidth
                  disabled={true}
                  label="Registrado Por"
                />
              </Grid>

              <Grid item md={6} xs={6}>
                <TextField
                  name="observacion"
                  value={observacion}
                  onChange={cambiarDato}
                  fullWidth
                  disabled={true}
                  label="Observaciones"
                />
              </Grid>

              <TablaPrestamo />
            </Grid>
          </form>
        </Paper>
      </Container>
    </Fragment>
  );
};
export default DetallesPrestamo;
