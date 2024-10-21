require('dotenv').config();
const express = require("express");
const z = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("./middleware");

const router = express.Router();

const UserSchema = z.object({
  username: z.string().email(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});

router.post("/signup", async (req, res) => {
  console.log("Signup route hit");
  console.log(req.body);
  const body = UserSchema.safeParse(req.body);
  console.log(body);

  if (!body.success) {
    return res.status(400).json({
      message: "Incorrect inputs",
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.status(411).json({
      message: "User already exists",
    });
  }

  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  const userId = user._id;

  try {
    await Account.create({
      userId,
      balance: 1 * Math.random() * 1000,  
    });
    console.log("Account cretaed suucessfluuy")
  } catch (error) {
    console.error("Error creating account: ", error);
    return res.status(500).json({
      message: "Account creation failed",
      error: error.message,
    });
  }
  

  const token = jwt.sign({ userId }, process.env.JWT_SECRET);

  res.json({
    message: "User created successfully",
    token,
  });
});

const usersignin = z.object({
  username: z.string().email(),
  password: z.string(),
});
router.post("/signin", async (req, res) => {
  const body = usersignin.safeParse(req.body);

  if (!body.success) {
    res.status(411).json({
      message: "Invalid credentials",
    });
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET
    );
    res.json({
      token: token,
    });
    return;
  }

  res.status(411).json({
    message: "Error while logging in",
  });
});

const updateSchma = z.object({
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});
router.put("/", authMiddleware, async (req, res) => {
  const body = updateSchma.safeParse(req.body);
  if (!body.success) {
    res.status(411).json({ message: "Error while updating information" });
  }

  await User.updateOne(req.body, {
    _id: req.userId,
  });
  res.json({
    message: "Updated successfully",
  });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: { $regex: filter },
      },
      {
        lastName: { $regex: filter },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
