const {
  getResponseService,
  insertResponseService,
  deleteResponseService,
  updateResponseService
} = require('../services/response.service')

const getResponseController = async (req, res) => {
  const result = await getResponseService(req.query)
  res.status(result.statusCode).json(result)
}

const insertResponseController = async (req, res) => {
  console.log('req.body>>>>', req.body)
  const result = await insertResponseService(req.body)
  res.status(result.statusCode).json(result)
}

const deleteResponseController = async (req, res) => {
  console.log('req', req.params)
  const result = await deleteResponseService(req.params.id)
  console.log('result', result)
  res.status(result.statusCode).json(result)
}

const updateResponseController = async (req, res) => {
  console.log('req.body>>>>', req.body)
  console.log('req.params.id>>>>', req.params.id)
  const id = req.params.id
  const update = req.body
  const result = await updateResponseService({ id, update })
  console.log('result', result)
  res.status(result.statusCode).json(result)
}

module.exports = {
  getResponseController,
  insertResponseController,
  deleteResponseController,
  updateResponseController
}
