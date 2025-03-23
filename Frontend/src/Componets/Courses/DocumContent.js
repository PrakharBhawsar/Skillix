import React from "react";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";

export default function DocumContent({ selectedDocs, settab }) {
  const navigate = useNavigate();
  const handlePullRequest = () => {
    sessionStorage.setItem("ContentID", selectedDocs?.ContentID);
    sessionStorage.setItem("subTitle", selectedDocs?.subTitle);
    navigate("/editor");
  };
  return (
    <div
      className="p-4 md:p-8" // Add padding for larger screens
      style={{
        width: "100%", // Adjusted width for smaller screens
        color: "#fff",
        minHeight: "calc(100vh - 100px)", // Adjusted minHeight for smaller screens
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h4
          className="cursor-pointer"
          onClick={() => settab(false)}
          style={{ marginBottom: "20px" }} // Add margin for spacing
        >
          Back
        </h4>
        <button
          className="cursor-pointer"
          onClick={() => handlePullRequest()}
          type="button"
          style={{
            marginBottom: "20px",
            background: "#9c27b0",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          Pull Request
        </button>
      </div>
      <ReactQuill
        value={selectedDocs?.subContent}
        readOnly={true}
        theme={"bubble"}
      />
    </div>
  );
}
