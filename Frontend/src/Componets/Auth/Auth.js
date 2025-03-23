import React, { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import "./Auth.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isChecked, setChecked] = useState(false);
  const [isLoginMode, setLoginMode] = useState(true);
  
  const handleToggle = () => {
    setChecked(!isChecked);
    setLoginMode(!isLoginMode);
  };
  const navigate = useNavigate();
  const checklogin = sessionStorage.getItem('userID');

  useEffect(()=>{
    if( checklogin !== null){
      return navigate('/courses')
    }
  },[checklogin, navigate])

  return (
    <>
      <div className="Login-main">
        <div
          className="flex flex-col Login-website-name"
          style={{ background: "linear-gradient(to top,#111827, purple)" }}
        >
          <div className="mb-4 text-white text-8xl">Skillix.... </div>
          <div className="text-2xl text-white">
            "An Open-source Learning Platform"
          </div>
        </div>
        <div
          className={`Login-app-container ${
            isLoginMode ? "login-mode" : "signup-mode"
          }`}
        >
          <div className="Login-card">
            <div className={"Login-container"}>
              <h2>{isLoginMode ? "Login" : "Sign Up"}</h2>
              {isLoginMode ? (
                <>
                  <LoginForm/>
                </>
              ) : (
                <SignUpForm handleToggle={handleToggle}/>
              )}

              <div className="Login-additional-options">
                <h4>
                  {isLoginMode
                    ? "Don't have an account?"
                    : "Already have an account?"}
                  <button
                    type="button"
                    className="text-white bg-purple-700 Login-btn dark:bg-purple-700"
                    onClick={handleToggle}
                  >
                    {isLoginMode ? "Sign up" : "Login"}
                  </button>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Auth;
