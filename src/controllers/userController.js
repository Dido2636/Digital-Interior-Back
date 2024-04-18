import { generateAuthToken } from "../middlewares/auth";
import User from "../models/userModel";
import "dotenv/config";

export const register = async (req, res) => {
  const { name, firstname, email, password } = req.body;
  try {
    // Vérifier si un utilisateur avec la même adresse e-mail existe déjà
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Un utilisateur avec cette adresse e-mail existe déjà.",
      });
    }

    const newUser = new User({ name, firstname, email, password });
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    const token = generateAuthToken(newUser);
    console.log(newUser);
    res.json({
      token,
      message: "Vous etes inscrit, vous pouvez vous connectez",
      newUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      const error = new Error("not found");
      throw error;
    }
    const validPassword = await user.validPassword(password, user.password);
    if (!validPassword) {
      const error = new Error("Invalid password");
      console.log(user);
      throw error;
    }
    const token = generateAuthToken(user);
    res.json({ token, message: "vous etes connecté", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
