const userDao = require("../dao/userDao");

const createUser = async (userData) => {
  return await userDao.createUser(userData);
};

const getAllUsers = async () => {
  return await userDao.getAllUsers();
};

const getUserById = async (userId) => {
  return await userDao.getUserById(userId);
};

const updateUser = async (userId, updateData) => {
  return await userDao.updateUser(userId, updateData);
};

const deleteUser = async (userId) => {
  return await userDao.deleteUser(userId);
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
