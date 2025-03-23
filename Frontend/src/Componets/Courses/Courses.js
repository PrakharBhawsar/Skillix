import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NotFound from "../Nopage/NotFound";
import CoursesNavbar from "../Navbar/CoursesNavbar";
import CustomCheckbox from "./CustomCheckbox";
import { Tooltip } from "@mui/material";
import { FavoriteBorder } from "@mui/icons-material";

export default function Courses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [datafetched, setdatafetched] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isloading, setisloading] = useState(true);
  const [filters, setFilters] = useState({
    title: [],
    program: [],
    domain: [],
  });
  const checklogin = sessionStorage.getItem("userID");

  useEffect(() => {
    if (checklogin === null) {
      return navigate("/Auth");
    }
  }, [checklogin, navigate]);

  useEffect(() => {
    const getData = async () => {
      try {
        let res = await axios.get("http://localhost:3001/auth/getAllCourse");
        if (res.data) {
          setCourses(res.data.data);
          setFilteredCourses(res.data.data);
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

  function handleFilterChange(filterType, value) {
    setisloading(true);
    const updatedFilters = { ...filters };
    if (updatedFilters[filterType].includes(value)) {
      updatedFilters[filterType] = updatedFilters[filterType].filter(
        (item) => item !== value
      );
    } else {
      updatedFilters[filterType].push(value);
    }
    setFilters(updatedFilters);
    applyFilters(updatedFilters);
    setisloading(false);
  }

  function applyFilters(updatedFilters) {
    let filteredData = [...courses];
    Object.keys(updatedFilters).forEach((filterType) => {
      if (updatedFilters[filterType].length > 0) {
        filteredData = filteredData.filter((course) =>
          updatedFilters[filterType].includes(course[filterType])
        );
      }
    });
    setFilteredCourses(filteredData);
  }

  function FilterSection({ title, filterType, options }) {
    return (
      <div>
        <div className="flex justify-between items-center mb-2 cursor-pointer">
          <span className="font-semibold">{title}</span>
        </div>
        <div className="space-y-2">
          {options.map((option) => (
            <CustomCheckbox
              key={option.value}
              filterType={filterType}
              option={option}
              isChecked={filters[filterType].includes(option.value)}
              onChange={(e) => handleFilterChange(filterType, e.target.value)}
            />
          ))}
        </div>
      </div>
    );
  }

  const uniqueTags = [];
  courses?.map((item) => {
    var findItem = uniqueTags.find((x) => x.value === item.title);
    if (!findItem) uniqueTags.push({ value: item.title, label: item.title });
    return 0;
  });

  const titleOption = uniqueTags ?? [];

  const handleFav = async (courseID) => {
    try {
      let res = await axios.post("http://localhost:3001/auth/addFav", {
        UserID: checklogin,
        CourseID: courseID,
      });
      if (res.data) {
        navigate("/MyCourses");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [handleLatest, sethandleLatest] = useState(false);
  const handleLatestCreated = () => {
    sethandleLatest(!handleLatest);
    filteredCourses.reverse();
  };

  const [count, setcount] = useState(0);
  const handleLatestUpdated = () => {
    setcount(count + 1);
    count % 2
      ? filteredCourses.sort((a, b) => {
          let A = new Date(a.updatedAt);
          let B = new Date(b.updatedAt);
          return A - B;
        })
      : filteredCourses.sort((a, b) => {
          let A = new Date(a.updatedAt);
          let B = new Date(b.updatedAt);
          return B - A;
        });
  };

  return (
    <>
      <div className="bg-gray-900 text-white">
        <CoursesNavbar />
        <div className="text-center mt-8">
          <h2 className="text-3xl bg-gray-900 text-white font-semibold">
            All Courses
          </h2>
        </div>
      </div>
      <div className="bg-gray-900 text-white min-h-screen flex">
        <div
          className="bg-gray-800 p-4 shadow rounded-lg hidden sm:block"
          style={{
            width: "25%",
            marginTop: "40px",
            marginLeft: "10px",
            height: "70vh",
            overflow: "overlay",
          }}
        >
          <div className="flex items-center space-x-2 border-b border-gray-700 pb-4 mb-4">
            <i className="fas fa-bars text-gray-400"></i>
            <span className="font-semibold text-lg">Filters</span>
          </div>
          {isloading ? (
            <div className="spinner text-center" />
          ) : (
            <div className="space-y-6">
              <FilterSection
                title="Filter by Course"
                filterType="title"
                options={titleOption}
              />
              <div>
                <div className="flex justify-between items-center mb-2 cursor-pointer">
                  <span className="font-semibold">{"Filter By Latest"}</span>
                </div>
                <div className="space-y-2">
                  <CustomCheckbox
                    filterType={"date"}
                    option={{ value: "Latest", label: "Latest Created" }}
                    onChange={handleLatestCreated}
                    isChecked={handleLatest}
                  />
                  <CustomCheckbox
                    filterType={"dateu"}
                    option={{ value: "LatestU", label: "Latest Updated" }}
                    onChange={handleLatestUpdated}
                    isChecked={count % 2 ? true : false}
                  />
                </div>
              </div>
            </div>
          )}
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
                    style={{ maxHeight: "160px" }}
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
                        title="Add To My Course"
                        onClick={() => handleFav(c?._id)}
                      >
                        <FavoriteBorder size="md" />
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
