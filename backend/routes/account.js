const express = require("express");
const { authMiddleware } = require("./middleware");
const { Account } = require("../db");
const mongoose = require("mongoose");
const router = express.Router();

router.post("/add", authMiddleware, async (req, res) => {
  const { amount } = req.body;

  if (typeof amount !== "number" || isNaN(amount) || amount <= 0) {
    return res.status(400).json({
      message: "Invalid amount",
    });
  }
  try {
    const account = await Account.findOne({ userId: req.userId });
    if (!account) {
      return res.status(404).json({
        message: "Account not found",
      });
    }
    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: amount } }
    );

    return res.status(200).json({
      message: "Balance added successfully",
    });
  } catch (err) {
    console.error("Error adding balance:", err);
    console.log(err)
    return res.status(500).json({
    message: "Internal server error",
    });
  }
});

router.get("/balance", authMiddleware, async (req, res) => {
  console.log("Balance route hit");

  const account = await Account.findOne({ userId: req.userId });

  if (!account) {
    return res.status(404).json({
      message: "Account not found",
    });
  }

  console.log(account);
  res.status(200).json({
    balance: account.balance,
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  console.log("Transfer route hit");
  const session = await mongoose.startSession();
  session.startTransaction();

  const { amount, to } = req.body;

  if (typeof amount !== "number" || isNaN(amount) || amount <= 0) {
    await session.abortTransaction();
    session.endSession();
    return res.status(400).json({ message: "Invalid transfer amount" });
  }

  if (to === req.userId) {
    await session.abortTransaction();
    session.endSession();
    return res.status(400).json({ message: "Can't transfer to yourself" });
  }

  try {
    const acc = await Account.findOne({ userId: req.userId }).session(session);

    if (!acc || acc.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Invalid account",
      });
    }

    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);

    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    await session.commitTransaction();
    res.json({
      message: "Transfer successful",
    });
  } catch (error) {
    console.error("Transfer error:", error);
    await session.abortTransaction();
    return res.status(500).json({ message: "Internal server error" });
  } finally {
    session.endSession();
  }
});

module.exports = router;
