const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/modelUsers");
const { HttpError, ctrlWrapper } = require("../helpers");

const { SECRET_KYE } = process.env;

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await UserModel.create({
    ...req.body,
    password: hashPassword,
  });
  if (!newUser) {
    throw HttpError(404, "Not found");
  }
  const { email: emailUse, subscription } = newUser;

  res.status(201).json({ user: { email: emailUse, subscription } });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }
  const payloade = { id: user._id };
  const token = jwt.sign(payloade, SECRET_KYE, { expiresIn: "23h" });
  await UserModel.findByIdAndUpdate(user._id, { token });
  res.status(201).json({
    user: { email: user.email, id: user._id, subscription: user.subscription },
    token,
  });
};
const current = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({
    email,
    subscription,
  });
};
const logout = async (req, res) => {
  const user = req.user;
  await UserModel.findByIdAndUpdate(user._id, { token: "" });
  res.status(204).json();
};

module.exports = {
  registerUser: ctrlWrapper(registerUser),
  login: ctrlWrapper(login),
  current: ctrlWrapper(current),
  logout: ctrlWrapper(logout),
};
