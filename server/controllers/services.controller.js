const {
  getServicesService,
  insertServicesService,
  deleteServicesService,
  updateServicesService
} = require('../services/services.service')

const getServicesController = async (req, res) => {
  const result = await getServicesService(req.query)
  res.status(result.statusCode).json(result)
}

const insertServicesController = async (req, res) => {
  console.log('req.body>>>>', req.body)
  const result = await insertServicesService(req.body)
  res.status(result.statusCode).json(result)
}

const deleteServicesController = async (req, res) => {
  console.log('req', req.params)
  const result = await deleteServicesService(req.params.id)
  console.log('result', result)
  res.status(result.statusCode).json(result)
}

const updateServicesController = async (req, res) => {
  console.log('req.body>>>>', req.body)
  console.log('req.params.id>>>>', req.params.id)
  const id = req.params.id
  const update = req.body
  const result = await updateServicesService({ id, update })
  console.log('result', result)
  res.status(result.statusCode).json(result)
}

module.exports = {
  getServicesController,
  insertServicesController,
  deleteServicesController,
  updateServicesController
}
