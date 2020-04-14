var express = require("express");
var router = express.Router();
var User = require("../models/User");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
/* GET users listing. */
router.get("/paginate", async function (req, res, next) {
  try {
    let params = req.query;
    if (!params || !params.page || !params.limit) {
      res.json({
        status: "E",
        message: "Required params are missing",
      });
    }
    params.page = parseInt(params.page);
    params.limit = parseInt(params.limit);
    let users = await User.find({})
      .skip((params.page - 1) * params.limit)
      .limit(params.limit);
    console.log("users", users);
    res.json({
      status: "S",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "E",
      message: "Failed to fetch data",
    });
  }
});
router.post("/create", async function (req, res, next) {
  try {
    let params = req.body;
    console.log(params);
    var user = new User(params);
    let addOperation = await user.save();
    res.json({
      status: "S",
      data: addOperation,
    });
  } catch (error) {
    res.json({
      status: "E",
      message: "Failed to fetch data",
      data: error,
    });
  }
});
router.put("/:userId", async function (req, res, next) {
  try {
    let params = req.params;
    let user = req.body;
    console.log(params, user);
    let updateOperation = await User.updateOne({ _id: params.userId }, user);
    if (updateOperation && updateOperation.ok) {
      res.json({
        status: "S",
        data: updateOperation,
      });
    } else {
      res.json({
        status: "E",
        message: "Failed to fetch data",
        data: error,
      });
    }
  } catch (error) {
    res.json({
      status: "E",
      message: "Failed to fetch data",
      data: error,
    });
  }
});
router.get("/:userId", async function (req, res, next) {
  try {
    let params = req.params;
    let user = await User.findById(params.userId);
    if (user) {
      res.json({
        status: "S",
        data: user,
      });
    } else {
      res.json({
        status: "E",
        message: "Failed to fetch data",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: "E",
      message: "Failed to fetch data",
      data: error,
    });
  }
});
router.delete("/:userId", async function (req, res, next) {
  try {
    let params = req.params;
    let user = await User.deleteOne({ _id: params.userId });
    if (user && user.ok) {
      res.json({
        status: "S",
        data: "User Succesfuly deleted",
      });
    } else {
      res.json({
        status: "E",
        message: "Failed to remove data",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: "E",
      message: "Failed to remove data",
      data: error,
    });
  }
});
module.exports = router;
