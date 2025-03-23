import express from "express";
import { connect, model, Schema } from "mongoose";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { memoryStorage } from "multer";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import axios from "axios";

dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const courseChats = {};

function joinCourseChat(socket, courseId) {
  socket.join(courseId);
  if (!courseChats[courseId]) {
    courseChats[courseId] = { users: new Set(), messages: [] };
  }
  courseChats[courseId].users.add(socket.id);
}

io.on("connection", (socket) => {
  socket.on("join_course", (courseId) => {
    joinCourseChat(socket, courseId);
  });

  socket.on("send_message", (data) => {
    const { courseId, messageData } = data;
    socket.to(courseId).emit("receive_message", messageData);
    if (!courseChats[courseId]) {
      courseChats[courseId] = { users: new Set(), messages: [] };
    }
    courseChats[courseId].messages.push(messageData);
  });

  socket.on("disconnect", () => {
    console.log("user Disconnected");
  });
});

try {
  connect(process.env.MONGO_DB)
    .then(console.log("DB Connected"))
    .catch((err) => console.log("Error in url: ", err));
} catch (error) {
  console.log("DB not Connected");
}
const userSchema = new Schema(
  {
    Username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
      match: /^([\w-\.]+)@([\w-\.]+)\.([a-zA-Z]{2,5})$/,
      trim: true,
    },
    Password: {
      type: String,
      required: true,
    },
    FirstName: { type: String },
    LastName: { type: String },
  },
  {
    timestamps: true,
  },
  { versionKey: false },
  { strict: false }
);

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageLink: {
      type: String,
      trim: true,
    },
    userID: { type: String },
    userName: { type: String },
  },
  { timestamps: true },
  { versionKey: false },
  { strict: false }
);

const VideoSchema = new Schema(
  {
    UserID: { type: String },
    ReqID: { type: String },
    CourseID: { type: String },
    VideoTitle: { type: String },
    VideoDesc: { type: String },
    VideoLink: { type: String },
    Status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true },
  { versionKey: false },
  { strict: false }
);

const NotesSchema = new Schema(
  {
    UserID: { type: String },
    ReqID: { type: String },
    CourseID: { type: String },
    NotesTitle: { type: String },
    NotesDesc: { type: String },
    NotesLink: { type: String },
    Status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true },
  { versionKey: false },
  { strict: false }
);

const ProjectSchema = new Schema(
  {
    UserID: { type: String },
    ReqID: { type: String },
    CourseID: { type: String },
    ProjectTitle: { type: String },
    ProjectDesc: { type: String },
    GitRepoLink: { type: String },
  },
  { timestamps: true },
  { versionKey: false },
  { strict: false }
);

const DocumentationSchema = new Schema(
  {
    UserID: { type: String },
    ReqID: { type: String },
    CourseID: { type: String },
    subTitle: { type: String },
    subContent: { type: String },
    ContentID: { type: String },
    Version: { type: Number, default: 1 },
    Status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true },
  { versionKey: false },
  { strict: false }
);

const EnrollFavSchema = new Schema(
  {
    UserID: { type: String },
    CourseID: { type: String },
  },
  { timestamps: true },
  { versionKey: false },
  { strict: false }
);

const User = model("Users", userSchema);
const Course = model("Course", courseSchema);
const Documentation = model("Documentation", DocumentationSchema);
const Videos = model("Videos", VideoSchema);
const Projects = model("Projects", ProjectSchema);
const Notes = model("Notes", NotesSchema);
const EnrollFav = model("EnrollFav", EnrollFavSchema);

