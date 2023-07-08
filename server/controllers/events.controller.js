const {
  getEventsService,
  insertEventsService,
  deleteEventsService,
  updateEventsService
} = require('../services/events.service')

const getEventsController = async (req, res) => {
  const result = await getEventsService(req.query)
  console.log("result", result)
  res.status(result.statusCode).json(result)
}

const insertEventsController = async (req, res) => {
  console.log('req.body>>>>', req.body)
  const result = await insertEventsService(req.body)
  res.status(result.statusCode).json(result)
}

const deleteEventsController = async (req, res) => {
  console.log('req', req.params)
  const result = await deleteEventsService(req.params.id)
  console.log('result', result)
  res.status(result.statusCode).json(result)
}

const updateEventsController = async (req, res) => {
  console.log('req.body>>>>', req.body)
  console.log('req.params.id>>>>', req.params.id)
  const id = req.params.id
  const update = req.body
  const result = await updateEventsService({id, update})
  console.log('result', result)
  res.status(result.statusCode).json(result)
}

module.exports = {
  getEventsController,
  insertEventsController,
  deleteEventsController,
  updateEventsController
}
