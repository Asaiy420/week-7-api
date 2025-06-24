import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const Register = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  try {
    if (!username || !email || !password || !confirmPassword) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // creating a token for token based auth using jwt

    const token = jwt.sign({ username }, process.env.JWT_SECRET);

    // Create the user
    const createdUser = await User.create({
      username,
      email,
      password: hashedPassword,
      token,
    });

    // Exclude password from the response
    const newUser = createdUser.toObject();
    delete newUser.password;

    return res.status(201).json({
      message: "User created successfully!",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    console.error("Error when creating a user", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields." });
    }

    //check if the user exists first

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "User not found, Please register first" });
    }

    //check if the password matches with the hashed password

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    // create a token for taked based auth

    const token = jwt.sign(
      { username: existingUser.username },
      process.env.JWT_SECRET
    );

    return res.status(200).json({
      message: "Login successful!",
      data: {
        user: existingUser,
        token,
      },
    });
  } catch (error) {
    console.error("Error when logging in", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
