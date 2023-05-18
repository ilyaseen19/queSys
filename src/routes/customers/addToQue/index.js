const express = require("express");
const Customer = require("../../../models/customer");

const router = express.Router();

router.post("/addToQue", async (req, res) => {
  try {
    const data = req.body;

    const customer = await Customer.findOne({ _id: data._id });

    let qData = { transactionType: data.transactionType };

    let newQ = [...customer.queData, qData];

    let updated = await Customer.updateOne(
      { _id: customer._id },
      {
        $set: {
          queData: newQ,
        },
      }
    );

    if (updated) {
      const newData = await Customer.find();
      res.status(201).json({
        success: 1,
        message: "Data created successfully",
        data: newData,
      });
    }

    return res.status(400).json({
      success: 0,
      message: "Could not save data, please try again",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: 0,
      message: "internal error",
      error: error,
    });
  }
});

module.exports = router;
