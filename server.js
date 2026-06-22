const express = require("express");

const app = express();

// Middleware
app.use(express.json());

// Store users
let users = [];

// Home route
app.get("/", (req, res) => {
    res.send("Server is running");
});

// GET all users
app.get("/users", (req, res) => {
    res.json(users);
});

// POST user
app.post("/users", (req, res) => {
    const { name } = req.body;

    users.push({
        id: users.length + 1,
        name: name
    });

    res.status(201).json({
        message: "User Added",
        users
    });
});

// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});