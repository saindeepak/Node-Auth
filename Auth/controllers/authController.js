const bcrypt = require("bcryptjs");
const Auth = require("../models/authSchema.js");

function signup_get(req, res) {
  // serve signup page
}

function login_get(req, res) {
  // serve login page
}

async function signup_post(req, res) {
  try {
    const { userName, email, password } = req.body;
    const newUser = Auth({ userName, email, password });    
    await newUser.save();
    
    res.json({
      message: `User registered successfully`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function login_post(req, res) {
  try {
    const { email, password } = req.body;

    const result = await Auth.findOne({ email: email }).select("password");
    if (!result) {
      return res.status(401).json({ error: `Invalid email` });
    }

    const hashedPassword = result.password;
    const passwordMatched = await bcrypt.compare(password, hashedPassword);
    if (!passwordMatched) {
      return res.status(401).json({ error: `Invalid password` });
    }

    res.json({ message: `Authentication successful` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  signup_get,
  login_get,
  signup_post,
  login_post,
};
