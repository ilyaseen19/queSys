import React from "react";
import {
  DataGrid,
  GridToolbarExport,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import { useApp } from "../../libs/appContext";

export default function Tables() {
  const { customers, original, date } = useApp();

  const columns = [
    { field: "fullName", headerName: "Full Name", width: 360 },
    { field: "IDType", headerName: "ID Type", width: 190 },
    {
      field: "IDNumber",
      headerName: "ID Number",
      width: 210,
      sortable: false,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      width: 160,
    },
    {
      field: original.length === 0 ? "visitations" : "reason",
      headerName: original.length === 0 ? "# of Time Visited" : "Transaction",
      sortable: false,
      width: 190,
    },
  ];

  const rows =
    customers.length === 0
      ? []
      : customers.map((customer, index) => {
          customer.id = index;
          customer.visitations = customer.queData.length;
          customer.phone = "1(876)" + customer.phoneNumber;
          let day = customer.queData.find(
            (item) =>
              new Date(item.createdAt).toLocaleDateString() ===
              new Date(date.$d).toLocaleDateString()
          );
          customer.reason =
            original.length === 0 || !day ? "" : day.transactionType;
          return customer;
        });

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarExport
          printOptions={{
            hideFooter: true,
            hideToolbar: true,
          }}
        />
      </GridToolbarContainer>
    );
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-body ">
          <div className="mt-5" style={{ height: 500, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              rowsPerPageOptions={[10, 20, 50, 100, customers.length]}
              initialState={{
                pagination: {
                  pageSize: 10,
                },
              }}
              pagination
              components={{
                Toolbar: CustomToolbar,
              }}
              sx={{
                "@media print": {
                  ".MuiDataGrid-main": { color: "rgba(0,0,0,0.87)" },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
