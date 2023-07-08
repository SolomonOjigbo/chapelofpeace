const {
  getBibleStudiesService,
  insertBibleStudiesService,
  deleteBibleStudiesService,
  updateBibleStudiesService
} = require('../services/bibleStudies.service')

const getBibleStudiesController = async (req, res) => {
  const result = await getBibleStudiesService(req.query)
  res.status(result.statusCode).json(result)
}
 
const insertBibleStudiesController = async (req, res) => {
  console.log('req.body>>>>', req.body)
  const result = await insertBibleStudiesService(req.body)
  res.status(result.statusCode).json(result)
}

const deleteBibleStudiesController = async (req, res) => {
  console.log('req', req.params)
  const result = await deleteBibleStudiesService(req.params.id)
  console.log('result', result)
  res.status(result.statusCode).json(result)
}

const updateBibleStudiesController = async (req, res) => {
  console.log('req.body>>>>', req.body)
  console.log('req.params.id>>>>', req.params.id)
  const id = req.params.id
  const update = req.body
  const result = await updateBibleStudiesService({ id, update })
  console.log('result', result)
  res.status(result.statusCode).json(result)
}

module.exports = {
  getBibleStudiesController,
  insertBibleStudiesController,
  deleteBibleStudiesController,
  updateBibleStudiesController
}
