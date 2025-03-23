import axios from "axios";
import React, { useCallback } from "react";
import { useState } from "react";
import NotFound from "../Nopage/NotFound";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { AddBox } from "@mui/icons-material";
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
export default function CoursesVideotab() {
  const [isloading, setIsLoading] = useState(false);
  const [datafetched, setdatafetched] = useState(false);
  let UserID = sessionStorage.getItem("userID");
  let ReqID = sessionStorage.getItem("CourseUserID");
  let CourseID = sessionStorage.getItem("CourseID");
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const getData = useCallback(async () => {
    try {
      setIsLoading(true); // Set loading to true when fetching data
      let res = await axios.get(
        "http://localhost:3001/auth/getVideos/" + CourseID
      );
      if (res.data) {
        setCourses(res.data.data);
        setdatafetched(true);
      }
    } catch (err) {
      setIsLoading(false); // Set loading to false regardless of success or error
      console.error(err);
    } finally {
      setIsLoading(false); // Set loading to false regardless of success or error
    }
  }, [CourseID]);

  React.useEffect(() => {
    getData();
  }, [CourseID, getData]); // Add CourseID to the dependency array

  const [Form, setForm] = useState({
    UserID,
    ReqID,
    VideoLink: "",
    VideoTitle: "",
    VideoDesc: "",
    CourseID,
  });
  const HandleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...Form, [name]: value });
  };
  const handleFileChangeVideo = (e) => {
    const file = e.target.files[0];
    setForm({ ...Form, VideoLink: file });
  };
  const handleClick = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("UserID", Form.UserID);
    formData.append("VideoTitle", Form.VideoTitle);
    formData.append("VideoDesc", Form.VideoDesc);
    if (Form.VideoLink instanceof File) {
      formData.append("VideoLink", Form.VideoLink);
    }
    formData.append("CourseID", Form.CourseID);
    formData.append("ReqID", Form.ReqID);
    let Status = Form.ReqID === Form.UserID ? "Accepted" : "Pending";
    formData.append("Status", Status);
    try {
      let res = await axios.post(
        "http://localhost:3001/auth/addVideo",
        formData
      );
      if (res) {
        // toast.success(res.data.message);
        setIsLoading(false);
        handleClose();
        if (res.data.success) {
          getData();
          setForm({
            UserID,
            ReqID,
            VideoLink: "",
            VideoTitle: "",
            VideoDesc: "",
            CourseID,
          });
        }
        // navigate("/courses");
      }
    } catch (err) {
      handleClose();
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <>
      <div className="mt-5 px-4 sm:px-10">
        <div className="text-center mb-2">
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
            Add Video
          </Button>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {isloading ? (
            <div className="spinner" />
          ) : (
            <Box sx={style}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ textAlign: "center" }}
              >
                Add Video
              </Typography>
              <TextField
                id="standard-basic"
                label="Title"
                sx={{ width: "100%" }}
                variant="standard"
                name="VideoTitle"
                onChange={HandleChange}
                value={Form.VideoTitle}
              />
              <TextField
                id="standard-basic"
                label="Description"
                variant="standard"
                sx={{ width: "100%" }}
                name="VideoDesc"
                onChange={HandleChange}
                value={Form.VideoDesc}
              />
              <TextField
                sx={{ width: "100%" }}
                type="file"
                name="VideoLink"
                accept="video/*"
                onChange={(e) => handleFileChangeVideo(e)}
                className="form-control"
              />
              <Button
                variant="contained"
                sx={{ display: "block", mt: 2, width: "100%" }}
                onClick={handleClick}
              >
                Upload
              </Button>
            </Box>
          )}
        </Modal>
        <div
          className="flex justify-center items-center mt-3"
          style={{ flexDirection: "column" }}
        >
          {datafetched && courses?.length === 0 && <NotFound />}
          {isloading && <div className="spinner text-center" />}
          {courses?.map((c) => {
            return (
              <div
                className="rounded-lg overflow-hidden shadow-lg bg-gray-800 mb-5"
                style={{ borderRadius: 20, maxWidth: "400px" }} // Adjust the max width as needed
                key={c?._id}
              >
                <video width="320" height="240" controls className="w-full">
                  <source src={c?.VideoLink} type="video/mp4" />
                </video>

                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">
                    {c?.VideoTitle}
                  </h3>
                  <p className="text-gray-400">{c.VideoDesc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
