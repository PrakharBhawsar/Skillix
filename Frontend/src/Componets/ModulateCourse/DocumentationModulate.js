import React, { useCallback } from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputAdornment,
  TextField,
} from "@mui/material";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Check, Clear, Search } from "@mui/icons-material";

function DoucumationModulate() {
  const [courses, setCourses] = useState([]);
  const [isloading, setisloading] = useState(true);
  const id = sessionStorage.getItem("userID");
  const CourseID = sessionStorage.getItem("CourseID");

  const getData = useCallback(async() => {
    try {
      let res = await axios.get("http://localhost:3001/auth/getDocs/" + id);
      if (res.data) {
        setCourses(res.data.data);
        setisloading(false);
      }
    } catch (err) {
      setisloading(false);
    }
  },[id]);

  React.useEffect(() => {
    getData();
  }, [getData]);

  const handlerequest = async (id, ContentID,Statusmsg) => {
    let data = { id, ContentID, Statusmsg };
    try {
      let res = await axios.post("http://localhost:3001/UpdateStatus", data);
      if (res.data) {
        getData();
        alert("Update Successfully");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const filterdata = courses.filter((item) => item.CourseID === CourseID);

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          bgcolor: "#111827",
          height: "auto",
        }}
      >
        <Toolbar />

        <TableContainer component={Paper} sx={{ bgcolor: "#111827" }}>
          <Table
            sx={{ minWidth: 650, bgcolor: "#111827", color: "white" }}
            aria-label="caption table"
          >
            <TableHead>
              <TableRow>
                <TableCell
                  colSpan={18}
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "24px",
                    fontWeight: 600,
                    lineHeight: "30px",
                    letterSpacing: "0em",
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  Documentation Monitoring
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  colSpan={7}
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "20px",
                    fontWeight: 600,
                    lineHeight: "0px",
                    letterSpacing: "0em",
                    color: "white",
                  }}
                >
                  <TextField
                    variant="outlined"
                    size="small"
                    sx={{
                      m: 1,
                      width: "25ch",
                      color: "#fff !important",
                      borderColor:'#fff !important',
                      "& input::placeholder": { color: "#fff" }
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search />
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Search Here..."
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "14px",
                    fontWeight: 700,
                    lineHeight: "16px",
                    letterSpacing: "0em",
                    color: "white",
                  }}
                >
                  Id
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "14px",
                    fontWeight: 700,
                    lineHeight: "16px",
                    letterSpacing: "0em",
                    color: "white",
                  }}
                >
                  Documentation SubTitle
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "14px",
                    fontWeight: 700,
                    lineHeight: "16px",
                    letterSpacing: "0em",
                    color: "white",
                  }}
                >
                  Documentation SubTitle
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "14px",
                    fontWeight: 700,
                    lineHeight: "16px",
                    letterSpacing: "0em",
                    color: "white",
                  }}
                >
                  Documentation Content ID
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "14px",
                    fontWeight: 700,
                    lineHeight: "16px",
                    letterSpacing: "0em",
                    color: "white",
                  }}
                >
                  Status
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "14px",
                    fontWeight: 700,
                    lineHeight: "16px",
                    letterSpacing: "0em",
                    color: "white",
                  }}
                >
                  Accept
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "14px",
                    fontWeight: 700,
                    lineHeight: "16px",
                    letterSpacing: "0em",
                    color: "white",
                  }}
                >
                  Reject
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isloading ? (
                <TableRow>
                  <TableCell align="center" colSpan={10}>
                    <div className="spinner" />
                  </TableCell>
                </TableRow>
              ) : filterdata?.length === 0 ? (
                <TableRow>
                  <TableCell
                    align="center"
                    colSpan={10}
                    sx={{ color: "white" }}
                  >
                    {"No Request Pull Yet"}
                  </TableCell>
                </TableRow>
              ) : (
                filterdata?.map((user, index) => (
                  <TableRow key={user?._id}>
                    <TableCell align="center" sx={{ color: "orange" }}>{index + 1}</TableCell>
                    <TableCell align="center" sx={{ color: "white" }}>
                      {user?.subTitle}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "white" }}>
                      {user?.subContent?.slice(0, 20)}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "white" }}>
                      {user?.ContentID}
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        style={
                          user?.Status === "Accepted"
                            ? {
                                backgroundColor: "blue",
                                color: "white",
                                padding: "5px",
                              }
                            : user?.Status === "Pending"
                            ? {
                                backgroundColor: "Yellow",
                                color: "black",
                                padding: "5px",
                              }
                            : {
                                backgroundColor: "red",
                                color: "white",
                                padding: "5px",
                              }
                        }
                      >
                        {user?.Status}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Check
                        sx={{ cursor: "pointer",color:'green' }}
                        onClick={() => handlerequest(user._id,user.ContentID, "Accepted")}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Clear
                        sx={{ cursor: "pointer",color:'red' }}
                        onClick={() => handlerequest(user._id,user.ContentID ,"Rejected")}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <ToastContainer />
    </>
  );
}

export default DoucumationModulate;
