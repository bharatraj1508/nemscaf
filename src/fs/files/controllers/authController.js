const mongoose = require("mongoose");
const User = mongoose.model("User");
const { newAccessToken } = require("../utils/jwt");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).send({
        message: "This email already exist. Please use another email address",
      });
    }

    const user = await new User({
      name,
      email,
      password,
    }).save();

    const token = newAccessToken(user._id);

    res.status(200).send({
      success: true,
      message: "User registered successfully",
      token,
    });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser || !(await existingUser.comparePassword(password)))
      return res.status(401).send({
        message: "Invalid email or password",
      });

    const token = newAccessToken(existingUser._id);

    res.status(200).send({
      token,
    });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
