const {
  getMembersOfCouncilService,
  insertMembersOfCouncilService,
  deleteMembersOfCouncilService,
  updateMembersOfCouncilService
} = require('../services/membersOfCouncil.service')

const getMembersOfCouncilController = async (req, res) => {
  const result = await getMembersOfCouncilService(req.query)
  res.status(result.statusCode).json(result)
}

const insertMembersOfCouncilController = async (req, res) => {
  console.log('req.body>>>>', req.body)
  const result = await insertMembersOfCouncilService(req.body)
  res.status(result.statusCode).json(result)
}

const deleteMembersOfCouncilController = async (req, res) => {
  console.log('req', req.params)
  const result = await deleteMembersOfCouncilService(req.params.id)
  console.log('result', result)
  res.status(result.statusCode).json(result)
}

const updateMembersOfCouncilController = async (req, res) => {
  console.log('req.body>>>>', req.body)
  console.log('req.params.id>>>>', req.params.id)
  const id = req.params.id
  const update = req.body
  const result = await updateMembersOfCouncilService({ id, update })
  console.log('result', result)
  res.status(result.statusCode).json(result)
}

module.exports = {
  getMembersOfCouncilController,
  insertMembersOfCouncilController,
  deleteMembersOfCouncilController,
  updateMembersOfCouncilController
}
