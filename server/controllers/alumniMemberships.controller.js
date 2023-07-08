const {
  getAlumniMembershipsService,
  insertAlumniMembershipsService,
  deleteAlumniMembershipsService,
  updateAlumniMembershipsService
} = require('../services/alumniMemberships.service')

const getAlumniMembershipsController = async (req, res) => {
  const result = await getAlumniMembershipsService(req.query)
  console.log('controller result', result)
  res.status(result.statusCode).json(result)
}

const insertAlumniMembershipsController = async (req, res) => {
  console.log('req.body>>>>', req.body)
  const result = await insertAlumniMembershipsService(req.body)
  res.status(result.statusCode).json(result)
}

const deleteAlumniMembershipsController = async (req, res) => {
  console.log('req', req.params)
  const result = await deleteAlumniMembershipsService(req.params.id)
  console.log('result', result)
  res.status(result.statusCode).json(result)
}

const updateAlumniMembershipsController = async (req, res) => {
  console.log('req.body>>>>', req.body)
  console.log('req.params.id>>>>', req.params.id)
  const id = req.params.id
  const update = req.body
  const result = await updateAlumniMembershipsService({ id, update })
  console.log('result', result)
  res.status(result.statusCode).json(result)
}

module.exports = {
  getAlumniMembershipsController,
  insertAlumniMembershipsController,
  deleteAlumniMembershipsController,
  updateAlumniMembershipsController
}
