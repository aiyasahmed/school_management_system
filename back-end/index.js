const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "school_management_system",
});

//Fetch studet data
app.get("/get-students", (req, res) => {
  con.query(
    "SELECT `full_name`, `dob`, `gender`, `address`, `contact`, `guardian` FROM `students`",
    function (err, result, fields) {
      if (err) {
        console.error("Error fetching users:", err);
        res.status(500).send("Error fetching users");
      } else {
        res.send(result.reverse());
      }
    }
  );
});

//Fetch attendance
app.get("/get-attendance", (req, res) => {
  con.query(
    "SELECT `full_name`, `is_present`, `date` FROM `attendance`",
    function (err, result, fields) {
      if (err) {
        console.error("Error fetching users:", err);
        res.status(500).send("Error fetching users");
      } else {
        res.send(result.reverse());
      }
    }
  );
});

app.post("/student_submit", (req, res) => {
  const data = req.body;

  if (
    !data.full_name ||
    !data.dob ||
    !data.gender ||
    !data.address ||
    !data.contact ||
    !data.guardian
  ) {
    return res.status(400).send("All fields are required.");
  }

  const sql = `INSERT INTO students (full_name, dob, gender, address, contact, guardian) 
               VALUES (?, ?, ?, ?, ?, ?)`;

  con.query(
    sql,
    [
      data.full_name,
      data.dob,
      data.gender,
      data.address,
      data.contact,
      data.guardian,
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting data: ", err);
        return res.status(500).send("Error inserting data");
      } else {
        res.status(200).send("Student information saved successfully!");
      }
    }
  );
});

con.connect(function (err) {
  if (err) {
    console.error("DB connection failed:", err);
    throw err;
  } else {
    console.log("DB is connected");
    app.listen(3001, function (err) {
      if (err) {
        console.log("Error in server setup");
      } else {
        console.log("Server listening on Port", 3001);
      }
    });
  }
});
