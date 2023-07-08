const {
  getMemoryVerseService,
  insertMemoryVerseService,
  deleteMemoryVerseService,
  updateMemoryVerseService
} = require('../services/memoryVerse.service')

const getMemoryVerseController = async (req, res) => {
  const result = await getMemoryVerseService(req.query)
  res.status(result.statusCode).json(result)
}

const insertMemoryVerseController = async (req, res) => {
  console.log('req.body>>>>', req.body)
  const result = await insertMemoryVerseService(req.body)
  res.status(result.statusCode).json(result)
}

const deleteMemoryVerseController = async (req, res) => {
  console.log('req', req.params)
  const result = await deleteMemoryVerseService(req.params.id)
  console.log('result', result)
  res.status(result.statusCode).json(result)
}

const updateMemoryVerseController = async (req, res) => {
  console.log('req.body>>>>', req.body)
  console.log('req.params.id>>>>', req.params.id)
  const id = req.params.id
  const update = req.body
  const result = await updateMemoryVerseService({ id, update })
  console.log('result', result)
  res.status(result.statusCode).json(result)
}

module.exports = {
  getMemoryVerseController,
  insertMemoryVerseController,
  deleteMemoryVerseController,
  updateMemoryVerseController
}
