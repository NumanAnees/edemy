import User from "../models/user";
import { hashPassword, comparePassword } from "../utils/auth";

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
