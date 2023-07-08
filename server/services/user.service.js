const { insertUser, getUsers, loginUser, deleteUser, updateUser } = require('../model/user.model')

const getUsersService = async (payload) => {
  try {
    const result = await getUsers(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

const insertUserService = async payload => {
  const result = await insertUser(payload)
  return result
}

const loginUserService = async payload => {
  const result = await loginUser(payload)
  return result
}

const deleteUserService = async payload => {
  try {
    console.log('delete announcement service', payload)
    const result = await deleteUser(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

const updateUserService = async payload => {
  try {
    console.log('update user service', payload)
    const result = await updateUser(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

module.exports = { getUsersService, insertUserService, loginUserService, deleteUserService, updateUserService }
