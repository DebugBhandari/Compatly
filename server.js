import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mysql from "mysql2/promise";
const app = express();
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import profileRouter from "./router/profileRouter.js";
import metricsRouter from "./router/metricsRouter.js";

// Recreate __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { createUser, findByEmail, findOrCreate } from "./auth-helpers.js";

app.set("port", process.env.PORT || 3003);

// Create a MySQL connection
export const dbConfig = {
  host:
    process.env.NODE_ENV === "production"
      ? process.env.MYSQL_HOST
      : "localhost",
  user: process.env.MYSQL_USER, // Replace with your MySQL username
  password:
    process.env.NODE_ENV === "production"
      ? process.env.MYSQL_PASSWORD
      : "kirk8242", // Replace with your MySQL password
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT
};
app.use(cors());
const intializeDB = async () => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    await connection.query(
      "CREATE DATABASE IF NOT EXISTS wellbeingCompatibility"
    );
    await connection.query(
      `Create table if not exists users (id int primary key auto_increment, 
      fullname varchar(255), email varchar(255), UNIQUE(email), password 
      varchar(255) ,created_at timestamp default current_timestamp, 
      isCompany boolean default false)`
    );

    await connection.query(
      `Create table if not exists metrics (id int primary key auto_increment, 
      user_id INT NOT NULL, FOREIGN KEY (user_id) REFERENCES users(id),
      UNIQUE(user_id) , isCompany boolean, mentalHealthDays ENUM('1','2','3','4','5') 
      NOT NULL, therapyAccess ENUM('1','2','3','4','5') NOT NULL, digitalDetoxDays 
      ENUM('1','2','3','4','5') NOT NULL, gymAccess ENUM('1','2','3','4','5') 
      NOT NULL, wellnessStipend ENUM('1','2','3','4','5') NOT NULL, flexibleHours 
      ENUM('1','2','3','4','5') NOT NULL, workFromHome ENUM('1','2','3','4','5') 
      NOT NULL, unlimitedPto ENUM('1','2','3','4','5') NOT NULL, inclusivity 
      ENUM('1','2','3','4','5') NOT NULL, ecoConciousValues ENUM('1','2','3','4','5') 
      NOT NULL, careerPathClarity ENUM('1','2','3','4','5') NOT NULL, 
      groupBreathworkSessions ENUM('1','2','3','4','5') NOT NULL, created_at 
      timestamp default current_timestamp)`
    );
    await connection.query(
      `CREATE TABLE if not exists swipes 
      (id INT PRIMARY KEY AUTO_INCREMENT, swiper_id INT NOT NULL, 
      swipee_id INT NOT NULL, leftswipe BOOLEAN, compatibility_percentage INT, 
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (swiper_id) 
      REFERENCES users(id), FOREIGN KEY (swipee_id) REFERENCES metrics(user_id), 
      UNIQUE(swiper_id, swipee_id));`
    );
    await connection.end();
    console.log("Database initialized");
    app.listen(app.get("port"), () => {
      console.log(`Example app listening on port ${app.get("port")}`);
    });
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};
intializeDB();

// Middleware to parse JSON requests
app.use(express.json());

// Register a new user
app.post("/register", (req, res) => {
  const { fullname, email, password, isCompany } = req.body;
  findOrCreate(fullname, email, password, isCompany)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error("Error registering user:", err);
      res.status(500).json({ error: "Internal server error" });
    });
});

// Login a user
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  findByEmail(email).then((results) => {
    // Check if the user exists
    if (results.length === 0) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    // Compare the password
    bcrypt.compare(password, results[0].password, (err, isMatch) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      if (!isMatch) {
        res.status(401).json({ error: "Wrong Password" });
        return;
      }

      // Generate a JWT token
      const token = jwt.sign({ email }, "your_secret_key");

      res.json({
        token: token,
        fullname: results[0].fullname,
        email: results[0].email,
        isCompany: results[0].isCompany,
        id: results[0].id
      });
    });
  });
});

// Protected route
app.get("/dashboard", authenticateToken, (req, res) => {
  res.send("Welcome to the dashboard!");
});

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  jwt.verify(token, "your_secret_key", (err, user) => {
    if (err) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }

    req.user = user;
    next();
  });
}

//Routes
//app.use("/profile", profileRouter);
app.use("/metrics", metricsRouter);

if (process.env.NODE_ENV === "production") {
  // Serve static files from the React app
  app.use(
    express.static("wellbeingComp-client/dist", {
      etag: false,
      lastModified: false,
      setHeaders: (res, path) => {
        res.setHeader("Cache-Control", "no-store");
      }
    })
  );

  // Serve the React app for all non-API routes
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "wellbeingComp-client", "dist", "index.html")
    );
  });
}
