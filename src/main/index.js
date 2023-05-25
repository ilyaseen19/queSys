import React from "react";
import MenuAppBar from "../compnents/appBar";
import Container from "@mui/material/Container";
import NavPane from "../compnents/navpane";
import Divider from "@mui/material/Divider";
import QueSearch from "./queSearch";
import { useApp } from "../libs/appContext";
import CustomersList from "./customers";
import DataPage from "./data";
import Snackbars from "../compnents/snackbars";

export default function Main() {
  const { pageTitle } = useApp();

  const renderPage = () => {
    if (pageTitle === "Que") return <QueSearch />;
    if (pageTitle === "Customer List") return <CustomersList />;
    if (pageTitle === "Data") return <DataPage />;
  };

  return (
    <div>
      <MenuAppBar />
      <Container sx={{ padding: 3 }}>
        <NavPane />
        <Divider sx={{ marginTop: 2, marginBottom: 2 }}>{pageTitle}</Divider>
        {renderPage()}
      </Container>
      <Snackbars />
    </div>
  );
}
