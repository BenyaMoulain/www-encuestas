import { makeStyles, TableCell, TableRow } from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";

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
  description,
  setData,
  toggleEditModal,
}) => {
  const classes = useStyles();
  const editHandler = () => {
    setData({
      id,
      title,
      description,
    });
    toggleEditModal();
  };
  return (
    <TableRow>
      <TableCell>{index}</TableCell>
      <TableCell>{title}</TableCell>
      <TableCell>{description}</TableCell>
      <TableCell>
        <div>
          <Edit className={classes.icon} onClick={() => editHandler()}>
            Editar
          </Edit>
          <Delete
            className={classes.icon}
            onClick={() => console.log(`Evento borrar: { id: ${index} }`)}
          >
            Borrar
          </Delete>
        </div>
      </TableCell>
    </TableRow>
  );
};
