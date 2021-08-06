import { Button, withStyles } from "@material-ui/core";
import { lightGreen } from "@material-ui/core/colors";

export const CreateButton = withStyles((theme) => ({
  root: {
    margin: "0rem 0.5rem",
    color: theme.palette.getContrastText(lightGreen[400]),
    backgroundColor: lightGreen[400],
    "&:hover": {
      backgroundColor: lightGreen[400],
    },
  },
}))(Button);
