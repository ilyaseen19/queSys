const express = require("express");
const Customer = require("../../../models/customer");

const router = express.Router();

router.patch("/addToQue/:_id", async (req, res) => {
  try {
    const transactionType = req.body.transactionType;
    const _id = req.params._id;

    const customer = await Customer.findOne({ _id: _id });

    let qData = { transactionType };

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
      var today = [];

      newData.forEach((customer) => {
        let tdy = customer.queData.filter(
          (que) =>
            new Date(que.createdAt).toLocaleDateString() === new Date().toLocaleDateString()
        );
        if (tdy.length !== 0) {
          today.push(customer);
        }
      });

      return res.status(201).json({
        success: 1,
        message: "Data created successfully",
        data: newData,
        que: today,
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