app.post("/auth/login", (req, res) => {
  try {
    const { Data, Password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9_]+$/;

    let dataType, query;

    if (emailRegex.test(Data)) {
      dataType = "Email";
      query = { Email: Data };
    } else if (usernameRegex.test(Data)) {
      dataType = "Username";
      query = { Username: Data };
    }

    User.findOne({ $and: [query, { Password }] })
      .then((item) => {
        if (item !== null) {
          res.send({
            message: "Login Successfully",
            data: item,
            success: true,
          });
        } else {
          res.send({
            message: "Password Incorrect",
            success: false,
          });
        }
      })
      .catch((err) => {
        res.send({ message: "Please Try Again", success: false });
      });
  } catch {
    res.send({ message: "Customer Login Failed", success: false });
  }
});

const isEmailAlreadyInUse = async (email) => {
  const existingUser = await User.findOne({ Email: email });
  return !!existingUser;
};
const isUsernameAlreadyInUse = async (Username) => {
  const existingUser = await User.findOne({ Username: Username });
  return !!existingUser;
};

app.post("/auth/register", async (req, res) => {
  try {
    const { FirstName, LastName, Username, Email, Password } = req.body;
    const emailInUse = await isEmailAlreadyInUse(Email);
    if (emailInUse) {
      return res.send({ message: "Email already in use", success: false });
    }
    const UsernameInUse = await isUsernameAlreadyInUse(Username);
    if (UsernameInUse) {
      return res.send({ message: "Username already in use", success: false });
    }

    const users = new User({
      FirstName,
      LastName,
      Username,
      Email,
      Password,
    });

    users
      .save()
      .then((item) => {
        res.send({ message: "User Registered", data: item, success: true });
      })
      .catch((err) => {
        console.log(err);
        res.send({ message: "Try Again", success: false });
      });
  } catch {
    res.send({ message: "Register Failed", success: false });
  }
});

app.get("/auth/getUsername/:id", async (req, res) => {
  const { id } = req.params;
  User.findOne({ _id: id })
    .then((resp) => {
      res.send(resp.Username);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/auth/getProfile/:id", async (req, res) => {
  const { id } = req.params;
  User.find({ Username: id })
    .then((resp) => {
      res.send(resp);
    })
    .catch((err) => {
      res.send(err);
    });
});

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

const storage = memoryStorage();
const upload = multer({ storage: storage });

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

const isCourseAlreadyInUse = async (title, userID) => {
  const existingUser = await Course.findOne({ title, userID });
  return !!existingUser;
};

app.post("/auth/addCourse", upload.single("imageLink"), async (req, res) => {
  try {
    const { title, description, userID, userName } = req.body;

    const titleInTitleCase = toTitleCase(title);

    const courseInUse = await isCourseAlreadyInUse(titleInTitleCase, userID);
    if (courseInUse) {
      return res.send({ message: "Course already Exist", success: false });
    }
    const imageFile = req.file;

    const imageBase64String = imageFile.buffer.toString("base64");
    let constructedString =
      "data:" + imageFile.mimetype + ";" + "base64," + imageBase64String;
    const imageResult = await cloudinary.uploader.upload(constructedString, {
      folder: "Techbuddies",
      public_id: "Course_" + Date.now() + "_image",
    });

    const imageLink = imageResult.secure_url;
    const addCourse = new Course({
      title: titleInTitleCase,
      description,
      imageLink,
      userID,
      userName,
    });

    addCourse
      .save()
      .then((item) => {
        res.send({ message: "Course Added", data: item, success: true });
      })
      .catch((err) => {
        console.log(err);
        res.send({ message: "Please Try Again", success: false });
      });
  } catch (err) {
    res.send({ message: "Course Can't Added", success: false });
  }
});

app.post("/auth/addVideo", upload.single("VideoLink"), async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .send({ message: "No file uploaded", success: false });
    }

    const { UserID, ReqID, VideoTitle, VideoDesc, CourseID, Status } = req.body;

    const videoFile = req.file;

    if (!videoFile.buffer) {
      return res
        .status(400)
        .send({ message: "File buffer is missing", success: false });
    }

    const videoBase64String = videoFile.buffer.toString("base64");
    const constructedVideoString =
      "data:" + videoFile.mimetype + ";base64," + videoBase64String;

    const videoResult = await cloudinary.uploader.upload(
      constructedVideoString,
      {
        resource_type: "video",
        folder: "Techbuddies",
        public_id: "Course_" + Date.now() + "_video",
      }
    );

    const VideoLink = videoResult.secure_url;
    const addVideos = new Videos({
      UserID,
      ReqID,
      VideoTitle,
      VideoDesc,
      CourseID,
      VideoLink,
      Status,
    });

    const savedVideo = await addVideos.save();

    res
      .status(200)
      .send({ message: "Video Added", data: savedVideo, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "An error occurred", success: false });
  }
});

