const {
  getMembershipsService,
  insertMembershipsService,
  deleteMembershipsService,
  updateMembershipsService
} = require('../services/memberships.service')

const getMembershipsController = async (req, res) => {
  const result = await getMembershipsService(req.query)
  res.status(result.statusCode).json(result)
}

const insertMembershipsController = async (req, res) => {
  console.log('req.body>>>>', req.body)
  const result = await insertMembershipsService(req.body)
  res.status(result.statusCode).json(result)
}

const deleteMembershipsController = async (req, res) => {
  console.log('req', req.params)
  const result = await deleteMembershipsService(req.params.id)
  console.log('result', result)
  res.status(result.statusCode).json(result)
}

const updateMembershipsController = async (req, res) => {
  console.log('req.body>>>>', req.body)
  console.log('req.params.id>>>>', req.params.id)
  const id = req.params.id
  const update = req.body
  const result = await updateMembershipsService({ id, update })
  console.log('result', result)
  res.status(result.statusCode).json(result)
}

module.exports = {
  getMembershipsController,
  insertMembershipsController,
  deleteMembershipsController,
  updateMembershipsController
}
