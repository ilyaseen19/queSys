const express = require("express");
const User = require("../../../models/user");
const { _decrypt } = require("../../../libs/encrypt");

const router = express.Router();

router.post("/createUser", async (req, res) => {
  try {
    const { firstName, lastName, userName, passcode, role } = req.body;

    const username = await User.findOne({ userName });

    const pass = await User.findOne({ passcode });

    if (username)
      return res.status(400).json({
        success: 0,
        message: "A user with this name already exist",
        errorCode: 400,
      });

    if (pass)
      return res.status(400).json({
        success: 0,
        message:
          "A user with this passcode already exist, passcode should be unique",
        errorCode: 400,
      });

    const newUser = new User({ firstName, lastName, userName, passcode, role });

    let savedData = await newUser.save();

    if (savedData) {
      const newData = await User.find();

      return res.status(201).json({
        success: 1,
        message: "User created successfully",
        data: newData,
      });
    }

    return res.status(400).json({
      success: 0,
      message: "Could not create user, please try again",
      errorCode: 400,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: 0,
      message: "internal error",
      error: error,
      errorCode: 500,
    });
  }
});

module.exports = router;