app.post("/auth/addNotes", upload.single("NotesLink"), async (req, res) => {
  try {
    const { UserID, ReqID, NotesTitle, NotesDesc, CourseID, Status } = req.body;

    const notesLink = req.file;

    if (!notesLink) {
      return res.status(400).send("Notes files are required.");
    }

    const videoBase64String = notesLink.buffer.toString("base64");
    let constructedVideoString =
      "data:" + notesLink.mimetype + ";" + "base64," + videoBase64String;

    const videoResult = await cloudinary.uploader.upload(
      constructedVideoString,
      {
        resource_type: "raw",
        folder: "Techbuddies",
        public_id: "Course_pdf_" + Date.now() + ".pdf",
      }
    );
    const NotesLink = videoResult.secure_url;

    const addNotes = new Notes({
      UserID,
      ReqID,
      NotesTitle,
      NotesDesc,
      CourseID,
      NotesLink,
      Status,
    });

    addNotes
      .save()
      .then((item) => {
        console.log(item);
        res.send({ message: "Notes Added", data: item, success: true });
      })
      .catch((err) => {
        console.log(err);
        res.send({ message: "Please Try Again", success: false });
      });
  } catch (err) {
    console.log(err);
    res.send({ message: "Notes Can't Added", success: false });
  }
});
app.post("/auth/addProject", async (req, res) => {
  try {
    const {
      UserID,
      ReqID,
      ProjectTitle,
      ProjectDesc,
      GitRepoLink,
      CourseID,
      Status,
    } = req.body;
    console.log(req.body);
    const addProject = new Projects({
      UserID,
      ReqID,
      ProjectTitle,
      ProjectDesc,
      GitRepoLink,
      CourseID,
      Status,
    });
    addProject
      .save()
      .then((item) => {
        console.log(item);
        res.send({ message: "Project Added", data: item, success: true });
      })
      .catch((err) => {
        console.log(err);
        res.send({ message: "Please Try Again", success: false });
      });
  } catch (err) {
    res.send({ message: "Project Can't Added", success: false });
  }
});

app.get("/auth/getAllCourse", (req, res) => {
  try {
    Course.find({})
      .then((item) => {
        res.send({ data: item });
      })
      .catch((err) => {
        res.send("Can't Find Course");
      });
  } catch (err) {
    console.log(err);
    res.send("db error");
  }
});

app.get("/auth/getCourse/:id", (req, res) => {
  try {
    const { id } = req.params;
    Course.find({ userID: id })
      .then((item) => {
        res.send({ data: item });
      })
      .catch((err) => {
        res.send("Can't Find Course");
      });
  } catch {
    res.send("db error");
  }
});

app.get("/auth/getAllCourse/:id", (req, res) => {
  try {
    const { id } = req.params;
    Course.find({ userId: id })
      .then((item) => {
        res.send({ data: item });
      })
      .catch((err) => {
        res.send("Can't Find Course");
      });
  } catch {
    res.send("db error");
  }
});

// app.delete("/auth/DeleteCourse/:id", (req, res) => {
//   try {
//     const { id } = req.params;
//     Course.deleteOne({ _id: id })
//       .then((item) => {
//         res.send({ data: item });
//       })
//       .catch((err) => {
//         res.send("Can't Find Delete");
//       });
//   } catch {
//     res.send("db error");
//   }
// });

