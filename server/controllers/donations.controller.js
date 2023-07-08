const {
  getDonationsService,
  insertDonationsService,
  deleteDonationsService,
  updateDonationsService
} = require('../services/donations.service')

const getDonationsController = async (req, res) => {
  const result = await getDonationsService(req.query)
  res.status(result.statusCode).json(result)
}

const insertDonationsController = async (req, res) => {
  console.log('req.body>>>>', req.body)
  const result = await insertDonationsService(req.body)
  res.status(result.statusCode).json(result)
}

const deleteDonationsController = async (req, res) => {
  console.log('req', req.params)
  const result = await deleteDonationsService(req.params.id)
  console.log('result', result)
  res.status(result.statusCode).json(result)
}

const updateDonationsController = async (req, res) => {
  console.log('req.body>>>>', req.body)
  console.log('req.params.id>>>>', req.params.id)
  const id = req.params.id
  const update = req.body
  const result = await updateDonationsService({ id, update })
  console.log('result', result)
  res.status(result.statusCode).json(result)
}

module.exports = {
  getDonationsController,
  insertDonationsController,
  deleteDonationsController,
  updateDonationsController
}
