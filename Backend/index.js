const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const multer = require("multer");
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversation");
const messagesRoute = require("./routes/messages");
const router = express.Router();
const path = require('path')

dotenv.config();

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/images", express.static(path.join(__dirname, "public/images")))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name)
  }
})

const upload = multer({storage: storage});
app.post("/api/upload", upload.single("file"), (req, res) => {
  try{
    return res.status(200).json("File Uploaded Successfully")
  }catch(err) {
    console.log(err)
  }
})

app.use("/api/user", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/post", postRoute)
app.use("/api/conversations", conversationRoute)
app.use("/api/messages", messagesRoute)

// database connection
const dbURI = process.env.DB_CONNECT;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => {
    app.listen(process.env.PORT);
    console.log("Backend Server is running");
  })
  .catch((err) => console.log(err));