import { faDiagramProject } from "@fortawesome/free-solid-svg-icons";
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
export default function ProjectTabs() {
  const [isloading, setisloading] = useState(false);
  const [datafetched, setdatafetched] = useState(false);
  const [projects, setProjects] = useState([]);
  const CourseID = sessionStorage.getItem("CourseID");
  let UserID = sessionStorage.getItem("UserID");
  let ReqID = sessionStorage.getItem("CourseUserID");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setisloading(true);
        let res = await axios.get(
          "http://localhost:3001/auth/getProjects/" + CourseID
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
  const [Form, setForm] = useState({
    UserID: UserID,
    ReqID: ReqID,
    ProjectTitle: "",
    ProjectDesc: "",
    GitRepoLink: "",
    CourseID: CourseID,
  });
  const HandleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...Form, [name]: value });
  };
  const handleClick = async () => {
    try {
      setisloading(true);
      let Status = Form.ReqID === Form.UserID ? "Accepted" : "Pending";
      setForm({ ...Form }, { Status });
      let res = await axios.post("http://localhost:3001/auth/addProject", Form);
      if (res) {
        setisloading(false);
        handleClose();
        if (res.data.success) {
          setForm({
            UserID,
            ReqID,
            GitRepoLink: "",
            ProjectTitle: "",
            ProjectDesc: "",
            CourseID,
          });
        }
        // navigate("/courses");
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
          Add Project
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
            Add Projects
          </Typography>
          <TextField
            variant="standard"
            sx={{ width: "100%", mt: 2 }}
            label={"Project Title"}
            name="ProjectTitle"
            onChange={HandleChange}
          />
          <TextField
            variant="standard"
            sx={{ width: "100%", mt: 2 }}
            label={"Project Desc"}
            name="ProjectDesc"
            onChange={HandleChange}
          />
          <TextField
            variant="standard"
            sx={{ width: "100%", mt: 2 }}
            label={"Git Repo Link"}
            name="GitRepoLink"
            onChange={HandleChange}
          />
          <Button
            variant="contained"
            sx={{ width: "100%", mt: 2 }}
            onClick={handleClick}
          >
            Upload
          </Button>
        </Box>
      </Modal>
      <div className="flex flex-wrap justify-center responsive">
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
                  icon={faDiagramProject}
                  className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3"
                />
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-white dark:text-white">
                  {item?.ProjectTitle}
                </h5>
                <p
                  className="mb-3 font-normal text-gray-300 dark:text-gray-400"
                  style={{ minHeight: "75px" }}
                >
                  {item?.ProjectDesc?.substring(0, 60) + "..."}
                </p>
                <a
                  href={item?.GitRepoLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex font-medium items-center text-blue-600 hover:underline cursor-pointer"
                  style={{
                    color: "#9135db",
                  }}
                >
                  Check out Project Link
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
