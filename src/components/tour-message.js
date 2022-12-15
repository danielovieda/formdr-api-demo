import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const parse = require('html-react-parser');

let timeout = 1000*30;

const TourMessage = ({ message, open, close, duration = timeout}) => {
  return (
    <Snackbar open={open} sx={{minWidth: 250}} autoHideDuration={duration}>
      <MuiAlert severity="info" sx={{ width: "100%" }} onClick={close}>
            {parse(message)}
      </MuiAlert>
    </Snackbar>
  );
};

export default TourMessage;
