const {
  getPrayerRequestService,
  insertPrayerRequestService,
  deletePrayerRequestService,
  updatePrayerRequestService
} = require('../services/prayerRequest.service')

const getPrayerRequestController = async (req, res) => {
  const result = await getPrayerRequestService(req.query)
  res.status(result.statusCode).json(result)
}

const insertPrayerRequestController = async (req, res) => {
  console.log('req.body>>>>', req.body)
  const result = await insertPrayerRequestService(req.body)
  res.status(result.statusCode).json(result)
}

const deletePrayerRequestController = async (req, res) => {
  console.log('req', req.params)
  const result = await deletePrayerRequestService(req.params.id)
  console.log('result', result)
  res.status(result.statusCode).json(result)
}

const updatePrayerRequestController = async (req, res) => {
  console.log('req.body>>>>', req.body)
  console.log('req.params.id>>>>', req.params.id)
  const id = req.params.id
  const update = req.body
  const result = await updatePrayerRequestService({ id, update })
  console.log('result', result)
  res.status(result.statusCode).json(result)
}

module.exports = {
  getPrayerRequestController,
  insertPrayerRequestController,
  deletePrayerRequestController,
  updatePrayerRequestController
}
