const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./config/database");

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
app.use(express.json());
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});