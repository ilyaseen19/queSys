import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
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
  textAlign: "bottom",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(0, 1, 1, 0),
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

export default function QueSearch() {
  const {
    que,
    customers,
    _handleIdChange,
    queData,
    setQueData,
    _handleQue,
    _handlePhChange,
    loading,
  } = React.useContext(AppContext);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          border: (theme) => `1px solid ${theme.palette.divider}`,
          borderRadius: 1,
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
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-label">Id Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={queData.idType}
            label="Id Type"
            disabled={loading ? true : false}
            onChange={(e) => setQueData({ ...queData, idType: e.target.value })}
          >
            <MenuItem value="Phone">Phone</MenuItem>
            <MenuItem value="National">Nationa Id</MenuItem>
            <MenuItem value="Drivers">Drivers Liscence</MenuItem>
            <MenuItem value="Passport">Passport</MenuItem>
            <MenuItem value="Trn">TRN</MenuItem>
          </Select>
        </FormControl>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Toolbar>
          <Autocomplete
            value={queData.IDNumber}
            onChange={(event, newValue) => {
              _handleIdChange(newValue);
            }}
            disabled={loading ? true : false}
            inputValue={queData.IDNumber}
            onInputChange={(event, newInputValue) => {
              setQueData({ ...queData, IDNumber: newInputValue });
            }}
            id="controllable-states-demo"
            options={customers.map((customer, index) => {
              return customer.IDNumber === undefined || customer.IDNumber === ""
                ? ""
                : customer.IDNumber;
            })}
            sx={{ width: 170 }}
            renderInput={(params) => (
              <TextField {...params} label="Id number" variant="standard" />
            )}
            isOptionEqualToValue={(option, value) =>
              value === undefined || value === "" || option.id === value.id
            }
          />
        </Toolbar>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Toolbar>
          <Search>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              onChange={(event, newValue) => {
                _handlePhChange(newValue);
              }}
              inputValue={queData.phoneNumber}
              onInputChange={(event, newInputValue) => {
                setQueData({ ...queData, phoneNumber: newInputValue });
              }}
              disabled={loading ? true : false}
              value={queData.phoneNumber}
              options={customers.map((customer) => {
                return customer.phoneNumber;
              })}
              sx={{ width: 170 }}
              isOptionEqualToValue={(option, value) =>
                value === undefined || value === "" || option.id === value.id
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Phone number"
                  variant="standard"
                />
              )}
            />
          </Search>
        </Toolbar>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Toolbar>
          {/* <Search> */}
          <StyledInputBase
            placeholder="Full name"
            inputProps={{ "aria-label": "search" }}
            disabled={loading ? true : false}
            onChange={(e) =>
              setQueData({ ...queData, fullName: e.target.value })
            }
            value={queData.fullName}
          />
          {/* </Search> */}
        </Toolbar>
        <Divider orientation="vertical" variant="middle" flexItem />
        <FormControl
          variant="standard"
          sx={{ m: 1, minWidth: 120, width: 230 }}
        >
          <InputLabel id="demo-simple-select-label">
            Transaction Type
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={queData.transactionType}
            label="Transaction Type"
            disabled={loading ? true : false}
            onChange={(e) =>
              setQueData({ ...queData, transactionType: e.target.value })
            }
          >
            <MenuItem value="Bill payment">Bill payment</MenuItem>
            <MenuItem value="Enquiry">Enquiry</MenuItem>
            <MenuItem value="Receiving">Receiving</MenuItem>
            <MenuItem value="Sending">Sending</MenuItem>
            <MenuItem value="Scool fees">School fees payment</MenuItem>
          </Select>
        </FormControl>
        <Divider orientation="vertical" variant="middle" flexItem />
        <IconButton
          color="primary"
          aria-label="add an alarm"
          disabled={loading ? true : false}
          size="large"
          onClick={_handleQue}
        >
          <AddCircleTwoToneIcon fontSize="large" />
        </IconButton>
      </Box>
      {loading ? (
        <SkeletonTables />
      ) : (
        <List
          sx={{
            width: "100%",
            marginTop: 3,
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
            bgcolor: "background.paper",
            position: "relative",
            overflow: "auto",
            maxHeight: 330,
            "& ul": { padding: 0 },
          }}
        >
          {que.map((item, index) => {
            return (
              <li key={index}>
                <ul>
                  <ListItem>
                    <ListItem
                      sx={{
                        width: "5%",
                        display: "flex",
                        padding: 0,
                      }}
                    >
                      <ListItemText primary={index + 1} />
                    </ListItem>
                    <ListItem
                      sx={{ width: "25%", display: "flex", padding: 0 }}
                    >
                      <ListItemText primary={item.fullName} />
                    </ListItem>
                    <ListItem
                      sx={{ width: "10%", display: "flex", padding: 0 }}
                    >
                      <ListItemText primary={item.IDType} />
                    </ListItem>
                    <ListItem
                      sx={{ width: "15%", display: "flex", padding: 0 }}
                    >
                      <ListItemText primary={item.IDNumber} />
                    </ListItem>
                    <ListItem
                      sx={{ width: "15%", display: "flex", padding: 0 }}
                    >
                      <ListItemText primary={`1876 ${item.phoneNumber}`} />
                    </ListItem>
                    <ListItem
                      sx={{ width: "15%", display: "flex", padding: 0 }}
                    >
                      <ListItemText primary={item.queData[0].transactionType} />
                    </ListItem>
                    <ListItem
                      sx={{ width: "15%", display: "flex", padding: 0 }}
                    >
                      <ListItemText
                        primary={new Date(
                          item.queData[0].createdAt
                        ).toLocaleTimeString()}
                      />
                    </ListItem>
                  </ListItem>
                </ul>
              </li>
            );
          })}
        </List>
      )}
    </div>
  );
}
