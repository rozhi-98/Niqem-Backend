const express = require("express");
const path = require("path");
const User = require("../models/user.js");
const router = express.Router();
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");

router.post("/create-user", upload.single("file"), async (req, res, next) => {
const { name, email, password, address } = req.body;
const userEmail = await User.findOne({ email });

if (userEmail) {
    const filename = req.file.filename;
    const filepath = `uploads/${filename}`;
    fs.unlink(filepath, (err) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "Cannot delete file" });
        } else {
            res.json({ message: "File deleted successfully" });
        }
    });
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

const newUser = await User.create(user);
res.status(201).json({success: true, newUser});

});

module.exports = router;