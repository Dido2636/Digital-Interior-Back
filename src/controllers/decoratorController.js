import "dotenv/config";
import Decorator from "../models/decoratorModel";
import { generateAuthToken } from "../middlewares/auth";

export const getAlldecorator = async (req, res) => {
  try {
    const decorator = await Decorator.find();
    res.json(decorator);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const register = async (req, res) => {
  const { company, firstname, email, password } = req.body;
  try {
    const newDecorator = new Decorator({ company, firstname, email, password });
    newDecorator.password = await newDecorator.encryptPassword(
      req.body.password
    );
    await newDecorator.save();
    const token = generateAuthToken(newDecorator);
    console.log(newDecorator);
    res.json({
      token,
      message: "vous etes inscrit, vous pouvez vous connectez",
      newDecorator,
    });
  } catch (error) {
    console.error(error.message);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const decorator = await Decorator.findOne({ email }).select("+password");
    if (!decorator) {
      const error = new Error("not found");
      throw error;
    }
    const validPassword = await decorator.validPassword(
      password,
      decorator.password
    );
    if (!validPassword) {
      const error = new Error("Invalid password");
      throw error;
    }console.log(decorator)
    const token = generateAuthToken(decorator);
    res.json({ token, decorator, message: "vous etes connecté" });
  } catch (error) {
    console.error(error.message);
  }
};
