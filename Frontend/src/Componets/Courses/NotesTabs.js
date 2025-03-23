import { faNoteSticky } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
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
export default function NotesTabs() {
  const [open, setOpen] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [datafetched, setdatafetched] = useState(false);
  const [projects, setProjects] = useState([]);
  const CourseID = sessionStorage.getItem("CourseID");
  let UserID = sessionStorage.getItem("userID");
  let ReqID = sessionStorage.getItem("CourseUserID");

  useEffect(() => {
    const getData = async () => {
      try {
        setisloading(true);
        let res = await axios.get(
          "http://localhost:3001/auth/getNotes/" + CourseID
        );
        if (res.data) {
          setProjects(res.data.data);
          setisloading(false);
          setdatafetched(true);
        }
      } catch (err) {
        setisloading(false);
      }
    };

    getData();
  }, [CourseID]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [Form, setForm] = React.useState({
    UserID,
    ReqID,
    NotesLink: "",
    NotesTitle: "",
    NotesDesc: "",
    CourseID,
  });
  const HandleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...Form, [name]: value });
  };
  const handleFileChangeVideo = (e) => {
    const file = e.target.files[0];
    setForm({ ...Form, NotesLink: file });
  };
  const handleClick = async () => {
    setisloading(true);
    const formData = new FormData();
    formData.append("UserID", Form.UserID);
    formData.append("ReqID", Form.ReqID);
    formData.append("NotesTitle", Form.NotesTitle);
    formData.append("NotesDesc", Form.NotesDesc);
    if (Form.NotesLink instanceof File) {
      formData.append("NotesLink", Form.NotesLink);
    }
    formData.append("CourseID", Form.CourseID);
    let Status = Form.ReqID === Form.UserID ? "Accepted" : "Pending";
    formData.append("Status", Status);

    try {
      let res = await axios.post(
        "http://localhost:3001/auth/addNotes",
        formData
      );
      if (res) {
        // toast.success(res.data.message);
        setisloading(false);
        handleClose();
        if (res.data.success) {
          setForm({
            UserID,
            NotesLink: "",
            NotesTitle: "",
            NotesDesc: "",
            CourseID,
          });
        }
      }
    } catch (err) {
      handleClose();
      setisloading(false);
      console.log(err);
    }
  };

  return (
    <div className="mt-8 px-4 sm:px-10">
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
          Add Notes
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
              Add Notes
            </Typography>
            {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}> */}
            <TextField
              id="standard-basic"
              label="Title"
              variant="standard"
              sx={{ width: "100%" }}
              name="NotesTitle"
              onChange={HandleChange}
            />
            <TextField
              id="standard-basic"
              label="Description"
              variant="standard"
              sx={{ width: "100%" }}
              name="NotesDesc"
              onChange={HandleChange}
            />
            <TextField
              sx={{ width: "100%" }}
              type="file"
              name="NotesLink"
              accept="video/*"
              onChange={(e) => handleFileChangeVideo(e)}
              className="form-control"
            />

            <Button
              variant="contained"
              sx={{ display: "block", mt: 2, width: "100%" }}
              onClick={handleClick}
            >
              Add Notes
            </Button>
            {/* </Typography> */}
          </Box>
        )}
      </Modal>
      <div className="flex flex-wrap justify-center">
        {datafetched && projects?.length === 0 && <NotFound />}
        {isloading && <div className="spinner text-center" />}

        {projects?.map((item, index) => (
          <div
            key={index}
            className="w-64 h-64 sm:w-100 sm:h-auto md:w-48 md:h-50 lg:w-64 lg:h-64 p-2"
          >
            <div className="max-w-md h-full mx-auto bg-gray-800 border border-gray-700 rounded-lg shadow">
              <div className="p-6">
                <FontAwesomeIcon
                  icon={faNoteSticky}
                  className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3"
                />
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-white dark:text-white">
                  {item?.NotesTitle.substring(0, 13)}
                </h5>
                <p
                  className="mb-3 font-normal text-gray-300 dark:text-gray-400"
                  style={{ height: "74px" }}
                >
                  {item?.NotesDesc?.substring(0, 60) + "..."}
                </p>
                <a
                  href={item?.NotesLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex font-medium items-center text-blue-600 hover:underline cursor-pointer"
                  style={{
                    color: "#9135db",
                  }}
                >
                  Check out Notes Link
                  <svg
                    className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
