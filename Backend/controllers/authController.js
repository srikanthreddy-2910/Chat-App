import bcrypt from "bcryptjs";
import { generateToken } from "../utils/utils.js";
import User from "../models/user.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  console.log(fullName);
  console.log(email);
  console.log(password);
  try {
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 8 characters" });
    }
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "email already exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    console.log(hashPassword);
    const newUser = new User({
      fullName: fullName,
      email: email,
      password: hashPassword,
    });

    if (newUser) {
      generateToken(newUser._id);
      await newUser.save();

      res.this.status(200).json({
        _id: newUser._id,
        fullName: fullName,
        email: email,
        password: hashPassword,
      });
    } else {
      res.status(400).json({ message: "invalid user dataa" });
    }
  } catch (error) {
    console.log("internal server errorr", error.message);
    res.status(500).json({ message: "internal server errorr" });
  }
};

export const login = (req, res) => {
  res.send("login route");
};

export const logout = (req, res) => {
  res.send("logout route");
};
