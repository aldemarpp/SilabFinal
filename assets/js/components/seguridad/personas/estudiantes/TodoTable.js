import React, { useContext, useState, Fragment } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from "@material-ui/core";
import {
  Container,
  Paper,
  Grid,
  Breadcrumbs,
  Link,
  Typography,
  TextField,
  IconButton,
  Divider,
  Button,
} from "@material-ui/core";
import Icon from "@mdi/react";
import {
  mdiEye,
  mdiCircleEditOutline,
  mdiCheckboxMarkedCircle,
  mdiCardSearch,
} from "@mdi/js";

import { Autocomplete } from "@material-ui/lab";
import { CancelRounded } from "@material-ui/icons";
import HomeIcon from "@material-ui/icons/Home";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import { TodoContext } from "./TodoContext";
import DeleteDialog from "./DeleteDialog";

const style = {
  table: {
    minWidth: 650,
    paddingTop: "40px",
  },
  container: {
    paddingTop: "20px",
  },
  paper: {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#f5f5f5",
  },
  link: {
    display: "flex",
  },
  homeIcon: {
    width: 20,
    height: 20,
    marginRight: "4px",
  },
  form: {
    width: "100%",
  },
  submit: {
    marginTop: 20,
    marginBottom: 20,
  },
  space: {
    paddingTop: "20px",
  },
  divider: {
    marginBottom: 20,
  },
  search: {
    width: 400,
    marginBottom: 20,
  },
  error: {
    marginTop: 20,
    marginBottom: 20,
  },
  tableHead: {
    color: "#ffffff",
    backgroundColor: "#E2001A",
  },
  tableCell: {
    color: "#ffffff",
  },
};

