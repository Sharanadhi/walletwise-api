import express from 'express';
import initKnex from "knex";
import configuration from "../knexfile.js";
import jwt from 'jsonwebtoken';


const knex  = initKnex(configuration);
const router = express.Router();
const secretKey = process.env.SECRET_KEY; 

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ error: "No token provided" });
  }
  const tokenWithoutBearer = token.replace('Bearer ', '');
  jwt.verify(tokenWithoutBearer, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Failed to authenticate token" });
    }
    req.userId = decoded.id;
    next();
  });
};

router.get("/", verifyToken, async (req, res) => {
  const userId = req.userId;
  try {
    const transactions = await knex("transactions")
      .select("transactions.*")
      .where("transactions.user_id", userId);
    res.status(200).json({
      message: "Transactions retrieved successfully",
      transactions
    });
  }
  catch (error) {
    res.status(500).json({ error: "An error occurred while retrieving transactions" });
  }
})

router.get("/counts", verifyToken, async (req, res) => {
  const userId = req.userId;
  try {
    const income_result = await knex("transactions")
      .sum("amount as income")
      .where("type", "Income")
      .andWhere("user_id", userId)
      .first();
    const expense_result = await knex("transactions")
      .sum("amount as expense")
      .where("type", "Expense")
      .andWhere("user_id", userId)
      .first();
    const investment_result = await knex("transactions")
      .sum("amount as investment")
      .where("type", "Investment")
      .andWhere("user_id", userId)
      .first();
    const income = income_result.income;
    const expense = expense_result.expense;
    const investment = investment_result.investment;
    res.status(200).json({
      message: "Total amounts calculated successfully",
      income,
      expense,
      investment
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while calculating total income" });
  }
});

export default router;