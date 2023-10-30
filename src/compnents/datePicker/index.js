import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AppContext } from "../../libs/appContext";

export default function Datepicker() {
  const { loading, customers, date, setDate } = React.useContext(AppContext);

  return (
    <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
      <DatePicker
        label="find by date"
        defaultValue={date}
        slotProps={{ textField: { size: "small" } }}
        disableFuture
        onChange={(newValue) => setDate(newValue)}
        disabled={loading || customers.length === 0 ? true : false}
      />
    </LocalizationProvider>
  );
}
