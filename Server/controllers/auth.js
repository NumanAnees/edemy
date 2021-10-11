import User from "../models/user";
import { hashPassword, comparePassword } from "../utils/auth";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //validation
    if (!name) return res.status(400).send("Name is required");
    if (!password || password.length < 6) {
      return res
        .status(400)
        .send("password is required and should be minimum 6 characters long");
    }
    let UserExist = await User.findOne({ email }).exec();
    if (UserExist) return res.status(400).send("Email is taken");

    //hash password
    const hashedPassword = await hashPassword(password);
    //register
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. try again...");
  }
};

export const login = async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password } = req.body;
    //check if db has user with same email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).send("Wrong Credentials");
    }
    //check passwords
    const match = await comparePassword(password, user.password);

    //create Jwt
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    //return token and user to client,excluding hashed password
    user.password = undefined;
    //send token in cookie
    res.cookie("token", token, {
      httpOnly: true,
    });
    //send user as json response
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error, try again...");
  }
};
