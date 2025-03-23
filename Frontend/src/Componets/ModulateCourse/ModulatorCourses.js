import React from 'react';
import  { useState } from "react";
import CoursesNavbar from "../Navbar/CoursesNavbar";
import VideoModulate from "./VideoModulate"
import DocumentationModulate from "./DocumentationModulate"
import NotesModulate from "./NotesModulate"

function ModulateCourses(props) {
    const [activeTab, setActiveTab] = useState("documentation");
    const CourseName = sessionStorage.getItem('CourseName');
    const handleTabClick = (tabName) => {
      setActiveTab(tabName);
    };
    return (
      <>
        <div className="bg-gray-900 text-white min-h-screen">
          <CoursesNavbar />
          <div className="text-center text-3xl mb-10">{CourseName}</div>
          <div className="flex justify-center flex-wrap gap-4 sm:gap-8">
            <div
              className={`${
                activeTab === "documentation" ? "bg-gray-700" : "bg-gray-800"
              } hover:bg-gray-800 rounded p-4 text-center transition duration-300 ease-in-out w-32 h-32 flex flex-col items-center justify-center cursor-pointer`}
              onClick={() => handleTabClick("documentation")}
            >
              <i className="fas fa-book fa-2x mb-2"></i>
              <div className="text-lg">Documentation</div>
            </div>
  
            <div
              className={`${
                activeTab === "video" ? "bg-gray-700" : "bg-gray-800"
              } hover:bg-gray-800 rounded p-4 text-center transition duration-300 ease-in-out w-32 h-32 flex flex-col items-center justify-center cursor-pointer`}
              onClick={() => handleTabClick("video")}
            >
              <i className="fas fa-video fa-2x mb-2"></i>
              <div className="text-lg">Video</div>
            </div>
            
            <div
              className={`${
                activeTab === "notes" ? "bg-gray-700" : "bg-gray-800"
              } hover:bg-gray-800 rounded p-4 text-center transition duration-300 ease-in-out w-32 h-32 flex flex-col items-center justify-center cursor-pointer`}
              onClick={() => handleTabClick("notes")}
            >
              <i className="fas fa-sticky-note fa-2x mb-2"></i>
              <div className="text-lg">Notes</div>
            </div>            
                        
          </div>
  
          <div className="flex justify-center space-x-4 mt-3">
            {activeTab === "documentation" ?  (
                <DocumentationModulate  />
              ) 
            : 
              activeTab === "video" ? (
                <VideoModulate/>
              ):
                activeTab === "notes" ? (
                <NotesModulate/>
                  )
                    :""
            }
          </div>
        </div>
      </>)
}

export default ModulateCourses;