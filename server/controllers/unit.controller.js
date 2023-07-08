const {
  getUnitService,
  insertUnitService,
  deleteUnitService,
  updateUnitService
} = require('../services/unit.service')

const getUnitController = async (req, res) => {
  const result = await getUnitService(req.query)
  res.status(result.statusCode).json(result)
}

const insertUnitController = async (req, res) => {
  console.log('req.body>>>>', req.body)
  const result = await insertUnitService(req.body)
  res.status(result.statusCode).json(result)
}

const deleteUnitController = async (req, res) => {
  console.log('req', req.params)
  const result = await deleteUnitService(req.params.id)
  console.log('result', result)
  res.status(result.statusCode).json(result)
}

const updateUnitController = async (req, res) => {
  console.log('req.body>>>>', req.body)
  console.log('req.params.id>>>>', req.params.id)
  const id = req.params.id
  const update = req.body
  const result = await updateUnitService({ id, update })
  console.log('result', result)
  res.status(result.statusCode).json(result)
}

module.exports = {
  getUnitController,
  insertUnitController,
  deleteUnitController,
  updateUnitController
}
