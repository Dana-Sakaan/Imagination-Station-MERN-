//sign up sign in sign out functions
const validator = require("validator");
const User = require("../models/UserModel.js");
const Newsletter = require('../models/Newsletter.js')
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWTSECRET, {
    expiresIn: process.env.JWTEXPIRATION,
  });
};
const maxAge = 86400000;

const signUp = async (req, res) => {
  const { name, password, email } = req.body;

  try {
    if (!validator.isEmail(email)) {
      return res
        .status(409)
        .json({ success: false, message: "Invalid email!" });
    }

    const userExistence = await User.findOne({ email });

    if (userExistence) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists!" });
    }

    const newUser = await User.create({
      name,
      email,
      password,
    });
    const token = signToken(newUser._id);
    res
      .cookie("jwtAccess", token, { httpOnly: true }, maxAge)
      .status(200)
      .json({ success: true, message: "User Created", newUser });
  } catch (error) {
    console.log(error);
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (
      !validUser ||
      !(await validUser.checkPassword(password, validUser.password))
    ) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = signToken(validUser._id);
    res
      .cookie("jwtAccess", token, { httpOnly: true }, maxAge)
      .status(200)
      .json({ success: true, message: "User logged in", validUser });
  } catch (error) {
    console.log(error);
  }
};

const signOut = async (req, res) => {
  try {
    res.clearCookie("jwtAccess");
    res.json({ success: true, message: "Logged Out successfully" });
  } catch (error) {
    console.log(error);
  }
};

const google = async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await User.findOne(email);
    if (user) {
      //if user exists sign him in else sign up

      const token = signToken(user._id);
      res
        .cookie("jwtAccess", token, { httpOnly: true }, maxAge)
        .status(200)
        .json({ success: true, message: "User logged in", user });
    } else {
      const password =
        Math.random().toString(36).slice(8) +
        Math.random().toString(36).slice(8);
      const user = await User.create({
        name,
        email,
        password,
      });
      const token = signToken(user._id);
      res
        .cookie("jwtAccess", token, { httpOnly: true }, maxAge)
        .status(200)
        .json({ success: true, message: "User Created", user });
    }
  } catch (error) {
    console.log(error);
  }
};

const subsribeNews = async (req,res)=>{
  try {
    const email = req.body.email
    const emailCheck = await Newsletter.findOne({email})
    if(emailCheck){
      return res.status(201).json({message:"Email already exists"})
    }
    const newSubscriber = await Newsletter.create({email})
    return res.status(200).json({message:"Subscribed Successfully"})
  } catch (error) {
    console.log(error)
  }
}

module.exports = { signUp, signIn, signOut, google,subsribeNews };
