const {
  getBibleStudySchedulesService,
  insertBibleStudySchedulesService,
  deleteBibleStudySchedulesService,
  updateBibleStudySchedulesService
} = require('../services/bibleStudySchedules.service')

const getBibleStudySchedulesController = async (req, res) => {
  const result = await getBibleStudySchedulesService(req.query)
  res.status(result.statusCode).json(result)
}

const insertBibleStudySchedulesController = async (req, res) => {
  console.log('req.body>>>>', req.body)
  const result = await insertBibleStudySchedulesService(req.body)
  res.status(result.statusCode).json(result)
}

const deleteBibleStudySchedulesController = async (req, res) => {
  console.log('req', req.params)
  const result = await deleteBibleStudySchedulesService(req.params.id)
  console.log('result', result)
  res.status(result.statusCode).json(result)
}

const updateBibleStudySchedulesController = async (req, res) => {
  console.log('req.body>>>>', req.body)
  console.log('req.params.id>>>>', req.params.id)
  const id = req.params.id
  const update = req.body
  const result = await updateBibleStudySchedulesService({ id, update })
  console.log('result', result)
  res.status(result.statusCode).json(result)
}

module.exports = {
  getBibleStudySchedulesController,
  insertBibleStudySchedulesController,
  deleteBibleStudySchedulesController,
  updateBibleStudySchedulesController
}
