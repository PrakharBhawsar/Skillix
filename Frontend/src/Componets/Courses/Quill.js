import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CoursesNavbar from "../Navbar/CoursesNavbar";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ["clean"],
    ["link", "image", "video"],
  ],
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "code-block",
  "link",
  "image",
  "video",
  "color",
  "background",
];

export default function Quill() {
  const [isLoading, setisLoading] = useState(false);
  const [value, setValue] = useState("");
  const [Title, setTitle] = useState("");
  const quillRef = useRef(null);
  const navigate = useNavigate();
  let UserID = sessionStorage.getItem("userID");
  let ReqID = sessionStorage.getItem("CourseUserID");
  let CourseID = sessionStorage.getItem("CourseID");
  let ContentID = sessionStorage.getItem("ContentID");
  let subTitle = sessionStorage.getItem("subTitle");

  const handleClick = async () => {
    setisLoading(true);
    const html = quillRef.current.editor.root.innerHTML;
    const data = {
      UserID,
      ReqID,
      CourseID,
      subTitle: subTitle ? subTitle:Title,
      subContent: html,
      ContentID: ContentID ? ContentID : Date.now(),
      Status: subTitle ? "Pending" : ReqID === UserID ? "Accepted" : "Pending",
    };

    try {
      let res = await axios.post("http://localhost:3001/auth/addDoc", data);
      if (res.data) {
        setisLoading(false);
        navigate("/coursedocs");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="bg-gray-900 text-white min-h-screen" style={{ minHeight: '100vh', height: 'auto' }}>
        <CoursesNavbar />
        <div className="text-center text-2xl mb-10">{subTitle ? "Pull Request":"Add Documentation"}</div>
        {isLoading ? (
          <div className="spinner" />
        ) : (
          <div className="flex flex-col items-center my-10 mx-5 p-3 rounded-lg bg-gray-800">
            <input
              type="text"
              placeholder="Title"
              value={subTitle ? subTitle : Title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mb-5 px-4 py-2 rounded-lg bg-gray-700 focus:outline-none"
            />

            <ReactQuill
              modules={modules}
              formats={formats}
              ref={quillRef}
              theme={"snow"}
              value={value}
              onChange={setValue}
              readOnly={false}
              style={{ width: "100%", height: "50vh"}}
            />
            <br></br>
            <div className="mt-8">
              <button
                onClick={handleClick}
                className="px-6 py-3 bg-indigo-600 rounded-lg text-white hover:bg-indigo-700 focus:outline-none"
              >
                Publish
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
