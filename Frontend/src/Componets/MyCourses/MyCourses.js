import React, { useState, useEffect } from "react";
import axios from "axios";
import NotFound from "../Nopage/NotFound";
import CoursesNavbar from "../Navbar/CoursesNavbar";
import { Tooltip } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function MyCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [enrollcourses, setenrollcourses] = useState([]);
  const [datafetched, setdatafetched] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isloading, setisloading] = useState(true);
  const checklogin = sessionStorage.getItem("userID");

  useEffect(() => {
    const getData = async () => {
      try {
        let res = await axios.get(
          "http://localhost:3001/auth/getEnrolledFav/" + checklogin
        );
        if (res.data) {
          setenrollcourses(res.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [checklogin]);

  useEffect(() => {
    const getData = async () => {
      try {
        let res = await axios.get("http://localhost:3001/auth/getAllCourse");
        if (res.data) {
          setCourses(res.data.data);
          setisloading(false);
          setdatafetched(true);
        }
      } catch (err) {
        setisloading(false);
      }
    };
    getData();
    sessionStorage.removeItem("CourseID");
    sessionStorage.removeItem("CourseName");
    sessionStorage.removeItem("CourseUserID");
  }, []);

  useEffect(() => {
    const filteredCourses = courses.filter((course) => {
      return enrollcourses.some(
        (enrolledCourse) => enrolledCourse.CourseID === course._id
      );
    });
    setFilteredCourses(filteredCourses);
  }, [courses, enrollcourses]);

  const handleFav = async (courseID) => {
    try {
      let data = { UserID: checklogin, CourseID: courseID };
      let res = await axios.delete("http://localhost:3001/auth/removeFav", {
        data,
      });
      if (res.data) {
        navigate("/MyCourses");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="bg-gray-900 text-white" style={{ minHeight: "100vh" }}>
        <CoursesNavbar />
        <div className="text-center mt-8">
          <h2 className="text-3xl bg-gray-900 text-white font-semibold">
            My Courses
          </h2>
        </div>
        <div className="w-full p-4 sm:p-10">
          {datafetched && filteredCourses?.length === 0 && <NotFound />}
          {isloading && <div className="spinner text-center" />}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {filteredCourses?.map((c) => {
              return (
                <div
                  key={c?._id}
                  className="home-card rounded-lg overflow-hidden shadow-lg bg-gray-800"
                  style={{ borderRadius: 20 }}
                  onClick={() => {
                    sessionStorage.setItem("CourseID", c._id);
                    sessionStorage.setItem("CourseUserID", c.userID);
                    sessionStorage.setItem("CourseName", c.title);
                    navigate("/coursedocs");
                  }}
                >
                  <img
                    src={c?.imageLink}
                    alt="Placeholder"
                    className="w-full"
                    style={{ maxHeight: "200px" }}
                  />
                  <div className="p-4">
                    <div
                      className="flex"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h3 className="text-lg font-semibold mb-2">
                        {"@" + c?.userName + "/" + c?.title}
                      </h3>
                      <Tooltip
                        title="unenrolled Course"
                        onClick={() => handleFav(c?._id)}
                      >
                        <Favorite size="md" />
                      </Tooltip>
                    </div>
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
    </>
  );
}
