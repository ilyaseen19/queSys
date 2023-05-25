import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { AppContext } from "../../libs/appContext";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Snackbars() {
  const { snack, handleClose } = React.useContext(AppContext);

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={snack.open}
        autoHideDuration={6000}
        onClose={() => handleClose()}
      >
        <Alert
          onClose={() => handleClose()}
          severity={snack.type}
          sx={{ width: "100%" }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