app.post("/auth/addDoc", async (req, res) => {
  const { UserID, ReqID, CourseID, subTitle, subContent, ContentID, Status } =
    req.body;

  const Documentations = new Documentation({
    UserID,
    ReqID,
    CourseID,
    subTitle,
    subContent,
    ContentID,
    Status,
  });

  Documentations.save()
    .then(() => {
      res.send({ message: "Documentation added successfully" });
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
});

app.post("/auth/updateDoc", async (req, res) => {
  try {
    let {
      UserID,
      ReqID,
      CourseID,
      subTitle,
      subContent,
      ContentID,
      Status,
      Version,
    } = req.body;
    Version = parseInt(Version) + 1;

    let updatedDoc = await Documentation.findByIdAndUpdate(
      CourseID,
      {
        UserID: UserID,
        ReqID: ReqID,
        CourseID: CourseID,
        subTitle: subTitle,
        subContent: subContent,
        ContentID: ContentID,
        Status: Status,
        Version: Version,
      },
      { new: true } // To return the updated document
    );
    res
      .status(200)
      .json({ message: "Documentation Status Updated", updatedDoc });
  } catch (error) {
    console.error("Error in updateAcceptOrder:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/auth/getDoc/:id", async (req, res) => {
  const { id } = req.params;
  Documentation.find({ CourseID: id, Status: { $eq: "Accepted" } })
    .sort({ ContentID: 1 })
    .then((resp) => {
      res.send(resp);
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
});

app.post("/UpdateStatus", async (req, res) => {
  const { id, ContentID, Statusmsg } = req.body;
  try {
    await Documentation.updateOne(
      { ContentID: ContentID, Status: "Accepted" },
      { Status: "Pending" }
    );
    await Documentation.updateOne({ _id: id }, { Status: Statusmsg });
    res.send({ message: "Update Successfully" });
  } catch (err) {
    res.send({ message: "Can't Update Product" });
  }
});

app.post("/UpdateStatus/video", (req, res) => {
  const { id, Statusmsg } = req.body;
  try {
    Videos.updateOne({ _id: id }, { Status: Statusmsg })
      .then((item) => {
        res.send({ message: "Update Successfully" });
      })
      .catch((err) => {
        res.send({ message: "Can't Update Product" });
      });
  } catch {
    res.send("db error");
  }
});

app.post("/UpdateStatus/note", (req, res) => {
  const { id, Statusmsg } = req.body;
  try {
    Notes.updateOne({ _id: id }, { Status: Statusmsg })
      .then((item) => {
        res.send({ message: "Update Successfully" });
      })
      .catch((err) => {
        res.send({ message: "Can't Update Product" });
      });
  } catch {
    res.send("db error");
  }
});

app.get("/auth/getDocs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    Documentation.find({ ReqID: id })
      .then((item) => {
        res.send({ data: item });
      })
      .catch((err) => {
        res.send("Can't Find Course");
      });
  } catch {
    res.send("db error");
  }
});

app.get("/auth/getGraph/:id", async (req, res) => {
  try {
    const { id } = req.params;
    Documentation.find({ UserID: id })
      .then((item) => {
        res.send({ data: item });
      })
      .catch((err) => {
        res.send("Can't Find Course");
      });
  } catch {
    res.send("db error");
  }
});

app.get("/auth/getVideo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    Videos.find({ ReqID: id })
      .then((item) => {
        res.send({ data: item });
      })
      .catch((err) => {
        res.send("Can't Find Course");
      });
  } catch {
    res.send("db error");
  }
});

app.get("/auth/getVideos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    Videos.find({ CourseID: id, Status: { $eq: "Accepted" } })
      .then((item) => {
        res.send({ data: item });
      })
      .catch((err) => {
        res.send("Can't Find Course");
      });
  } catch {
    res.send("db error");
  }
});

app.get("/auth/getNote/:id", async (req, res) => {
  try {
    const { id } = req.params;
    Notes.find({ ReqID: id })
      .then((item) => {
        res.send({ data: item });
      })
      .catch((err) => {
        res.send("Can't Find Course");
      });
  } catch {
    res.send("db error");
  }
});
app.get("/auth/getNotes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    Notes.find({ CourseID: id, Status: { $eq: "Accepted" } })
      .then((item) => {
        res.send({ data: item });
      })
      .catch((err) => {
        res.send("Can't Find Course");
      });
  } catch {
    res.send("db error");
  }
});

