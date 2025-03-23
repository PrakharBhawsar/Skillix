import * as React from "react";
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
import { Check, Clear, Search } from "@mui/icons-material";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function VideoModulate(props) {
    let i = 0;
    const [courses, setCourses] = useState([]);
    const [isloading, setisloading] = useState(true);
    const id = sessionStorage.getItem("userID");
    const CourseID = sessionStorage.getItem("CourseID");

    React.useEffect(() => {
      const getData = async () => {
        try {
          let res = await axios.get(
            "http://localhost:3001/auth/getVideo/" + id
          );
          if (res.data) {
            setCourses(res.data.data);
            setisloading(false);
          }
          if(res){
            setisloading(false);
          }
        } catch (err) {
          setisloading(false);
        }
      };
      getData();
    }, [id]);
    const handlerequest = async (id, Statusmsg) => {
      let data = { id, Statusmsg };
      try {
        let res = await axios.post(
          "http://localhost:3001/UpdateStatus/Video",
          data
        );
        if (res) {
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
            color:"white",
          }}
        >
          <Toolbar />
          <TableContainer component={Paper} sx={{  bgcolor: "#111827",}}>
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
              {/* // first Row */}
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
                      color:"white",
                    }}
                  >
                    Videos Monitoring
                  </TableCell>
                </TableRow>
              </TableHead>
              {/* //second row */}
              <TableHead>
                <TableRow>
                  <TableCell
                    colSpan={7}
                    sx={{
                      fontFamily: "Roboto",
                      fontSize: "20px",
                      fontWeight: 600,
                      lineHeight: "0px",
                      letterSpacing: "0em",
                      color:"white",
                    }}
                  >
                    <TextField
                      variant="outlined"
                      size="small"
                      // onChange={(e) => setsearchQuery(e.target.value)}
                      sx={{ m: 1, width: "25ch","& input::placeholder": { color: "white" }  }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Search />
                          </InputAdornment>
                        ),
                      }}
                      placeholder="Seach Here..."
                    />
                  </TableCell>
                </TableRow>
              </TableHead>
  
              {/* // Thrid row */}
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{
                      fontFamily: "Roboto",
                      fontSize: "14px",
                      fontWeight: 700,
                      lineHeight: "16px",
                      letterSpacing: "0em",
                      color:"white",
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
                      color:"white",
                    }}
                  >
                    Video Title
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontFamily: "Roboto",
                      fontSize: "14px",
                      fontWeight: 700,
                      lineHeight: "16px",
                      letterSpacing: "0em",
                      color:"white",
                    }}
                  >
                    Notes Desc
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontFamily: "Roboto",
                      fontSize: "14px",
                      fontWeight: 700,
                      lineHeight: "16px",
                      letterSpacing: "0em",
                      color:"white",
                    }}
                  >
                    Notes Link
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontFamily: "Roboto",
                      fontSize: "14px",
                      fontWeight: 700,
                      lineHeight: "16px",
                      letterSpacing: "0em",
                      color:"white",
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
                      color:"white",
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
                      color:"white",
                    }}
                  >
                    Reject
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody >
              {isloading ? (
                <TableRow>
                <TableCell align="center" colSpan={10}>
                  <div className="spinner" />
                </TableCell>
                </TableRow>
              ) : filterdata?.length === 0 ? (
                <TableRow>
                <TableCell align="center" colSpan={10} sx={{color:"white"}}>
                  {"No Request Pull Yet"}
                </TableCell>
                </TableRow>
              ) : (
                filterdata?.map((user) => {
                  i = i + 1;
                  return (
                      <TableRow key={user?._id}>
                        <TableCell align="center" sx={{ color: "orange" }}>{i}</TableCell>
                        <TableCell align="center" sx={{ color: "white" }}>{user?.VideoTitle}</TableCell>
                        <TableCell align="center" sx={{ color: "white" }}>
                          {user?.VideoDesc?.slice(0, 20)}
                        </TableCell>
                        <TableCell align="center" sx={{ color: "blue" }} >{user?.VideoLink}</TableCell>
                        <TableCell align="center" >
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
                        <TableCell align="center" sx={{ color: "green" }}>
                          <Check
                            sx={{ cursor: "pointer" }}
                            onClick={() => handlerequest(user._id, "Accepted")}
                          />
                        </TableCell>
                        <TableCell align="center" sx={{ color: "red" }}>
                          <Clear
                            sx={{ cursor: "pointer" }}
                            onClick={() => handlerequest(user._id, "Rejected")}
                          />
                        </TableCell>
                      </TableRow>
                  );
                })
              )}
                  </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <ToastContainer />
      </>
    );
}

export default VideoModulate;