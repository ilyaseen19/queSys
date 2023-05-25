import React, { useContext } from "react";
import { styled, alpha } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import DatePicker from "../../compnents/datePicker";
import Tables from "../../compnents/tables";
import { read, utils } from "xlsx";
import { AppContext } from "../../libs/appContext";
import SkeletonTables from "../../compnents/skeletons/tables";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function CustomersList() {
  const {
    uploadFile,
    setExcelData,
    loading,
    setFileName,
    fileName,
    _search,
    original,
    originalPh,
    _clear,
    date,
    _handlePhoneSearch,
  } = useContext(AppContext);

  const handleFile = (event) => {
    const files = event.target.files;
    if (files.length) {
      const file = files[0];
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;

        if (sheets.length) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          setExcelData(rows);
        }
      };
      reader.readAsArrayBuffer(file);
      return;
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        alignItems: "center",
        width: "100%",
        justifyContent: "center",
        bgcolor: "background.paper",
        color: "text.secondary",
        "& svg": {
          m: 0.5,
        },
        "& hr": {
          mx: 0.5,
        },
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          border: (theme) => `1px solid ${theme.palette.divider}`,
          borderRadius: 1,
          bgcolor: "background.paper",
          color: "text.secondary",
          marginBottom: 5,
          "& svg": {
            m: 0.5,
          },
          "& hr": {
            mx: 0.5,
          },
        }}
      >
        {/* <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Enter customer phone number"
            inputProps={{ "aria-label": "search" }}
            disabled={loading ? true : false}
            onChange={(e) => _handlePhoneSearch(e.target.value)}
          />
        </Search> */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <DatePicker />
          <IconButton
            aria-label="search"
            color="primary"
            sx={{ marginLeft: 3 }}
            onClick={original.length === 0 ? _search : _clear}
            disabled={!date.isValid() ? true : false}
          >
            {original.length === 0 ? (
              <SearchOutlinedIcon />
            ) : (
              <HighlightOffOutlinedIcon />
            )}
          </IconButton>
        </div>
        <Divider orientation="vertical" variant="middle" flexItem />
        <div>
          <Button
            variant="outlined"
            disabled={loading ? true : false}
            component="label"
          >
            <input type="file" onChange={handleFile} key={fileName} />
          </Button>
          <Button
            sx={{ marginRight: 3, marginLeft: 2 }}
            variant="contained"
            size="small"
            disabled={loading ? true : false}
            endIcon={<PublishOutlinedIcon />}
            onClick={uploadFile}
          >
            Upload
          </Button>
        </div>
      </Toolbar>
      {loading ? <SkeletonTables /> : <Tables />}
    </Box>
  );
}
