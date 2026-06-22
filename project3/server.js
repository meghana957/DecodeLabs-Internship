const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Create database
const db = new sqlite3.Database("./users.db");

// Create table
db.run(`
CREATE TABLE IF NOT EXISTS users (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL
)
`);

// Home route
app.get("/", (req, res) => {
res.send("Server Running");
});

// Get all users
app.get("/users", (req, res) => {
db.all("SELECT * FROM users", [], (err, rows) => {

if (err) {
return res.status(500).json({
error: err.message
});
}

res.json(rows);

});

});

// Add user
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

// Start server
app.listen(3000, () => {
console.log("Server running on port 3000");
});