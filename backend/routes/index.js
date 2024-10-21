const express = require("express");
const UserRouter = require('./user');
const Accountrouter= require('./account')

const router = express.Router();
router.use("/user", UserRouter);  // /api/v1/user
router.use("/account",Accountrouter )

module.exports = router;
