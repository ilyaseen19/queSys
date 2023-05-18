const express = require("express");
const User = require("../../../models/user");

const router = express.Router();

router.patch("/editUser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { role } = req.body;

    const updated = await User.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          role: role,
        },
      }
    );

    if (!updated)
      return res.status(400).json({
        success: 0,
        message: "Could not update user",
        errorCode: 400,
      });

    const users = await User.find();

    return res.status(201).json({
      success: 1,
      message: "User updated successfully",
      data: users,
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
