const httpStatus = require('http-status');
const { email } = require('../config/config');
const { User, Document } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return User.create(userBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  let user = await User.findById(id).populate('profile');
  if(!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found'); 
  return user;
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  let user = await User.findOne({ email });
  if(!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found'); 
  return user;
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  // if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  // }
  let userData = {
    name : updateBody.name,
    // email : updateBody.email,
    mobile : updateBody.mobile,
    profile : null
  }
  if(updateBody.documentName) {
    let docsBody = {
      createdBy : userId,
      document : updateBody.documentName
    }
    const uploadDocs = await Document.create(docsBody);
    userData.profile = uploadDocs._id;
  }
  Object.assign(user, userData);
  return await user.save();
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const userRes = await User.updateOne({_id: userId}, {$set : {isDeleted:true}});
  return userRes;
};

const getAllUsers = async (bodyData) => {
  let user = await User.find({role: bodyData.role, isDeleted:false}).sort({_id:-1});
  return user;
};

const findAllMerchant = async (id) => {
  let merchant = await User.find({role: 'merchant', isDeleted: false});
  return merchant;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  getAllUsers,
  findAllMerchant
};
