import React, { useEffect, useState } from "react";
import CoursesNavbar from "../Navbar/CoursesNavbar";
import axios from "axios";
import { Link } from "react-router-dom";
import GitHubGraph from "./GitHubGraph";

export default function UserProfile() {
  const userID = sessionStorage.getItem("userID");
  const [userdata, setuserdata] = useState([]);
  useEffect(() => {
    const getData = async () => {
      let res = await axios.get(
        "http://localhost:3001/auth/getProfile/" + userID
      );
      if (res.data) {
        setuserdata(res.data[0]);
      }
    };
    getData();
  }, [userID]);

  const [courses, setCourses] = useState([]);

  React.useEffect(() => {
    const getData = async () => {
      try {
        let res = await axios.get(
          "http://localhost:3001/auth/getGraph/" + userID
        );
        if (res.data) {
          setCourses(res.data.data);
        }
      } catch (err) {}
    };

    getData();
  }, [userID]);
  let filterdata = courses?.filter((item) => item.ReqID !== userID);

  let contributionsdata = filterdata.map((item) => {
    let year = new Date(item.createdAt).getFullYear();
    let month = new Date(item.createdAt).getMonth() + 1;
    let date = new Date(item?.createdAt).getDate();
    let createdat = year + "-" + month + "-" + date;
    return { date: createdat, count: 1 };
  });

  return (
    <>
      <CoursesNavbar />
      <div className="min-h-screen flex bg-gray-800 text-white">
        <aside className="w-64 bg-gray-900 p-6">
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-gray-700 w-16 h-16 flex items-center justify-center text-2xl text-white">
              {sessionStorage.getItem("userName").substring(0, 2)}
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">
                {sessionStorage.getItem("userName")}
              </span>
            </div>
          </div>
          <nav className="mt-8">
            <Link
              to="/"
              className="block py-2 text-gray-400 hover:text-gray-100"
            >
              Profile
            </Link>
            <Link
              to="/"
              className="block py-2 text-gray-400 hover:text-gray-100"
            >
              Photo
            </Link>
          </nav>
        </aside>
        <main className="flex-1 p-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-semibold mb-6">Public profile</h1>
            <h2 className="text-xl mb-4">Add information about yourself</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold mb-1">Basics:</label>
                <input
                  type="text"
                  className="w-full border-2 p-2 mb-4 bg-gray-700 text-white"
                  placeholder="First Name"
                  value={userdata?.FirstName}
                />
                <input
                  type="text"
                  className="w-full border-2 p-2 mb-4 bg-gray-700 text-white"
                  placeholder="Last Name"
                  value={userdata?.LastName}
                />
                <input
                  type="text"
                  className="w-full border-2 p-2 mb-4 bg-gray-700 text-white"
                  placeholder="Headline"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Language:</label>
                <select className="w-full border-2 p-2 mb-4 bg-gray-700 text-white">
                  <option>English (UK)</option>
                </select>
                <input
                  type="text"
                  className="w-full border-2 p-2 mb-4 bg-gray-700 text-white"
                  placeholder="Email"
                  value={userdata?.Email}
                />
              </div>
            </div>
            <div
              className="mt-5 pt-6"
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <div
                className="flex pr-0 pl-5"
                style={{ width: "60%", justifyContent: "center" }}
              >
                <GitHubGraph contributions={contributionsdata} />
              </div>
            </div>
          </div>
        </main>
      </div>
       
    </>
  );
}
