const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();
const httpServer = createServer(app);

const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config/index");
const connectDB = require("./config/db");

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  // optionSuccessStatus: 200,
};

//middleware
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(cors());

const io = new Server(httpServer, {
  cors: {
    allowedHeaders: [
      "X-ACCESS_TOKEN",
      "Access-Control-Allow-Origin",
      "Authorization",
      "Origin",
      "x-requested-with",
      "Content-Type",
      "Content-Range",
      "Content-Disposition",
      "Content-Description",
    ],
    credentials: false,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: "*",
    //  [
    //   // "http://macog.local:5001",
    //   "http://localhost:3000",
    //   // "https://app.foo.com",
    //   "http://192.168.43.233:3000",
    // ],
    preflightContinue: false,
  },
});

// my middleware
const UploadData = require("./routes/customers/uploadData");
const getAllCustomers = require("./routes/customers/fetchCustomers");
const createCustomer = require("./routes/customers/createCustomer");
const addToQue = require("./routes/customers/addToQue");
const createUser = require("./routes/users/createUser");
const login = require("./routes/users/login");
const editUser = require("./routes/users/editUser");
const deleteUser = require("./routes/users/deleteUser");

// end points
app.use("/api/", UploadData);
app.use("/api/", getAllCustomers);
app.use("/api/", createCustomer);
app.use("/api/", addToQue);
app.use("/api/", createUser);
app.use("/api/", login);
app.use("/api/", editUser);
app.use("/api/", deleteUser);

app.get("/", (req, res) => {
  res.json({
    message:
      "Hello Welcome to path way que api! written by ilyaseen19(Abdallah)",
  });
});

io.on("connection", (socket) => {
  //registering all connected customers with userId
  socket.on("init", (userId) => {
    // console.log(userId);
  });
});

// mongoose database connection
connectDB();

const PORT = config.server.port;
httpServer.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
