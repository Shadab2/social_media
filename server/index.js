const express = require("express");
const app = express();
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const path = require("path");

const mongoose = require("mongoose");
// helmet provides additional security for incoming http headers request
const helmet = require("helmet");
// dot env to store potentially keys which needs to be classified
const dotenv = require("dotenv");
const morgan = require("morgan");
// multer provides storage and upload options in server
const multer = require("multer");

dotenv.config();
mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("MongoDB connected");
  }
);

const PORT = 8000 | process.env.PORT;

//middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// serve static files from the server at desired paths
app.use(
  "/images",
  express.static(path.join(__dirname + "/public/images"), {
    setHeaders: function (res, path) {
      res.set("Cross-Origin-Resource-Policy", "cross-origin");
    },
  })
);

//routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

//store files in the server itself
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    res.status(200).json("File uploaded succesfully");
  } catch (e) {
    console.log(e);
    res.status(500).send({});
  }
});

app.listen(PORT, () => {
  console.log("Running  on Port ", PORT);
});
