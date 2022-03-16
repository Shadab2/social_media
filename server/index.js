const express = require("express");
const app = express();
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

const mongoose = require("mongoose");
// helmet provides additional security for incoming http headers request
const helmet = require("helmet");
// dot env to store potentially keys which needs to be classified
const dotenv = require("dotenv");
const morgan = require("morgan");

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

//routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(PORT, () => {
  console.log("Running  on Port ", PORT);
});
