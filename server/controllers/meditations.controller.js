const {
  getMeditationsService,
  insertMeditationsService,
  deleteMeditationsService,
  updateMeditationsService
} = require('../services/meditations.service')

const getMeditationsController = async (req, res) => {
  const result = await getMeditationsService(req.query)
  res.status(result.statusCode).json(result)
}

const insertMeditationsController = async (req, res) => {
  console.log('req.body>>>>', req.body)
  const result = await insertMeditationsService(req.body)
  res.status(result.statusCode).json(result)
}
const deleteMeditationsController = async (req, res) => {
  console.log('req', req.params)
  const result = await deleteMeditationsService(req.params.id)
  console.log('result', result)
  res.status(result.statusCode).json(result)
}

const updateMeditationsController = async (req, res) => {
  console.log('req.body>>>>', req.body)
  console.log('req.params.id>>>>', req.params.id)
  const id = req.params.id
  const update = req.body
  const result = await updateMeditationsService({ id, update })
  console.log('result', result)
  res.status(result.statusCode).json(result)
}

module.exports = {
  getMeditationsController,
  insertMeditationsController,
  deleteMeditationsController,
  updateMeditationsController
}
