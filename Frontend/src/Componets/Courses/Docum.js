import React, { useState } from "react";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import AddBox from "@mui/icons-material/AddBox";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Docum({ setselectedDocs, settab }) {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [isloading, setisloading] = useState(true);
  const CourseID = sessionStorage.getItem("CourseID");

  const handlePlus = (prev, next) => {
    sessionStorage.removeItem("subTitle");
    if (next !== null) {
      const sum = prev / 2 + next / 2;
      const ContentID = Math.floor(sum);
      sessionStorage.setItem("ContentID", ContentID);      
      navigate("/editor");
    } else {
      sessionStorage.removeItem("ContentID");
      navigate("/editor");
    }
  };

  const handleNav = (item) => {
    let {subContent,subTitle,ContentID,UserID} = item;
    subContent = subContent.replace(/"/g, "'");
    setselectedDocs({subContent,subTitle,ContentID,UserID});
    settab(true);
  };

  React.useEffect(() => {
    const getData = async () => {
      try {
        let res = await axios.get(
          "http://localhost:3001/auth/getDoc/" + CourseID
        );
        if (res.data) {
          setCourses(res.data);
          setisloading(false);
        }
        if (res.data === "") {
          setisloading(false);
        }
      } catch (err) {
        setisloading(false);
      }
    };

    getData();
  }, [CourseID]);

  return (
    <div style={{ height:"auto",display: "flex", flexDirection: "column", alignItems: "center", marginTop: 50,width:'100%' }}>
      {isloading ? (
        <div className="spinner" />
      ) : courses?.length === 0 ? (
        <div style={{ width: "90%", maxWidth: 800, marginBottom: 20 }}>
        <Card
          sx={{
            width: "100%",
            height: 70,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.2s ease-in-out",
            backgroundColor: "#e0e0eb",
            "&:hover": {
              transform: "scale(1.03)",
            },
            border: "1px solid #ccc",
          }}
        >
          <CardActionArea>
            <CardContent
              sx={{
                cursor: "pointer",
                border: "1px solid transparent",
                transition: "border-color 0.2s ease-in-out",
              }}
            >
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{
                  textAlign: "center",
                  fontSize: 18,
                  fontWeight: "bold",
                  mt: 2,
                  color: "#400080",
                  borderBottom: "1px solid transparent",
                }}
              >
                {"No Documentation Added Yet"}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
                <div
                  onClick={() =>
                    navigate("/editor")
                  }
                  style={{
                    cursor: "pointer",
                    transition: "transform 0.2s ease-in-out",
                    fontSize: "2rem",
                    color: "#9C27B0",
                    "&:hover": {
                      transform: "scale(1.2)",
                    },
                  }}
                >
                  <AddBox />
                </div>
              </div>
        </div>
      ) : (
        courses?.map((item, index) => {
          const nextitem = courses[index + 1];
          return (
            <div key={item._id} style={{ width: "90%", maxWidth: 800, marginBottom: 20 }}>
              <Card
                sx={{
                  width: "100%",
                  height: 70,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 8,
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.2s ease-in-out",
                  backgroundColor: "#e0e0eb",
                  "&:hover": {
                    transform: "scale(1.03)",
                  },
                  border: "1px solid #ccc",
                }}
              >
                <CardActionArea>
                  <CardContent
                    onClick={() => handleNav(item)}
                    sx={{
                      cursor: "pointer",
                      border: "1px solid transparent",
                      transition: "border-color 0.2s ease-in-out",
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{
                        textAlign: "center",
                        fontSize: 18,
                        fontWeight: "bold",
                        mt: 2,
                        color: "#400080",
                        borderBottom: "1px solid transparent",
                      }}
                    >
                      {item.subTitle}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
                <div
                  onClick={() =>
                    handlePlus(
                      item?.ContentID,
                      nextitem?.ContentID ? nextitem?.ContentID : null
                    )
                  }
                  style={{
                    cursor: "pointer",
                    transition: "transform 0.2s ease-in-out",
                    fontSize: "2rem",
                    color: "#9C27B0",
                    "&:hover": {
                      transform: "scale(1.2)",
                    },
                  }}
                >
                  <AddBox />
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
