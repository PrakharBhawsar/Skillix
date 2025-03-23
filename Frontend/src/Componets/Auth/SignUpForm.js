import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const SignUpForm = ({handleToggle}) => {
  const [IsLoading, setIsLoading] = useState(false);
  const [UserData, SetUserData] = useState({
    FirstName: "",
    LastName: "",
    Username: "",
    Email: "",
    Password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    SetUserData({ ...UserData, [name]: value });
  };
  const handleClick = async() => {
    setIsLoading(true)
    if (
      UserData.Email === "" ||
      UserData.Password === "" ||
      UserData.Username === ""
    ) {
      setIsLoading(false)
      return toast.error("Filled is empty");
    }
    try {
      const res = await axios
        .post("http://localhost:3001/auth/register", UserData);
          if (res.data.success) {
            setIsLoading(false)
            toast.success(res.data.message);
            handleToggle();
            SetUserData({
              FirstName: "",
              LastName: "",
              Username: "",
              Email: "",
              Password: "",
            });
          } else {
            setIsLoading(false)
            toast.info(res.data.message);
          }
    } catch (err) {
      setIsLoading(false)
      toast.error(err);
    }
  };

  return (
    <>
      <form>
      {IsLoading ? (
          <div className="spinner"></div>
        ) : (<>
        <input
          type="text"
          placeholder="First Name"
          autoComplete="off"
          name="FirstName"
          value={UserData.FirstName}
          onChange={handleChange}
          required
          className="Login-input"

        />
        <input
          type="text"
          placeholder="Last Name"
          autoComplete="off"
          name="LastName"
          value={UserData.LastName}
          onChange={handleChange}
          className="Login-input"
          required
        />
        <input
          type="text"
          placeholder="Username"
          className="Login-input"
          autoComplete="off"
          name="Username"
          value={UserData.Username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          className="Login-input"
          placeholder="Email"
          autoComplete="off"
          name="Email"
          value={UserData.Email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="Login-input"
          autoComplete="off"
          name="Password"
          value={UserData.Password}
          onChange={handleChange}
          required
        />
        <button type="button" className="Login-btn bg-color-purple-700" onClick={handleClick}>
          Sign Up
        </button>
        </>
        )}
      </form>
    </>

);
};

export default SignUpForm;
