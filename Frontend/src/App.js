import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Componets/HomePage";
import Auth from "./Componets/Auth/Auth";
import CourseTabs from "./Componets/Courses/CourseTabs";
import Courses from "./Componets/Courses/Courses";
import MainChat from "./Componets/Chats/MainChat";
import Quill from "./Componets/Courses/Quill";
import Forum from "./Componets/Courses/Forum";
import NotFound from "./Componets/Nopage/NotFound";
import Modulator from "./Componets/ModulateCourse/Modulator";
import ModulateCourses from "./Componets/ModulateCourse/ModulatorCourses";
import MyCourses from "./Componets/MyCourses/MyCourses";
import UserProfile from "./Componets/Profile/UserProfile";
import PublicProfile from "./Componets/Profile/PublicProfile";
function App() {
  const [selectedDocs, setselectedDocs] = useState([]);
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<HomePage />} />

          <Route path="/Auth" element={<Auth />} />

          {/* All courses */}

          <Route path="/Courses" element={<Courses />} />

          <Route
            path="/coursedocs"
            element={
              <CourseTabs
                selectedDocs={selectedDocs}
                setselectedDocs={setselectedDocs}
              />
            }
          />

          <Route path="/editor" element={<Quill />} />

          <Route path="/forum" element={<Forum />} />

          <Route path="/community" element={<MainChat />} />

          {/* My Courses */}

          <Route path="/MyCourses" element={<MyCourses />} />

          {/*  Modulator */}

          <Route path="/Modulator" element={<Modulator />} />

          <Route path="/modulatecourses" element={<ModulateCourses />} />

          {/*  User Profile */}

          <Route path="/userprofile" element={<UserProfile />} />

          <Route path="/publicprofile" element={<PublicProfile />} />

          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
