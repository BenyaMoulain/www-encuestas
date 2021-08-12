import {
  Button,
  makeStyles,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { CreateButton } from "./CreateButton";
import { Interview } from "./Interview";
import { v4 } from "uuid";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: "25rem",
    backgroundColor: theme.palette.background.paper,
    border: "0.13rem solid black",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  input: {
    width: "100%",
    margin: "1rem 0rem",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    verticalAlign: "center",
  },
  title: {
    margin: "2rem",
  },
}));

const initialInterviewDataState = {
  title: "",
  desc: "",
};

const Interviews = (props) => {
  const classes = useStyles();
  const crudapi =
    "https://uiyie2esuf.execute-api.us-east-2.amazonaws.com/interviews";

  const [interviews, setInterviews] = useState([]);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [interviewData, setInterviewData] = useState(initialInterviewDataState);

  const getAllInterviews = () => {
    axios
      .get(crudapi)
      .then((response) => {
        setInterviews(response.data.Items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateInterview = () => {
    if (
      interviewData.desc === initialInterviewDataState.desc ||
      interviewData.title === initialInterviewDataState.title
    )
      return;
    axios
      .put(crudapi, interviewData)
      .then((response) => {
        console.log(response);
        getAllInterviews();
      })
      .catch((error) => {
        console.log(error);
      });
    toggleEditModal();
  };

  const createInterview = () => {
    if (
      interviewData.desc === initialInterviewDataState.desc ||
      interviewData.title === initialInterviewDataState.title
    )
      return;
    axios
      .put(crudapi, {
        id: `${v4()}-${new Date(Date.now()).toISOString()}`,
        ...interviewData,
      })
      .then((response) => {
        console.log(response);
        getAllInterviews();
      })
      .catch((error) => {
        console.log(error);
      });
    toggleAddModal();
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getAllInterviews();
    }
    return () => {
      mounted = false;
    };
  }, []);

  const toggleAddModal = () => {
    console.log(!addModalVisible);
    setAddModalVisible(!addModalVisible);
    setInterviewData(initialInterviewDataState);
  };

  const toggleEditModal = () => {
    console.log(!editModalVisible);
    setEditModalVisible(!editModalVisible);
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    await setInterviewData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const interviwsData = interviews.map(({ id, title, desc }, index) => (
    <Interview
      key={id}
      id={id}
      index={index}
      title={title}
      desc={desc}
      setData={setInterviewData}
      toggleEditModal={toggleEditModal}
      refreshHandler={() => getAllInterviews()}
    />
  ));

  const addForm = (
    <div className={classes.modal}>
      <h2>Agregar Encuesta</h2>
      <form noValidate autoComplete="off">
        <TextField
          className={classes.input}
          id="title"
          name="title"
          label="Titulo"
          onChange={handleChange}
        />
        <TextField
          className={classes.input}
          id="desc"
          name="desc"
          label="Desc"
          onChange={handleChange}
        />
        <br />
        <div align="right">
          <Button color="primary" onClick={() => createInterview()}>
            Agregar
          </Button>
          <Button onClick={() => toggleAddModal()}>Cancelar</Button>
        </div>
      </form>
    </div>
  );

  const editForm = (
    <div className={classes.modal}>
      <h2>Editar Encuesta</h2>
      <form noValidate autoComplete="off">
        <TextField
          className={classes.input}
          id="title"
          name="title"
          label="Titulo"
          onChange={handleChange}
          value={interviewData && interviewData.title}
        />
        <TextField
          className={classes.input}
          id="desc"
          name="desc"
          label="Desc"
          onChange={handleChange}
          value={interviewData && interviewData.desc}
        />
        <br />
        <div align="right">
          <Button color="primary" onClick={() => updateInterview()}>
            Editar
          </Button>
          <Button onClick={() => toggleEditModal()}>Cancelar</Button>
        </div>
      </form>
    </div>
  );

  return (
    <div>
      <div className={classes.header}>
        <h1 className={classes.title}>Encuestas</h1>
        <span className={classes.createButton}>
          <CreateButton onClick={() => toggleAddModal()}>Crear</CreateButton>
        </span>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nº</TableCell>
              <TableCell>Titulo</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{interviwsData}</TableBody>
        </Table>
      </TableContainer>
      <Modal open={addModalVisible} onClose={toggleAddModal}>
        {addForm}
      </Modal>
      <Modal open={editModalVisible} onClose={toggleEditModal}>
        {editForm}
      </Modal>
    </div>
  );
};

export default Interviews;
