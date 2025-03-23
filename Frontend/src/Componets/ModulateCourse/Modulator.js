import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NotFound from "../Nopage/NotFound";
import CoursesNavbar from "../Navbar/CoursesNavbar";
import { AddBox } from "@mui/icons-material";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function Modulator() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [isloading, setisloading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let userID = sessionStorage.getItem("userID");
  const userName = sessionStorage.getItem("userName");
  useEffect(() => {
    const getData = async () => {
      try {
        let res = await axios.get(
          "http://localhost:3001/auth/getCourse/" + userID
        );
        if (res.data) {
          setCourses(res.data.data);
          setisloading(false);
        }
      } catch (err) {
        setisloading(false);
      }
    };
    getData();
  }, [userID]);

  const [User, SetUser] = useState({
    title: "",
    description: "",
    imageLink: "",
    userID,
    userName,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    SetUser({ ...User, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    SetUser({ ...User, imageLink: file });
  };

  const handleClick = async () => {
    setisloading(true);
    const formData = new FormData();
    formData.append("title", User.title);
    formData.append("description", User.description);
    if (User.imageLink instanceof File) {
      formData.append("imageLink", User.imageLink);
    }
    formData.append("userID", User.userID);
    formData.append("userName", User.userName);
    try {
      let res = await axios.post(
        "http://localhost:3001/auth/addcourse",
        formData
      );
      if (res) {
        setisloading(false);
        toast.success(res.data.message);
        if (res.data.success) {
          SetUser({
            title: "",
            description: "",
            imageLink: "",
            userID,
            userName,
          });
        }
        handleClose();
      }
    } catch (err) {
      console.log(err);
      setisloading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white" style={{ minHeight: "100vh" }}>
      <CoursesNavbar />
      <div className="text-center mt-8">
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-6">Your Courses</h2>
          <Button
            onClick={handleOpen}
            startIcon={<AddBox />}
            variant="contained"
            sx={{
              backgroundColor: "#4C1D95",
              "&:hover": {
                backgroundColor: "#4C1D95",
              },
            }}
          >
            Add Course
          </Button>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ textAlign: "center" }}
            >
              Add Course
            </Typography>
            {isloading ? (
              <div className="spinner" />
            ) : (
              <>
                <TextField
                  id="standard-basic"
                  label="Title"
                  sx={{ width: "100%" }}
                  variant="standard"
                  name="title"
                  onChange={handleChange}
                  value={User.title}
                />
                <TextField
                  id="standard-basic"
                  label="Description"
                  variant="standard"
                  sx={{ width: "100%", mb: 2 }}
                  name="description"
                  onChange={handleChange}
                  value={User.description}
                />

                <TextField
                  sx={{ width: "100%" }}
                  type="file"
                  name="imageLink"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e)}
                  className="form-control"
                />
                <Button
                  variant="contained"
                  sx={{ display: "block", mt: 2, width: "100%" }}
                  onClick={handleClick}
                >
                  Add Course
                </Button>
              </>
            )}
          </Box>
        </Modal>
        <div className="mt-8 px-4 sm:px-10">
          {isloading && <div className="spinner text-center" />}
          {!isloading && courses.length === 0 && <NotFound />}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
            {courses?.map((c) => {
              return (
                <div
                  key={c?._id}
                  className="home-card rounded-lg overflow-hidden shadow-lg bg-gray-800"
                  style={{ borderRadius: 20 }}
                  onClick={() => {
                    sessionStorage.setItem("CourseID", c._id);
                    sessionStorage.setItem("CourseUserID", c.userID);
                    sessionStorage.setItem("CourseName", c.title);
                    navigate("/modulatecourses");
                  }}
                >
                  <img
                    src={c?.imageLink}
                    alt="Placeholder"
                    className="w-full"
                    style={{ maxHeight: "160px" }}
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{c?.title}</h3>
                    <p className="text-gray-400">
                      {c?.description?.substring(0, 150)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modulator;