app.get("/auth/getProject/:id", async (req, res) => {
  try {
    const { id } = req.params;
    Projects.find({ ReqID: id })
      .then((item) => {
        res.send({ data: item });
      })
      .catch((err) => {
        res.send("Can't Find Course");
      });
  } catch {
    res.send("db error");
  }
});
app.get("/auth/getProjects/:id", async (req, res) => {
  try {
    const { id } = req.params;
    Projects.find({ CourseID: id })
      .then((item) => {
        res.send({ data: item });
      })
      .catch((err) => {
        res.send("Can't Find Course");
      });
  } catch {
    res.send("db error");
  }
});

const isEnrollFavAlreadyInUse = async (UserID, CourseID) => {
  const existingUser = await EnrollFav.findOne({
    $and: [{ UserID }, { CourseID }],
  });
  return !!existingUser;
};

app.post("/auth/addFav", async (req, res) => {
  try {
    const { UserID, CourseID } = req.body;

    const emailInUse = await isEnrollFavAlreadyInUse(UserID, CourseID);
    if (emailInUse) {
      return res.send({ message: "Already Added", success: false });
    }

    const addFav = new EnrollFav({
      UserID,
      CourseID,
    });

    addFav
      .save()
      .then((item) => {
        res.send({ message: "Favorite Enrolled", data: item, success: true });
      })
      .catch((err) => {
        console.log(err);
        res.send({ message: "Please Try Again", success: false });
      });
  } catch (err) {
    res.send({ message: "Favorite Can't Added", success: false });
  }
});

app.delete("/auth/removeFav", async (req, res) => {
  try {
    const { UserID, CourseID } = req.body;
    EnrollFav.deleteOne({ UserID, CourseID })
      .then((result) => {
        if (result.deletedCount === 1) {
          res.send({
            message: "Favorite unEnrolled",
            data: result,
            success: true,
          });
        } else {
          res
            .status(404)
            .send({ message: "No matching enrollment found", success: false });
        }
      })
      .catch((error) => {
        console.error("Error occurred while unenrolling:", error);
        res
          .status(500)
          .send({ message: "Internal Server Error", success: false });
      });
  } catch (error) {
    console.error(
      "Error occurred while processing unenrollment request:",
      error
    );
    res.status(400).send({ message: "Bad Request", success: false });
  }
});

app.get("/auth/getEnrolledFav/:id", async (req, res) => {
  try {
    const { id } = req.params;
    EnrollFav.find({ UserID: id })
      .then((item) => {
        res.send({ data: item });
      })
      .catch((err) => {
        console.log(err);
        res.send({ message: "Please Try Again" });
      });
  } catch (err) {
    res.send({ message: "Favorite Can't get" });
  }
});

app.get("/Prayatna", async (req, res) => {
  let resp = await axios.post("http://13.48.136.54:8000/api/api-code/", null, {
    headers: {
      Authorization: "Bearer e4a9240c-9d92-4f06-a32b-5b1533fcf27d",
      "Content-Type": "application/json",
    },
  });
  res.send(resp.data);
});

app.listen(PORT, function () {
  console.log("Backend is running on Port: " + PORT);
});

server.listen(3002, () => {
  console.log("SERVER RUNNING");
});
