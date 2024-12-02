import express from 'express';
import initKnex from "knex";
import configuration from "../knexfile.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const knex  = initKnex(configuration);
const router = express.Router();
const secretKey = process.env.SECRET_KEY; 

// Sign-Up API
router.post("/signup", async (req, res) => {
  console.log("signup");
  const { full_name, email, phone_number, password } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await knex("users").where({ email }).orWhere({ phone_number }).first();

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ error: "Email is already registered",type:"email" });
      } else if (existingUser.phone_number === phone_number) {
        return res.status(400).json({ error: "Phone number is already registered",type:"phone" });
      }
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user
    const [newUser] = await knex('users').insert({ 
      full_name, 
      email,
      phone_number, 
      password: hashedPassword, 
      created_at: knex.fn.now() 
      }).returning('*');

    // Generate JWT token
    const token = jwt.sign({ id: newUser.id, email: newUser.email }, secretKey, {
      expiresIn: "1h" // Token expiry time
    });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: newUser
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "An error occurred during sign-up" });
  }
});

export default router;
