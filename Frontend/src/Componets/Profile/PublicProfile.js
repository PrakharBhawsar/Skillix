import React, { useEffect, useRef, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import GitHubGraph from "./GitHubGraph";
import axios from "axios";
import NotFound from "../Nopage/NotFound";

export default function PublicProfile() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const username = params.get("username");
  const checklogin = sessionStorage.getItem("userID");
  const [userdata, setuserdata] = useState([]);
  const [userID, setuserID] = useState("");
  const [con, setCon] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isloading, setisloading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      let res = await axios.get(
        "http://localhost:3001/auth/getProfile/" + username
      );
      if (res.data) {
        setuserdata(res.data[0]);
        setuserID(res.data[0]._id);
      }
    };
    getData();
  }, [username]);

  React.useEffect(() => {
    const getData = async () => {
      try {
        let res = await axios.get(
          "http://localhost:3001/auth/getGraph/" + userID
        );
        if (res.data) {
          setCon(res.data.data);
        }
      } catch (err) {}
    };

    getData();
  }, [userID]);

  let filterdata = con?.filter((item) => item.ReqID !== userID);

  let contributions = filterdata.map((item) => {
    let year = new Date(item.createdAt).getFullYear();
    let month = new Date(item.createdAt).getMonth() + 1;
    let date = new Date(item?.createdAt).getDate();
    let createdat = year + "-" + month + "-" + date;
    return { date: createdat, count: 1 };
  });

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        className="bg-gray-900"
        style={{ minHeight: "100vh", height: "auto" }}
      >
        <nav className="bg-grey text-white border-gray-200 py-2.5 dark:bg-gray-900">
          <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
            <Link to="/" className="flex items-center">
              <img src="/logo.png" className="h-6 mr-3 sm:h-9" alt="Logo" />
            </Link>
            <div className="flex items-center lg:order-2">
              {checklogin === null ? (
                <Link
                  to="/Auth"
                  className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800"
                >
                  Login
                </Link>
              ) : (
                <div className="relative" ref={menuRef}>
                  <div className="mr-10" onClick={toggleMenu}>
                    <i className="fas fa-user-circle text-2xl cursor-pointer"></i>
                  </div>
                  {isMenuOpen && (
                    <div className="absolute bottom-0 top-8 left--5 right-5 shadow-lg h-auto w-auto z-10 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                      <div
                        className="flex flex-col space-y-2 py-2 p-4 text-black"
                        style={{
                          background: "#1f2937",
                          border: "none",
                          borderRadius: "10px",
                        }}
                      >
                        <Link to={`/publicprofile/?username=${username}`}>
                          <button className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
                            My Profile
                          </button>
                        </Link>
                        <button
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200"
                          onClick={() => {
                            sessionStorage.clear();
                            navigate("/");
                          }}
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              <button
                data-collapse-toggle="mobile-menu-2"
                type="button"
                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 "
                aria-controls="mobile-menu-2"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg
                  className="hidden w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div
              className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2"
            >
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <Link
                    to="/courses"
                    className="block py-2 pl-3 pr-4 text-white bg-purple-700 rounded lg:bg-transparent lg:text-purple-700 lg:p-0 dark:text-white"
                    aria-current="page"
                  >
                    Courses
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div
          className="container mx-auto p-8 text-white bg-gray-900"
          style={{ width: "70%" }}
        >
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-gray-700 w-28 h-28 flex items-center justify-center text-4xl text-white">
                  {userdata?.FirstName?.substring(0, 1) +
                    userdata?.LastName?.substring(0, 1)}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-500">Name:</span>
                  <span className="font-semibold">
                    {userdata?.FirstName + " " + userdata?.LastName}
                  </span>
                  <span className="font-semibold text-gray-500">Email:</span>
                  <span className="font-semibold">{userdata?.Email}</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col justify-center items-center">
              <div className="text-center text-xl mb-4">
                Total Contributions:
              </div>
              <div className="text-center">
                <div className="text-6xl font-bold">{filterdata?.length}</div>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mt-8">
            <GitHubGraph contributions={contributions} />
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mt-8">
            <h1 align="center" style={{ fontSize: "1.5rem" }}>
              {userdata?.Username + "`s"} Courses
            </h1>
            <div className="mt-8 px-4 sm:px-10">
              {isloading && <div className="spinner text-center" />}
              {!isloading && courses.length === 0 && <NotFound />}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
                {courses?.map((c) => {
                  return (
                    <div
                      key={c?._id}
                      className="home-card rounded-lg overflow-hidden shadow-lg bg-gray-900"
                      style={{ borderRadius: 20 }}
                    >
                      <img
                        src={c?.imageLink}
                        alt="Placeholder"
                        className="w-full"
                        style={{ maxHeight: "200px" }}
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">
                          {c?.title}
                        </h3>
                        <p className="text-gray-400">
                          {c?.description?.substring(0, 80)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
