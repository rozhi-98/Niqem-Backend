const express = require("express");
const path = require("path");
const User = require("../models/user.js");
const router = express.Router();
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");

router.post("/create-user", upload.single("file"), async (req, res, next) => {
const { name, email, password, address } = req.body;
const userEmail = await User.findOne({ email });

if (userEmail) {
    return next(new ErrorHandler("Email already exists", 400));
}

const filename = req.file.filename;
const fileUrl = path.join(filename);
const user = {
    name: name,
    email: email,
    password: password,
    avatar: fileUrl,
};

console.log(user);
});

module.exports = router;