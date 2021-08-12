import { makeStyles, TableCell, TableRow } from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import axios from "axios";

const useStyles = makeStyles({
  icon: {
    cursor: "pointer",
    margin: "0rem 0.5rem",
  },
});

export const Interview = ({
  index,
  id,
  title,
  desc,
  setData,
  toggleEditModal,
  refreshHandler,
}) => {
  const classes = useStyles();
  const editHandler = () => {
    setData({
      id,
      title,
      desc,
    });
    toggleEditModal();
  };

  const deleteInterview = () => {
    const crudapi = `https://uiyie2esuf.execute-api.us-east-2.amazonaws.com/interviews/${id}`;
    axios
      .delete(crudapi)
      .then(() => refreshHandler())
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <TableRow>
      <TableCell>{index}</TableCell>
      <TableCell>{title}</TableCell>
      <TableCell>{desc}</TableCell>
      <TableCell>
        <div>
          <Edit className={classes.icon} onClick={() => editHandler()}>
            Editar
          </Edit>
          <Delete className={classes.icon} onClick={() => deleteInterview()}>
            Borrar
          </Delete>
        </div>
      </TableCell>
    </TableRow>
  );
};
