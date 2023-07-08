const {
  getAlumniAnnouncementsService,
  insertAlumniAnnouncementsService,
  deleteAlumniAnnouncementsService,
  updateAlumniAnnouncementsService
} = require('../services/alumniAnnouncements.service')

const getAlumniAnnouncementsController = async (req, res) => {
  const result = await getAlumniAnnouncementsService(req.query)
  console.log("result", result)
  res.status(result.statusCode).json(result)
}

const insertAlumniAnnouncementsController = async (req, res) => {
  console.log('req.body>>>>', req.body)
  const result = await insertAlumniAnnouncementsService(req.body)
  res.status(result.statusCode).json(result)
}

const deleteAlumniAnnouncementsController = async (req, res) => {
  console.log('req', req.params)
  const result = await deleteAlumniAnnouncementsService(req.params.id)
  console.log('result', result)
  res.status(result.statusCode).json(result)
}

const updateAlumniAnnouncementsController = async (req, res) => {
  console.log('req.body>>>>', req.body)
  console.log('req.params.id>>>>', req.params.id)
  const id = req.params.id
  const update = req.body
  const result = await updateAlumniAnnouncementsService({id, update})
  console.log('result', result)
  res.status(result.statusCode).json(result)
}



module.exports = {
  getAlumniAnnouncementsController,
  insertAlumniAnnouncementsController,
  deleteAlumniAnnouncementsController,
  updateAlumniAnnouncementsController
}
