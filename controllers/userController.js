const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { validateUser } = require("../validators/userValidaor");
const userService = require("../services/userService");
const UserDto = require("../dtos/userDtos");

const createUser = async (req, res) => {
  // try {
  //   const { email, name, age, city, zipCode } = req.body;

  //   if (!email || !name || !age || !city || !zipCode) {
  //     return res.status(400).json({ message: "All Fields are required" });
  //   }

  //   const user = new User({ email, name, age, city, zipCode });
  //   await user.save();

  //   const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  //   const userDto = new UserDto(user);
  //   res
  //     .status(201)
  //     .json({ message: "User created Successfully", user: userDto, token });
  // } catch (error) {
  //   console.log("Error in creating User", error.message);
  //   res.status(500).json({ message: error.message });
  // }

  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const user = await userService.createUser(req.body);

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Send user details along with token
    res.status(201).send({
      user: new UserDto(user),
      token: token,
    });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).send("Internal Server Error");
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers({ isDeleted: false });

    const userDto = users.map((user) => new UserDto(user));

    res.status(200).json(userDto);
  } catch (error) {
    console.log("Error in listing User", error.message);
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.userId)
    if (!user) return res.status(404).json({ message: "User not found." });

    const userDto = new UserDto(user);

    res.status(200).json(userDto);
  } catch (error) {
    console.log("Error in getting User", error.message);
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await userService.updateUser(req.params.userId, req.body, {
      new: true,
    })

    if (!user) return res.status(400).json({ message: "User not found" });

    const userDto = new UserDto(user);

    res.status(200).json(userDto);
  } catch (error) {
    console.log("Error in updating User", error.message);
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.userId);

    if (!user) return res.status(401).json({ message: "User not found." });

    // user.isDeleted = true;
    // await user.save();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log("Error in deleting User", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
