import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useApp } from "../../libs/appContext";

export default function NavPane() {
  const { switchPage } = useApp();

  return (
    <Stack direction="row" spacing={2}>
      <Button variant="outlined" onClick={() => switchPage("Que")}>
        Que
      </Button>
      <Button variant="outlined" onClick={() => switchPage("Customer List")}>
        Customers List
      </Button>
      <Button variant="outlined" onClick={() => switchPage("Data")}>
        Data Visualysation
      </Button>
    </Stack>
  );
}
