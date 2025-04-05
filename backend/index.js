const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const dbConnect = require("./config/database");
const auth = require("./routes/AuthRoutes");
const users = require("./routes/UserRoutes");
const employeeDetails = require("./routes/EmployeeDetails");
const employee = require("./routes/EmployeeRoutes");
const departments = require("./routes/DepartmentRoutes");
const ministries = require("./routes/MinistryRoutes")

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;


const corsOptions = {
  origin: "http://localhost:3000", 
  credentials: true, 
  methods: ["GET", "POST", "PUT", "DELETE"], 
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

dbConnect();
app.use(cors(corsOptions));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(cookieParser());


app.use("/api", auth);
app.use("/api", users);
app.use("/api", employeeDetails);
app.use("/api", employee);
app.use("/api", departments);
app.use("/api", ministries);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});