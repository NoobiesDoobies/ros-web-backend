const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
require("dotenv").config();


const bodyParser = require("body-parser")
const apiRobotRouter = require("./routes/robot-router.js")

const HttpError = require("./models/http-error");
const port = 5000;




// Handle CORS error
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    ); // Allow these headers
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    next();
});
app.use(bodyParser.json());

app.use("/api/robot/vision", apiRobotRouter)


// Handle unsupported routes
app.use((req, res, next) => {
    const error = new HttpError("Could not find this route.", 404);
    throw error;
});

// Error handler middleware
app.use((error, req, res, next) => {
    // Delete file if error occurs
    if (req.file) {
        fs.unlink(req.file.path, (err) => {
        });
    }

    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || "An unknown error occurred!" });
});


app.listen(port, () => {
    console.log(`server on http://${process.env.ADDRESS}:${process.env.PORT}`)
})