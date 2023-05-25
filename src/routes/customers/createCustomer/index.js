const express = require("express");
const Customer = require("../../../models/customer");

const router = express.Router();

router.post("/createCustomer", async (req, res) => {
  try {
    const data = req.body;

    const customer = new Customer(data);

    let savedData = await customer.save();

    if (savedData) {
      const newData = await Customer.find();
      var today = [];

      newData.forEach((customer) => {
        let tdy = customer.queData.filter(
          (que) =>
            new Date(que.createdAt).toLocaleDateString() ===
            new Date().toLocaleDateString()
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
