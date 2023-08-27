const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./models/db");
// const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "../client/public/upload");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// app.post("/api/upload", upload.single("file"), (req, res) => {
//   const file = req.file;
//   res.status(200).json(file.filename);
// });
// Import Routers
const usersRouter = require("./routes/user");
const rolesRouter = require("./routes/role");
const postRouter = require("./routes/post");
const multer = require("multer");

app.use("/users", usersRouter);
app.use("/roles", rolesRouter);

app.use("/post", postRouter);

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