function TodoTable() {
  const context = useContext(TodoContext);
  const [addTodoCodigo, setAddTodoCodigo] = useState("");
  const [addTodoNombre, setAddTodoNombre] = useState("");
  const [addTodo, setAddTodo] = useState("");
  const [editIsShown, setEditIsShown] = useState(false);
  const [editTodoCodigo, setEditTodoCodigo] = useState("");
  const [editTodoNombre, setEditTodoNombre] = useState("");
  const [editTodo, setEditTodo] = useState("");
  const [deleteConfirmationIsShown, setDeleteConfirmationIsShown] = useState(
    false
  );
  const [todoToBeDeleted, setTodoToBeDeleted] = useState(null);

  const onCreateSubmit = (event) => {
    event.preventDefault();
    context.createTodo(event, {
      codigo: addTodoCodigo,
      nombre: addTodoNombre,
      programa: addTodo,
    });
    setAddTodoCodigo("");
    setAddTodoNombre("");
    setAddTodo("");
  };

  const onEditSubmit = (todoId, event) => {
    event.preventDefault();
    context.updateTodo({
      id: todoId,
      codigo: editTodoCodigo,
      nombre: editTodoNombre,
      programa: editTodo,
    });
    setEditIsShown(false);
  };

  function historyBack() {
    window.history.back();
  }

  const programas = [
    { state: "Ingeniería Civil" },
    { state: "Ingeniería Mecánica" },
    { state: "Ingeniería de Sistemas" },
  ];

  return (
    <Fragment>
      <Container
        style={style.container}
        component="main"
        maxWidth="lg"
        justify="center"
      >
        <Paper style={style.paper}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" style={style.link} href="">
                  <HomeIcon style={style.homeIcon} />
                  Estudiantes
                </Link>
                <Link color="inherit" style={style.link} href="/trabajo/nuevo">
                  <Typography color="textPrimary">Nuevo Estudiante</Typography>
                </Link>
              </Breadcrumbs>
            </Grid>
            <Grid item md={12} xs={12}>
              <Divider style={style.divider} />
            </Grid>
          </Grid>

          <form style={style.form}>
            <Grid container spacing={2}>
              <Grid item md={4} xs={6}>
                <TextField
                  type="text"
                  value={addTodoCodigo}
                  onChange={(event) => {
                    setAddTodoCodigo(event.target.value);
                  }}
                  label="Código"
                  fullWidth={true}
                />
              </Grid>
              <Grid item md={4} xs={6}>
                <TextField
                  type="text"
                  value={addTodoNombre}
                  onChange={(event) => {
                    setAddTodoNombre(event.target.value);
                  }}
                  label="Nombre"
                  fullWidth={true}
                />
              </Grid>

              <Grid item md={4} xs={6}>
                <Autocomplete
                  id="combo-box-demo"
                  options={programas}
                  onChange={(e, a) => {
                    setAddTodo(a !== null ? a.state : "");
                  }}
                  getOptionLabel={(option) => option.state}
                  renderInput={(params) => (
                    <TextField {...params} label="Programa" />
                  )}
                />
              </Grid>

              <Grid item xs={6} md={2}>
                <Button
                  variant="contained"
                  fullWidth
                  size="medium"
                  color="primary"
                  style={style.submit}
                  onClick={onCreateSubmit}
                >
                  Guardar
                </Button>
              </Grid>
              <Grid item xs={2} md={2}>
                <Button
                  variant="contained"
                  fullWidth
                  size="medium"
                  color="secondary"
                  style={style.submit}
                  onClick={historyBack}
                >
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </form>
          <TableContainer component={Paper}>
            <Table style={style.table} aria-label="customized table">
              {/*HEAD*/}
              <TableHead style={style.tableHead}>
                <TableRow>
                  <TableCell style={style.tableCell} align="center">
                    Código
                  </TableCell>
                  <TableCell style={style.tableCell} align="center">
                    Nombre
                  </TableCell>
                  <TableCell style={style.tableCell} align="center">
                    Programa
                  </TableCell>
                  <TableCell style={style.tableCell} align="center">
                    Opciones
                  </TableCell>
                </TableRow>
              </TableHead>

              {/*BODY*/}
              <TableBody>
                {/*ADD*/}

                {/*DATA*/}
                {context.todos
                  .slice()
                  .reverse()
                  .map((todo, index) => (
                    <TableRow key={"todo " + index}>
                      {/*NAME*/}
                      <TableCell align="center">
                        {editIsShown === todo.id ? (
                          <form onSubmit={onEditSubmit.bind(this, todo.id)}>
                            <TextField
                              type="text"
                              fullWidth={true}
                              autoFocus={true}
                              value={editTodoCodigo}
                              onChange={(event) => {
                                setEditTodoCodigo(event.target.value);
                              }}
                            />
                          </form>
                        ) : (
                          <Typography>{todo.codigo}</Typography>
                        )}
                      </TableCell>

                      {/*NOMBRE*/}
                      <TableCell align="center">
                        {editIsShown === todo.id ? (
                          <form onSubmit={onEditSubmit.bind(this, todo.id)}>
                            <TextField
                              type="text"
                              fullWidth={true}
                              value={editTodoNombre}
                              onChange={(event) =>
                                setEditTodoNombre(event.target.value)
                              }
                            />
                          </form>
                        ) : (
                          <Typography style={{ whiteSpace: "pre-wrap" }}>
                            {todo.nombre}
                          </Typography>
                        )}
                      </TableCell>

                      {/*PROGRAMA*/}
                      <TableCell align="center">
                        {editIsShown === todo.id ? (
                          <form onSubmit={onEditSubmit.bind(this, todo.id)}>
                            <Autocomplete
                              fullWidth={true}
                              options={programas}
                              onChange={(e, a) => {
                                setEditTodo(a !== null ? a.state : "");
                              }}
                              getOptionLabel={(option) => option.state}
                              renderInput={(params) => (
                                <TextField {...params} label="Programa" />
                              )}
                            />
                          </form>
                        ) : (
                          <Typography style={{ whiteSpace: "pre-wrap" }}>
                            {todo.programa}
                          </Typography>
                        )}
                      </TableCell>

                      <TableCell align="right">
                        {editIsShown === todo.id ? (
                          <Fragment>
                            <IconButton
                              onClick={onEditSubmit.bind(this, todo.id)}
                            >
                              <DoneIcon />
                            </IconButton>
                            <IconButton onClick={() => setEditIsShown(false)}>
                              <CloseIcon />
                            </IconButton>
                          </Fragment>
                        ) : (
                          <Fragment>
                            <IconButton>
                              <Icon
                                path={mdiCircleEditOutline}
                                size={1}
                                color="red"
                                onClick={() => {
                                  setEditIsShown(todo.id);
                                  setEditTodoCodigo(todo.codigo);
                                  setEditTodoNombre(todo.nombre);
                                  setEditTodo(todo.programa);
                                }}
                              />
                            </IconButton>
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="span"
                              onClick={() => {
                                setDeleteConfirmationIsShown(true);
                                setTodoToBeDeleted(todo);
                              }}
                            >
                              <CancelRounded fontSize="inherit" />
                            </IconButton>
                          </Fragment>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>

      {deleteConfirmationIsShown && (
        <DeleteDialog
          todo={todoToBeDeleted}
          open={deleteConfirmationIsShown}
          setDeleteConfirmationIsShown={setDeleteConfirmationIsShown}
        />
      )}
    </Fragment>
  );
}

export default TodoTable;
