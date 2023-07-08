const {
  getContactUsService,
  insertContactUsService,
  deleteContactUsService,
  updateContactUsService
} = require('../services/contactUs.service')

const getContactUsController = async (req, res) => {
  const result = await getContactUsService(req.query)
  res.status(result.statusCode).json(result)
}

const insertContactUsController = async (req, res) => {
  console.log('req.body>>>>', req.body)
  const result = await insertContactUsService(req.body)
  res.status(result.statusCode).json(result)
}

const deleteContactUsController = async (req, res) => {
  console.log('req', req.params)
  const result = await deleteContactUsService(req.params.id)
  console.log('result', result)
  res.status(result.statusCode).json(result)
}

const updateContactUsController = async (req, res) => {
  console.log('req.body>>>>', req.body)
  console.log('req.params.id>>>>', req.params.id)
  const id = req.params.id
  const update = req.body
  const result = await updateContactUsService({ id, update })
  console.log('result', result)
  res.status(result.statusCode).json(result)
}


module.exports = {
  getContactUsController,
  insertContactUsController,
  deleteContactUsController,
  updateContactUsController
}
