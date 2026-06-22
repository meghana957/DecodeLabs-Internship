const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database
const db = new sqlite3.Database("./users.db", (err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log("Database Connected");
    }
});

// Create Table
db.run(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
)
`);

// Home Route
app.get("/", (req, res) => {
    res.send("Server Running");
});

// Get Users
app.get("/users", (req, res) => {

    db.all(
        "SELECT * FROM users",
        [],
        (err, rows) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.json(rows);

        }
    );

});

// Add User
app.post("/users", (req, res) => {

    const { name } = req.body;

    if (!name) {
        return res.status(400).json({
            message: "Name is required"
        });
    }

    db.run(
        "INSERT INTO users(name) VALUES(?)",
        [name],

        function (err) {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.status(201).json({
                message: "User Added",
                id: this.lastID,
                name
            });

        }
    );

});

// Start Server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});