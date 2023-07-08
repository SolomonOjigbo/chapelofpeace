const {
  getUsersService,
  insertUserService, loginUserService, deleteUserService, updateUserService 
} = require('../services/user.service')

const getUsersController = async (req, res) => {
  const result = await getUsersService(req.query)
  res.status(result.statusCode).json(result)
}

const insertUserController = async (req, res) => {
  console.log('req.body>>>>', req.body)
  const result = await insertUserService(req.body)
  res.status(result.statusCode).json(result)
}

const loginUserController = async (req, res) => {
  console.log('Login controller req.body>>>>', req.body)
  const result = await loginUserService(req.body)
  res.status(result.statusCode).json(result)
}

const deleteUserController = async (req, res) => {
  console.log('req', req.params)
  const result = await deleteUserService(req.params.id)
  console.log('result', result)
  res.status(result.statusCode).json(result)
}

const updateUserController = async (req, res) => {
  console.log('req.body>>>>', req.body)
  console.log('req.params.id>>>>', req.params.id)
  const id = req.params.id
  const update = req.body
  const result = await updateUserService({id, update})
  console.log('result', result)
  res.status(result.statusCode).json(result)
}

module.exports = { getUsersController, insertUserController, loginUserController, deleteUserController, updateUserController }
